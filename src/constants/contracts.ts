/* eslint-disable react-hooks/rules-of-hooks */
import type {
  Address,
  Contract,
  FullContractState,
  ProviderRpcClient,
} from "everscale-inpage-provider";

import { useRpc } from "../hooks";
import { DexAbi, EverAbi, TokenAbi } from "./abi";
import { resolveVenomAddress } from "../utils";

const rpc = useRpc();
const staticRpc = useRpc();

export async function getFullContractState(
  address: Address | string,
  provider: ProviderRpcClient | undefined
): Promise<FullContractState | undefined> {
  try {
    return (
      await provider?.getFullContractState({
        address: resolveVenomAddress(address),
      })
    )?.state;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export function dexAccountCallbacksContract(
  address: Address | string,
  provider = staticRpc
): Contract<typeof DexAbi.DexAccountCallbacks> {
  return new provider.Contract(
    DexAbi.DexAccountCallbacks,
    resolveVenomAddress(address)
  );
}

export function dexAccountContract(
  address: Address | string,
  provider = staticRpc
): Contract<typeof DexAbi.Account> {
  return new provider.Contract(DexAbi.Account, resolveVenomAddress(address));
}

export function dexPairCallbacksContract(
  address: Address | string,
  provider = staticRpc
): Contract<typeof DexAbi.DexPairCallbacks> {
  return new provider.Contract(
    DexAbi.DexPairCallbacks,
    resolveVenomAddress(address)
  );
}

export function dexPairContract(
  address: Address | string,
  provider = staticRpc
): Contract<typeof DexAbi.Pair> {
  return new provider.Contract(DexAbi.Pair, resolveVenomAddress(address));
}

export function dexRootContract(
  address: Address | string,
  provider = staticRpc
): Contract<typeof DexAbi.Root> {
  return new provider.Contract(DexAbi.Root, resolveVenomAddress(address));
}

export function dexStablePairContract(
  address: Address | string,
  provider = staticRpc
): Contract<typeof DexAbi.StablePair> {
  return new provider.Contract(DexAbi.StablePair, resolveVenomAddress(address));
}

export function dexStablePoolContract(
  address: Address | string,
  provider = staticRpc
): Contract<typeof DexAbi.StablePool> {
  return new provider.Contract(DexAbi.StablePool, resolveVenomAddress(address));
}

export function swapCallbacksContract(
  address: Address | string,
  provider = staticRpc
): Contract<typeof DexAbi.SwapCallbacks> {
  return new provider.Contract(
    DexAbi.SwapCallbacks,
    resolveVenomAddress(address)
  );
}

export function tokenRootContract(
  address: Address | string,
  provider = staticRpc
): Contract<typeof TokenAbi.Root> {
  return new provider.Contract(TokenAbi.Root, resolveVenomAddress(address));
}

export function tokenWalletContract(
  address: Address | string,
  provider = rpc
): Contract<typeof TokenAbi.Wallet> {
  return new provider.Contract(TokenAbi.Wallet, resolveVenomAddress(address));
}

export function wrappedCoinVaultContract(
  address: Address | string,
  provider = rpc
): Contract<typeof EverAbi.WeverVault> {
  return new provider.Contract(
    EverAbi.WeverVault,
    resolveVenomAddress(address)
  );
}
