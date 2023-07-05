/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from "react";
import { RemoveLiquidityFormStore } from "../state/liquidity/RemoveLiquidityStore";
import { useDexAccount } from "../state/DexAccountService";
import type { DexAccountService } from "../state/DexAccountService";
import { useTokensCache, useWallet } from "../hooks";
import type { TokensCacheService, WalletService } from "@andex/sdk";

// @ts-ignore
export const RemoveLiquidityFormStoreContext =
  // @ts-ignore
  React.createContext<RemoveLiquidityFormStore>();

export type RemoveLiquidityFormStoreProviderProps = React.PropsWithChildren<{
  dex?: DexAccountService;
  tokensCache?: TokensCacheService;
  wallet?: WalletService;
}>;

export function useRemoveLiquidityFormStoreContext(): RemoveLiquidityFormStore {
  return React.useContext(RemoveLiquidityFormStoreContext);
}

export function RemoveLiquidityFormStoreProvider(
  props: RemoveLiquidityFormStoreProviderProps
): JSX.Element {
  const {
    children,
    dex = useDexAccount(),
    tokensCache = useTokensCache(),
    wallet = useWallet(),
  } = props;

  const { current: context } = React.useRef(
    new RemoveLiquidityFormStore(wallet, dex, tokensCache)
  );

  return (
    <RemoveLiquidityFormStoreContext.Provider value={context}>
      {children}
    </RemoveLiquidityFormStoreContext.Provider>
  );
}
