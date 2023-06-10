import { ProviderRpcClient } from '@andex/provider'
import { VenomStandaloneClient } from '@andex/client'

import { debug } from '../utils'


let rpc: ProviderRpcClient

export function useStaticRpc(): ProviderRpcClient {
    if (rpc === undefined) {
        debug(
            '%cCreated a new one ProviderRpcClient instance as a static provider to interacts with contracts',
            'color: #bae701',
        )
        rpc = new ProviderRpcClient({
            forceUseFallback: true,
            fallback: () => VenomStandaloneClient.create({
                connection: 'devnetJrpc',
            }),
        })
    }
    return rpc
}
