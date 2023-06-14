/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react-hooks/rules-of-hooks */
import BigNumber from "bignumber.js";
import { Address, Subscriber } from "@andex/provider";
import * as E from "fp-ts/Either";
import { computed, makeObservable, override } from "mobx";

import { useRpc } from "../../../hooks";
import {
  // DexConstants,
  EverAbi,
  Tip3ToVenomAddress,
  TokenAbi,
  VenomToTip3Address,
  WVenomVaultAddress,
} from "../../../constants";
import { DirectSwapStore } from "./DirectSwapStore";
import { WalletService } from "../../../state/WalletService";
import { TokensCacheService } from "../../../state/TokensCacheService";
import { error, getSafeProcessingId, isGoodBignumber } from "../../../utils";
import type {
  CoinSwapFailureResult,
  CoinSwapStoreInitialData,
  CoinSwapSuccessResult,
  CoinSwapTransactionCallbacks,
} from "../types";

const rpc = useRpc();

export class CoinSwapStore extends DirectSwapStore {
  constructor(
    protected readonly wallet: WalletService,
    protected readonly tokensCache: TokensCacheService,
    protected readonly initialData: CoinSwapStoreInitialData,
    protected readonly _callbacks?: CoinSwapTransactionCallbacks
  ) {
    super(wallet, tokensCache, initialData);

    makeObservable(this, {
      isEnoughCoinBalance: computed,
      //   isLeftAmountValid: override,
      isValid: override,
    });

    this._transactionSubscriber = new rpc.Subscriber();
  }

  /*
   * Public actions. Useful in UI
   * ----------------------------------------------------------------------------------
   */

  /**
   *
   * @param way
   */
  public async submit(way: "fromCoinToTip3" | "fromTip3ToCoin"): Promise<void> {
    switch (way) {
      case "fromCoinToTip3":
        await this.swapCoinToTip3();
        break;

      case "fromTip3ToCoin":
        await this.swapTip3ToCoin();
        break;

      default:
    }
  }

  /*
   * Computed values
   * ----------------------------------------------------------------------------------
   */

  /**
   *
   */
  public get isEnoughCoinBalance(): boolean {
    const balance = new BigNumber(this.coin.balance ?? 0).shiftedBy(
      -this.coin.decimals
    );
    const fee = new BigNumber(this.initialData?.swapFee ?? 0).shiftedBy(
      -this.coin.decimals
    );
    return (
      isGoodBignumber(this.leftAmountNumber) &&
      this.leftAmountNumber
        .shiftedBy(-this.leftTokenDecimals)
        .lte(balance.minus(fee))
    );
  }

  /*
   * Internal and external utilities methods
   * ----------------------------------------------------------------------------------
   */

