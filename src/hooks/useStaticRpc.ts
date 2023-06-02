import { ProviderRpcClient } from "everscale-inpage-provider";
import { EverscaleStandaloneClient } from "everscale-standalone-client";

import { debug } from "../utils/console";

let rpc: ProviderRpcClient

export function useStaticRpc(): ProviderRpcClient {
    if (rpc === undefined) {
        debug(
            '%cCreated a new one ProviderRpcClient instance as a static provider to interacts with contracts',
            'color: #8301e7',
        )
        rpc = new ProviderRpcClient({
            fallback: () => EverscaleStandaloneClient.create({
                connection: {
                    id: 1002,
                    group: "venom_devnet",
                    type: "jrpc",
                    data: {
                      endpoint: "https://jrpc-devnet.venom.foundation/",
                    },
                },
            }),
            forceUseFallback: true,
        })
    }
    return rpc
}