/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import BigNumber from "bignumber.js";
import { Address, Subscriber } from "@andex/provider";
import * as E from "fp-ts/Either";
import { computed, makeObservable, toJS } from "mobx";
import { useRpc } from "@andex/sdk";
import { TokenWallet } from "../../../constants";
import { DEFAULT_SWAP_BILL } from "../constants";
import { BaseSwapStore } from "./BaseSwapStore";
import { TokensCacheService } from "../../../state/TokensCacheService";
import { WalletService } from "../../../state/WalletService";
import { error, getSafeProcessingId } from "../../../utils";
import type {
  BaseSwapStoreState,
  DirectSwapStoreData,
  DirectSwapStoreInitialData,
  DirectTransactionCallbacks,
  DirectTransactionFailureResult,
  DirectTransactionSuccessResult,
} from "../types";

const rpc = useRpc();

export class DirectSwapStore extends BaseSwapStore<
  DirectSwapStoreData,
  BaseSwapStoreState
> {
  constructor(
    protected readonly wallet: WalletService,
    protected readonly tokensCache: TokensCacheService,
    protected readonly initialData: DirectSwapStoreInitialData,
    protected readonly callbacks?: DirectTransactionCallbacks
  ) {
    super(tokensCache, initialData);

    makeObservable(this, {
      coin: computed,
      isValid: computed,
    });

    this.setData({
      coin: initialData?.coin,
    });

    this._transactionSubscriber = new rpc.Subscriber();
  }

  /*
   * Public actions. Useful in UI
   * ----------------------------------------------------------------------------------
   */

  /**
   * Invalidate bills data and recalculate
   */
  public forceInvalidate(): void {
    this.setData("bill", DEFAULT_SWAP_BILL);
    this.finalizeCalculation();
  }

  /**
   * Manually start direct swap process.
   * @returns {Promise<void>}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async submit(..._: any[]): Promise<void> {
    if (!this.isValid) {
      this.setState("isSwapping", false);
      return;
    }

    this.setState("isSwapping", true);
    const callId = getSafeProcessingId();
    this.callbacks?.onSend?.({ callId });

    const deployGrams =
      this.rightToken?.balance === undefined ? "100000000" : "0";

    const pairWallet = await TokenWallet.walletAddress({
      root: this.leftTokenAddress!,
      owner: this.pair!.address!,
    });

    const processingId = new BigNumber(
      Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER - 1)) + 1
    ).toFixed();

    const payload = (
      await this.pair!.contract!.methods.buildExchangePayload({
        deploy_wallet_grams: deployGrams,
        expected_amount: this.minExpectedAmount!,
        id: processingId,
      }).call({
        cachedState: toJS(this.pair!.state),
      })
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
      ?.flatMap((a: { transactions: any }) => a.transactions)
      .filterMap(async (transaction: any) => {
        const result =
          await this.wallet.walletContractCallbacks?.decodeTransaction({
            transaction,
            methods: ["dexPairExchangeSuccess", "dexPairOperationCancelled"],
          });

        if (result !== undefined) {
          if (
            result.method === "dexPairOperationCancelled" &&
            result.input.id.toString() === processingId
          ) {
            this.setState("isSwapping", false);
            return E.left({ input: result.input });
          }

          if (
            result.method === "dexPairExchangeSuccess" &&
            result.input.id.toString() === processingId
          ) {
            this.setState("isSwapping", false);
            return E.right({ input: result.input, transaction });
          }
        }

        return undefined;
      })
      .first();

    try {
      await TokenWallet.send({
        address: new Address(this.leftToken!.wallet!),
        grams: new BigNumber(2500000000).plus(deployGrams).toFixed(),
        owner: this.wallet.account!.address,
        payload,
        recipient: pairWallet,
        tokens: this.amount!,
      });

      if (resultHandler !== undefined) {
        E.match(
          (r: DirectTransactionFailureResult) => {
            this.setState("isSwapping", false);
            this.callbacks?.onTransactionFailure?.({ ...r, callId });
          },
          (r: DirectTransactionSuccessResult) => {
            this.setState("isSwapping", false);
            this.callbacks?.onTransactionSuccess?.({ ...r, callId });
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
   * Full reset
   * @protected
   */
  public reset(): void {
    this.setData({
      bill: DEFAULT_SWAP_BILL,
      leftAmount: "",
      leftToken: undefined,
      pair: undefined,
      priceLeftToRight: undefined,
      priceRightToLeft: undefined,
      rightAmount: "",
      rightToken: undefined,
      slippage: this.data.slippage,
      transaction: undefined,
    });
    this.setState({
      isCalculating: false,
      isLowTvl: false,
      isPairChecking: false,
      isSwapping: false,
    });
  }

  /*
   * Memoized store data and state values
   * ----------------------------------------------------------------------------------
   */

  /**
   * Returns native wallet coin
   * @returns {DirectSwapStoreData['coin']}
   */
  public get coin(): DirectSwapStoreData["coin"] {
    return this.data.coin;
  }

  /*
   * Computed values
   * ----------------------------------------------------------------------------------
   */

  /**
   * Returns `true` if all data and bill is valid, otherwise `false`.
   * @returns {boolean}
   */
  public get isValid(): boolean {
    return (
      this.isEnoughLiquidity &&
      this.wallet.account?.address !== undefined &&
      this.pair?.address !== undefined &&
      this.pair?.contract !== undefined &&
      this.leftToken?.wallet !== undefined &&
      this.leftTokenAddress !== undefined &&
      new BigNumber(this.amount || 0).gt(0) &&
      new BigNumber(this.expectedAmount || 0).gt(0) &&
      new BigNumber(this.minExpectedAmount || 0).gt(0) &&
      new BigNumber(this.leftToken.balance || 0).gte(this.amount || 0)
    );
  }

  /**
   * Internal swap transaction subscriber
   * @type {Subscriber}
   * @protected
   */
  _transactionSubscriber: Subscriber | undefined;
}
