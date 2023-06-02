import type {
  Address,
  DecodedAbiFunctionOutputs,
  DelayedMessageExecution,
  FullContractState,
  ProviderRpcClient,
  SendInternalParams,
} from "everscale-inpage-provider";

import { TokenAbi } from "../constants/abi";
import { tokenRootContract, tokenWalletContract } from "../helpers/contracts";
import { sliceAddress } from "./sliceAddress";
import { debug } from "./console";
import { resolveEverscaleAddress } from "./resolve-everscale-address";

export type TokenWalletOwnerParams = {
  tokenRootAddress: Address | string;
  walletOwnerAddress: Address | string;
};

export type TokenWalletOwnerWalletParams = {
  tokenWalletAddress: Address | string;
};

export type TokenWalletTransferParams = {
  amount: string;
  deployWalletValue?: string;
  notify?: boolean;
  payload?: string;
  recipient: Address | string;
  remainingGasTo: Address | string;
};

export type TokenWalletTransferToWalletParams = {
  amount: string;
  notify?: boolean;
  payload?: string;
  recipientTokenWallet: Address | string;
  remainingGasTo: Address | string;
};

export abstract class TokenWalletUtils {
  /**
   * Transfer - makes the transaction via token wallet contract to send message
   * @param {Address | string} tokenWalletAddress
   * @param {TokenWalletTransferParams} params
   * @param {Partial<SendInternalParams>} args
   */
  public static async transfer(
    tokenWalletAddress: Address | string,
    params: TokenWalletTransferParams,
    provider: ProviderRpcClient,
    args?: Partial<SendInternalParams>
  ): Promise<DelayedMessageExecution> {
    return tokenWalletContract(tokenWalletAddress, provider)
      .methods.transfer({
        amount: params.amount,
        deployWalletValue: params.deployWalletValue || "0",
        notify: params.notify ?? true,
        payload: params.payload || "",
        recipient: resolveEverscaleAddress(params.recipient),
        remainingGasTo: resolveEverscaleAddress(params.remainingGasTo),
      })
      .sendDelayed({
        amount: "500000000",
        bounce: true,
        from: resolveEverscaleAddress(params.remainingGasTo),
        ...args,
      });
  }

  /**
   * Transfer to wallet - makes the transaction via token wallet contract to send message to a token wallet
   * @param {Address | string} tokenWalletAddress
   * @param {TokenWalletTransferToWalletParams} params
   * @param {Partial<SendInternalParams>} args
   */
  public static async transferToWallet(
    tokenWalletAddress: Address | string,
    params: TokenWalletTransferToWalletParams,
    provider: ProviderRpcClient,
    args?: Partial<SendInternalParams>
  ): Promise<DelayedMessageExecution> {
    return tokenWalletContract(tokenWalletAddress, provider)
      .methods.transferToWallet({
        amount: params.amount,
        notify: params.notify ?? true,
        payload: params.payload || "",
        recipientTokenWallet: resolveEverscaleAddress(
          params.recipientTokenWallet
        ),
        remainingGasTo: resolveEverscaleAddress(params.remainingGasTo),
      })
      .sendDelayed({
        amount: "500000000",
        bounce: true,
        from: resolveEverscaleAddress(params.remainingGasTo),
        ...args,
      });
  }

  /**
   * Returns token wallet balance in this token by the given token root address and owner wallet address.
   * @param {TokenWalletOwnerParams} params
   * @param {FullContractState} [cachedState]
   */
  public static async balance(
    params: TokenWalletOwnerParams,
    provider: ProviderRpcClient,
    cachedState?: FullContractState
  ): Promise<
    DecodedAbiFunctionOutputs<typeof TokenAbi.Wallet, "balance">["value0"]
  >;
  /**
   * Returns token wallet balance in this token by the given owner token wallet address.
   * @param {TokenWalletOwnerWalletParams} params
   * @param {FullContractState} [cachedState]
   */
  public static async balance(
    params: TokenWalletOwnerWalletParams,
    provider: ProviderRpcClient,
    cachedState?: FullContractState
  ): Promise<
    DecodedAbiFunctionOutputs<typeof TokenAbi.Wallet, "balance">["value0"]
  >;
  /**
   * Returns token wallet balance in this token by the given token root address
   * and owner wallet address or owner token wallet address.
   * @param {TokenWalletOwnerParams | TokenWalletOwnerWalletParams} params
   * @param {FullContractState} [cachedState]
   */
  public static async balance(
    params: TokenWalletOwnerParams | TokenWalletOwnerWalletParams,
    provider: ProviderRpcClient,
    cachedState?: FullContractState
  ): Promise<
    DecodedAbiFunctionOutputs<typeof TokenAbi.Wallet, "balance">["value0"]
  > {
    let { tokenWalletAddress } = params as TokenWalletOwnerWalletParams;

    if (tokenWalletAddress == null) {
      tokenWalletAddress = await TokenWalletUtils.walletAddress(
        params as TokenWalletOwnerParams,
        provider
      );
    }

    return tokenWalletContract(tokenWalletAddress, provider)
      .methods.balance({ answerId: 0 })
      .call({ cachedState })
      .then(({ value0 }) => {
        debug(
          `%cRPC%c Request token wallet %c${sliceAddress(
            tokenWalletAddress.toString()
          )}%c balance => %c${value0}`,
          "font-weight: bold; background: #4a5772; color: #fff; border-radius: 2px; padding: 0 5px; line-height: 1rem",
          "color: #c5e4f3",
          "color: #bae701",
          "color: #c5e4f3",
          "color: #bae701"
        );

        return value0;
      });
  }

  /**
   * Returns expected token wallet address
   * @param {TokenWalletOwnerParams} params
   * @param {FullContractState} [cachedState]
   */
  public static async walletAddress(
    params: TokenWalletOwnerParams,
    provider: ProviderRpcClient,
    cachedState?: FullContractState
  ): Promise<
    DecodedAbiFunctionOutputs<typeof TokenAbi.Root, "walletOf">["value0"]
  > {
    return tokenRootContract(params.tokenRootAddress, provider)
      .methods.walletOf({
        answerId: 0,
        walletOwner: resolveEverscaleAddress(params.walletOwnerAddress),
      })
      .call({ cachedState })
      .then(({ value0 }) => {
        debug(
          `%cRPC%c Request wallet address in token %c${sliceAddress(
            params.tokenRootAddress.toString()
          )}%c by owner %c${sliceAddress(
            params.walletOwnerAddress.toString()
          )}%c => %c${sliceAddress(value0.toString())}`,
          "font-weight: bold; background: #4a5772; color: #fff; border-radius: 2px; padding: 0 5px; line-height: 1rem",
          "color: #c5e4f3",
          "color: #bae701",
          "color: #c5e4f3",
          "color: #bae701",
          "color: #c5e4f3",
          "color: #bae701"
        );

        return value0;
      });
  }
}
