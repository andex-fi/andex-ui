import {
  Address,
  Contract,
  FullContractState,
  ProviderRpcClient,
} from "everscale-inpage-provider";
import { DexAbi, EverAbi, TokenAbi } from "../constants/abi";
import { resolveEverscaleAddress } from "../utils/resolve-everscale-address";

export async function getFullContractState(
  address: Address | string,
  provider: ProviderRpcClient
): Promise<FullContractState | undefined> {
  try {
    return (
      await provider?.getFullContractState({
        address: resolveEverscaleAddress(address),
      })
    )?.state;
  } catch (e) {
    return undefined;
  }
}

export function dexAccountCallbacksContract(
  address: Address | string,
  provider: ProviderRpcClient
): Contract<typeof DexAbi.DexAccountCallbacks> {
  return new provider.Contract(
    DexAbi.DexAccountCallbacks,
    resolveEverscaleAddress(address)
  );
}

export function dexAccountContract(
  address: Address | string,
  provider: ProviderRpcClient
): Contract<typeof DexAbi.Account> {
  return new provider.Contract(
    DexAbi.Account,
    resolveEverscaleAddress(address)
  );
}

export function dexPairCallbacksContract(
  address: Address | string,
  provider: ProviderRpcClient
): Contract<typeof DexAbi.DexPairCallbacks> {
  return new provider.Contract(
    DexAbi.DexPairCallbacks,
    resolveEverscaleAddress(address)
  );
}

export function dexPairContract(
  address: Address | string,
  provider: ProviderRpcClient
): Contract<typeof DexAbi.Pair> {
  return new provider.Contract(DexAbi.Pair, resolveEverscaleAddress(address));
}

export function dexRootContract(
  address: Address | string,
  provider: ProviderRpcClient
): Contract<typeof DexAbi.Root> {
  return new provider.Contract(DexAbi.Root, resolveEverscaleAddress(address));
}

export function dexStablePairContract(
  address: Address | string,
  provider: ProviderRpcClient
): Contract<typeof DexAbi.StablePair> {
  return new provider.Contract(
    DexAbi.StablePair,
    resolveEverscaleAddress(address)
  );
}

export function dexStablePoolContract(
  address: Address | string,
  provider: ProviderRpcClient
): Contract<typeof DexAbi.StablePool> {
  return new provider.Contract(
    DexAbi.StablePool,
    resolveEverscaleAddress(address)
  );
}

export function swapCallbacksContract(
  address: Address | string,
  provider: ProviderRpcClient
): Contract<typeof DexAbi.SwapCallbacks> {
  return new provider.Contract(
    DexAbi.SwapCallbacks,
    resolveEverscaleAddress(address)
  );
}

export function tokenRootContract(
  address: Address | string,
  provider: ProviderRpcClient
): Contract<typeof TokenAbi.Root> {
  return new provider.Contract(TokenAbi.Root, resolveEverscaleAddress(address));
}

export function tokenWalletContract(
  address: Address | string,
  provider: ProviderRpcClient
): Contract<typeof TokenAbi.Wallet> {
  return new provider.Contract(
    TokenAbi.Wallet,
    resolveEverscaleAddress(address)
  );
}

export function wrappedCoinVaultContract(
  address: Address | string,
  provider: ProviderRpcClient
): Contract<typeof EverAbi.WeverVault> {
  return new provider.Contract(
    EverAbi.WeverVault,
    resolveEverscaleAddress(address)
  );
}
