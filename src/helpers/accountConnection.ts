import { VenomConnect } from "@andex/wallet-kit";
import { ProviderRpcClient } from "everscale-inpage-provider";
import { EverscaleStandaloneClient } from "everscale-standalone-client";

export const initVenomConnect = async () =>
  new VenomConnect({
    theme: "light",
    providersOptions: {
      venomwallet: {
        links: {
          extension: undefined,
          android: undefined,
          ios: null,
        },
        walletWaysToConnect: [
          {
            package: ProviderRpcClient,

            packageOptions: {
              fallback:
                VenomConnect.getPromise("venomwallet", "extension") ||
                (() => Promise.reject()),
              forceUseFallback: true,
            },
            packageOptionsStandalone: {
              fallback: () =>
                EverscaleStandaloneClient.create({
                  connection: {
                    id: 1000,
                    group: "venom_testnet",
                    type: "jrpc",
                    data: {
                      endpoint: "https://jrpc.venom.foundation/rpc",
                    },
                  },
                }),
              forceUseFallback: true,
            },

            id: "extension",
            type: "extension",
          },
        ],
        defaultWalletWaysToConnect: ["mobile", "ios", "android"],
      },
    },
  });
