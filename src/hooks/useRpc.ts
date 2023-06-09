import { ProviderRpcClient } from '@andex/provider'

import { debug } from '../utils/console'

let rpc: ProviderRpcClient

export function useRpc(): ProviderRpcClient {
    if (rpc === undefined) {
        debug(
            '%cCreated a new one ProviderRpcClient instance as global connection to the VENOM Wallet',
            'color: #8301e7',
        )
        rpc = new ProviderRpcClient()
    }

    return rpc
}