/* eslint-disable react-hooks/rules-of-hooks */
import type {
  Address,
  FullContractState,
  // ProviderRpcClient,
  SendInternalParams,
  Transaction,
} from "@andex/provider";
import { useRpc } from "@andex/sdk";
import { getFullContractState, tokenRootContract } from "../contracts";
import type { EverscaleTokenData } from "../../state/types";
import { resolveVenomAddress } from "../../utils";
import { SupportedInterfaceDetection } from "../supportedInterfaceDetection";

export type TokenMintParams = {
  amount: string;
  deployWalletValue?: string;
  notify?: boolean;
  payload?: string;
  recipient: Address | string;
  remainingGasTo: Address | string;
};

export type TokenBurnParams = {
  amount: string;
  callbackTo: Address | string;
  payload: string;
  remainingGasTo: Address | string;
  walletOwner: Address | string;
};

export type TokenTransferOwnershipParams = {
  callbacks?: [
    address: Address,
    value: { payload: string; value: string | number }
  ][];
  newOwner: Address | string;
  remainingGasTo: Address | string;
};

export abstract class TokenUtils {
  public static async mint(
    address: Address | string,
    params: TokenMintParams,
    args?: Partial<SendInternalParams>
  ): Promise<Transaction> {
    return tokenRootContract(address, useRpc())
      .methods.mint({
        amount: params.amount,
        deployWalletValue: params.deployWalletValue || "100000000",
        notify: params.notify ?? false,
        payload: params.payload ?? "",
        recipient: resolveVenomAddress(params.recipient),
        remainingGasTo: resolveVenomAddress(params.remainingGasTo),
      })
      .send({
        amount: "600000000",
        bounce: true,
        from: resolveVenomAddress(params.remainingGasTo),
        ...args,
      });
  }

  public static async burn(
    address: Address | string,
    params: TokenBurnParams,
    args: Pick<SendInternalParams, "from"> &
      Omit<Partial<SendInternalParams>, "from">
  ): Promise<Transaction> {
    return tokenRootContract(address)
      .methods.burnTokens({
        amount: params.amount,
        callbackTo: resolveVenomAddress(params.callbackTo),
        payload: params.payload,
        remainingGasTo: resolveVenomAddress(params.remainingGasTo),
        walletOwner: resolveVenomAddress(params.walletOwner),
      })
      .send({
        amount: "500000000",
        bounce: true,
        ...args,
      });
  }

  public static async transferOwnership(
    address: Address | string,
    params: TokenTransferOwnershipParams,
    args: Partial<SendInternalParams>
  ): Promise<Transaction> {
    return tokenRootContract(address)
      .methods.transferOwnership({
        callbacks: params.callbacks ?? [],
        newOwner: resolveVenomAddress(params.newOwner),
        remainingGasTo: resolveVenomAddress(params.remainingGasTo),
      })
      .send({
        amount: "5000000000",
        bounce: true,
        from: resolveVenomAddress(params.remainingGasTo),
        ...args,
      });
  }

  public static async getDetails(
    address: Address | string,
    cachedState?: FullContractState
  ): Promise<EverscaleTokenData | undefined> {
    const state = cachedState ?? (await getFullContractState(address));

    if (!state) {
      return undefined;
    }

    if (state.isDeployed) {
      return Promise.all([
        TokenUtils.getDecimals(address, state),
        TokenUtils.getName(address, state),
        TokenUtils.getSymbol(address, state),
        TokenUtils.rootOwnerAddress(address, state),
        TokenUtils.totalSupply(address, state),
      ]).then(([decimals, name, symbol, rootOwnerAddress, totalSupply]) => ({
        address: resolveVenomAddress(address),
        decimals,
        name,
        root: address.toString(),
        rootOwnerAddress,
        symbol,
        totalSupply,
      }));
    }

    return undefined;
  }

  public static async getDecimals(
    address: Address | string,
    cachedState?: FullContractState
  ): Promise<number> {
    return tokenRootContract(address)
      .methods.decimals({ answerId: 0 })
      .call({ cachedState })
      .then(({ value0 }) => parseInt(value0, 10));
  }

  public static async getSymbol(
    address: Address | string,
    cachedState?: FullContractState
  ): Promise<string> {
    return (
      await tokenRootContract(address)
        .methods.symbol({ answerId: 0 })
        .call({ cachedState })
    ).value0;
  }

  public static async getName(
    address: Address | string,
    cachedState?: FullContractState
  ): Promise<string> {
    return (
      await tokenRootContract(address)
        .methods.name({ answerId: 0 })
        .call({ cachedState })
    ).value0;
  }

  public static async isNewTip3(address: Address | string): Promise<boolean> {
    const state = await getFullContractState(address);
    if (!state || !state.isDeployed) {
      return false;
    }

    return SupportedInterfaceDetection.supports({
      address,
      interfaces: [0x4371d8ed, 0x0b1fd263],
    });
  }

  public static async rootOwnerAddress(
    address: Address | string,
    cachedState?: FullContractState
  ): Promise<Address> {
    return (
      await tokenRootContract(address)
        .methods.rootOwner({ answerId: 0 })
        .call({ cachedState })
    ).value0;
  }

  public static async totalSupply(
    address: Address | string,
    cachedState?: FullContractState
  ): Promise<string> {
    return (
      await tokenRootContract(address)
        .methods.totalSupply({ answerId: 0 })
        .call({ cachedState })
    ).value0;
  }
}
