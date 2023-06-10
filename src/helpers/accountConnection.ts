import { VenomConnect } from "@andex/wallet-kit";
import { ProviderRpcClient } from "@andex/provider";
import { VenomStandaloneClient } from "@andex/client";

export const initVenomConnect = async () =>
  new VenomConnect({
    theme: "light",
    checkNetworkId: 1002,
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
                VenomStandaloneClient.create({
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
            },

            id: "extension",
            type: "extension",
          },
        ],
        defaultWalletWaysToConnect: ["mobile", "ios", "android"],
      },
    },
  });