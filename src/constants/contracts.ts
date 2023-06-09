/* eslint-disable react-hooks/rules-of-hooks */
import type { Address, Contract, FullContractState } from '@andex/provider'

import { useRpc, useStaticRpc } from '../hooks'
import { DexAbi, EverAbi, TokenAbi } from '../constants/abi'
import { resolveVenomAddress } from '../utils'


// const rpc = useRpc()
// const staticRpc = useStaticRpc()


export async function getFullContractState(address: Address | string): Promise<FullContractState | undefined> {
  const staticRpc = useStaticRpc()  
  try {
        return (await staticRpc.getFullContractState({ address: resolveVenomAddress(address) })).state
    }
    catch (e) {
        return undefined
    }
}

export function dexAccountCallbacksContract(
    address: Address | string,
    provider = useStaticRpc(),
): Contract<typeof DexAbi.DexAccountCallbacks> {
    return new provider.Contract(DexAbi.DexAccountCallbacks, resolveVenomAddress(address))
}

export function dexAccountContract(
    address: Address | string,
    provider = useStaticRpc(),
): Contract<typeof DexAbi.Account> {
    return new provider.Contract(DexAbi.Account, resolveVenomAddress(address))
}

export function dexPairCallbacksContract(
    address: Address | string,
    provider = useStaticRpc(),
): Contract<typeof DexAbi.DexPairCallbacks> {
    return new provider.Contract(DexAbi.DexPairCallbacks, resolveVenomAddress(address))
}

export function dexPairContract(
    address: Address | string,
    provider = useStaticRpc(),
): Contract<typeof DexAbi.Pair> {
    return new provider.Contract(DexAbi.Pair, resolveVenomAddress(address))
}

export function dexRootContract(
    address: Address | string,
    provider = useStaticRpc(),
): Contract<typeof DexAbi.Root> {
    return new provider.Contract(DexAbi.Root, resolveVenomAddress(address))
}

export function dexStablePairContract(
    address: Address | string,
    provider = useStaticRpc(),
): Contract<typeof DexAbi.StablePair> {
    return new provider.Contract(DexAbi.StablePair, resolveVenomAddress(address))
}

export function dexStablePoolContract(
    address: Address | string,
    provider = useStaticRpc(),
): Contract<typeof DexAbi.StablePool> {
    return new provider.Contract(DexAbi.StablePool, resolveVenomAddress(address))
}

export function swapCallbacksContract(
    address: Address | string,
    provider = useStaticRpc(),
): Contract<typeof DexAbi.SwapCallbacks> {
    return new provider.Contract(DexAbi.SwapCallbacks, resolveVenomAddress(address))
}

export function tokenRootContract(
    address: Address | string,
    provider = useStaticRpc(),
): Contract<typeof TokenAbi.Root> {
    return new provider.Contract(TokenAbi.Root, resolveVenomAddress(address))
}

export function tokenWalletContract(
    address: Address | string,
    provider = useRpc(),
): Contract<typeof TokenAbi.Wallet> {
    return new provider.Contract(TokenAbi.Wallet, resolveVenomAddress(address))
}

export function wrappedCoinVaultContract(
    address: Address | string,
    provider = useRpc(),
): Contract<typeof EverAbi.WeverVault> {
    return new provider.Contract(EverAbi.WeverVault, resolveVenomAddress(address))
}