  /**
   *
   * @protected
   */
  protected async swapCoinToTip3(): Promise<void> {
    if (!this.isValidCoinToTip3) {
      this.setState("isSwapping", false);
      return;
    }
    const callId = getSafeProcessingId();
    this.setState("isSwapping", true);
    this._callbacks?.onSend?.({ callId });

    const tokenRoot = new rpc.Contract(TokenAbi.Root, this.rightTokenAddress!);
    const walletAddress = (
      await tokenRoot.methods
        .walletOf({
          answerId: 0,
          walletOwner: VenomToTip3Address,
        })
        .call()
    ).value0;

    if (walletAddress === undefined) {
      return;
    }

    const coinToTip3WalletContract = new rpc.Contract(
      TokenAbi.Wallet,
      walletAddress
    );

    let hasWallet = false;

    try {
      hasWallet =
        (await coinToTip3WalletContract.methods.balance({ answerId: 0 }).call())
          .value0 !== undefined;
    } catch (e) {
      error(e);
    }

    const deployGrams =
      this.rightToken?.balance === undefined || !hasWallet ? "100000000" : "0";

    const processingId = new BigNumber(
      Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER - 1)) + 1
    ).toFixed();

    const coinToTip3Contract = new rpc.Contract(
      EverAbi.EverToTip3,
      VenomToTip3Address
    );

    const payload = (
      await coinToTip3Contract.methods
        .buildExchangePayload({
          //   amount: this.leftAmountNumber.toFixed(),
          deployWalletValue: deployGrams,
          expectedAmount: this.minExpectedAmount!,
          id: processingId,
          pair: this.pair!.address!,
          referrer: new Address("0"),
          outcoming: null,
        })
        .call()
    ).value0;

    let stream = this._transactionSubscriber?.transactions(
      this.wallet.account!.address
    );

    const oldStream = this._transactionSubscriber?.oldTransactions(
      this.wallet.account!.address,
      {
        fromLt: this.wallet.contract?.lastTransactionId?.lt,
      }
    );

    if (stream !== undefined && oldStream !== undefined) {
      stream = stream.merge(oldStream);
    }

    const resultHandler = stream
      ?.flatMap((a) => a.transactions)
      .filterMap(async (transaction) => {
        const result =
          await this.wallet.walletContractCallbacks?.decodeTransaction({
            transaction,
            methods: ["onSwapEverToTip3Success", "onSwapEverToTip3Cancel"],
          });

        if (result !== undefined) {
          if (
            result.method === "onSwapEverToTip3Cancel" &&
            result.input.id.toString() === processingId
          ) {
            this.setState("isSwapping", false);
            return E.left({ input: result.input });
          }

          if (
            result.method === "onSwapEverToTip3Success" &&
            result.input.id.toString() === processingId
          ) {
            this.setState("isSwapping", false);
            return E.right({ input: result.input, transaction });
          }
        }

        return undefined;
      })
      .first();

    const weverVault = new rpc.Contract(EverAbi.WeverVault, WVenomVaultAddress);

    try {
      await weverVault.methods
        .wrap({
          gas_back_address: this.wallet.account!.address,
          owner_address: VenomToTip3Address,
          payload,
          tokens: this.leftAmountNumber.toFixed(),
        })
        .send({
          amount: this.leftAmountNumber.plus("5000000000").toFixed(),
          bounce: true,
          from: this.wallet.account!.address,
        });

      if (resultHandler !== undefined) {
        E.match(
          (r: CoinSwapFailureResult) => {
            this.setState("isSwapping", false);
            this._callbacks?.onTransactionFailure?.({ ...r, callId });
          },
          (r: CoinSwapSuccessResult) => {
            this.setState("isSwapping", false);
            this._callbacks?.onTransactionSuccess?.({ ...r, callId });
          }
          //@ts-ignore
        )(await resultHandler);
      }
    } catch (e) {
      error("decodeTransaction error: ", e);
      this.setState("isSwapping", false);
    }
  }

  /**
   *
   * @protected
   */
  protected async swapTip3ToCoin(): Promise<void> {
    if (!this.isValidTip3ToCoin) {
      this.setState("isSwapping", false);
    }

    const callId = getSafeProcessingId();
    this.setState("isSwapping", true);
    this.callbacks?.onSend?.({ callId });
    const tip3ToCoinContract = new rpc.Contract(
      EverAbi.Tip3ToEver,
      Tip3ToVenomAddress
    );

    const tokenRoot = new rpc.Contract(
      TokenAbi.Root,
      new Address(this.leftToken!.root)
    );
    const walletAddress = (
      await tokenRoot.methods
        .walletOf({
          answerId: 0,
          walletOwner: Tip3ToVenomAddress,
        })
        .call()
    ).value0;

    if (walletAddress === undefined) {
      return;
    }

    const tip3ToCoinWalletContract = new rpc.Contract(
      TokenAbi.Wallet,
      walletAddress
    );

    let hasWallet = false;

    try {
      hasWallet =
        (await tip3ToCoinWalletContract.methods.balance({ answerId: 0 }).call())
          .value0 !== undefined;
    } catch (e) {
      error(e);
    }

    const deployGrams = !hasWallet ? "100000000" : "0";

    const processingId = new BigNumber(
      Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER - 1)) + 1
    ).toFixed();

    const payload = (
      await tip3ToCoinContract.methods
        .buildExchangePayload({
          expectedAmount: this.minExpectedAmount!,
          id: processingId,
          pair: this.pair!.address!,
          referrer: new Address("O"),
          outcoming: null,
        })
        .call()
    ).value0;

    let stream = this._transactionSubscriber?.transactions(
      this.wallet.account!.address
    );

    const oldStream = this._transactionSubscriber?.oldTransactions(
      this.wallet.account!.address,
      {
        fromLt: this.wallet.contract?.lastTransactionId?.lt,
      }
    );

    if (stream !== undefined && oldStream !== undefined) {
      stream = stream.merge(oldStream);
    }

    const resultHandler = stream
      ?.flatMap((a) => a.transactions)
      .filterMap(async (transaction) => {
        const result =
          await this.wallet.walletContractCallbacks?.decodeTransaction({
            transaction,
            methods: ["onSwapTip3ToEverSuccess", "onSwapTip3ToEverCancel"],
          });

        if (result !== undefined) {
          if (
            result.method === "onSwapTip3ToEverCancel" &&
            result.input.id.toString() === processingId
          ) {
            this.setState("isSwapping", false);
            return E.left({ input: result.input });
          }

          if (
            result.method === "onSwapTip3ToEverSuccess" &&
            result.input.id.toString() === processingId
          ) {
            this.setState("isSwapping", false);
            return E.right({ input: result.input, transaction });
          }
        }

        return undefined;
      })
      .first();

    const tokenWalletContract = new rpc.Contract(
      TokenAbi.Wallet,
      new Address(this.leftToken!.wallet!)
    );

    try {
      await tokenWalletContract.methods
        .transfer({
          amount: this.amount!,
          deployWalletValue: deployGrams,
          notify: true,
          payload,
          recipient: Tip3ToVenomAddress,
          remainingGasTo: this.wallet.account!.address!,
        })
        .send({
          amount: new BigNumber(3600000000).plus(deployGrams).toFixed(),
          bounce: true,
          from: this.wallet.account!.address!,
        });

      if (resultHandler !== undefined) {
        E.match(
          (r: CoinSwapFailureResult) => {
            this.setState("isSwapping", false);
            this._callbacks?.onTransactionFailure?.({ ...r, callId });
          },
          (r: CoinSwapSuccessResult) => {
            this.setState("isSwapping", false);
            this._callbacks?.onTransactionSuccess?.({ ...r, callId });
          }
          //@ts-ignore
        )(await resultHandler);
      }
    } catch (e) {
      error("decodeTransaction error: ", e);
      this.setState("isSwapping", false);
    }
  }

  /**
   * Returns `true` if all data and bill is valid, otherwise `false`.
   * @returns {boolean}
   */
  public get isValidCoinToTip3(): boolean {
    return (
      this.isEnoughCoinBalance &&
      this.wallet.account?.address !== undefined &&
      new BigNumber(this.amount || 0).gt(0) &&
      new BigNumber(this.expectedAmount || 0).gt(0) &&
      new BigNumber(this.minExpectedAmount || 0).gt(0)
    );
  }

  /**
   * Returns `true` if all data and bill is valid, otherwise `false`.
   * @returns {boolean}
   */
  public get isValidTip3ToCoin(): boolean {
    return (
      this.wallet.account?.address !== undefined &&
      this.leftToken?.wallet !== undefined &&
      this.leftTokenAddress !== undefined &&
      new BigNumber(this.amount || 0).gt(0) &&
      new BigNumber(this.expectedAmount || 0).gt(0) &&
      new BigNumber(this.minExpectedAmount || 0).gt(0) &&
      new BigNumber(this.leftToken?.balance || 0).gte(this.amount || 0)
    );
  }

  /**
   * Internal swap transaction subscriber
   * @type {Subscriber}
   * @protected
   */
  _transactionSubscriber: Subscriber | undefined;
}
