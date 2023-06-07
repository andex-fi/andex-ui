import { ProviderRpcClient } from "everscale-inpage-provider";

import { debug } from "../utils/console";
import { VenomConnect } from "@andex/wallet-kit";

let rpc: ProviderRpcClient;

export function useRpc(): ProviderRpcClient {
  if (rpc === undefined) {
    debug(
      "%cCreated a new one ProviderRpcClient instance as global connection to the VENOM Wallet",
      "color: #8301e7"
    );
    rpc = new ProviderRpcClient({
      fallback:
        VenomConnect.getPromise("venomwallet", "extension") ||
        (() => Promise.reject()),
      forceUseFallback: true,
    });
  }

  return rpc;
}
export function getRpc(): ProviderRpcClient {
  if (rpc === undefined) {
    debug(
      "%cCreated a new one ProviderRpcClient instance as global connection to the VENOM Wallet",
      "color: #8301e7"
    );
    rpc = new ProviderRpcClient({
      fallback:
        VenomConnect.getPromise("venomwallet", "extension") ||
        (() => Promise.reject()),
      forceUseFallback: true,
    });
  }

  return rpc;
}
