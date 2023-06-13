/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from "react";

import { RemoveLiquidityFormStore } from "../state/RemoveLiquidityStore";
import { useDexAccount } from "../state/DexAccountService";
import type { DexAccountService } from "../state/DexAccountService";
import { useTokensCache } from "../state/TokensCacheService";
import type { TokensCacheService } from "../state/TokensCacheService";
import { useWallet } from "../state/WalletService";
import type { WalletService } from "../state/WalletService";

// @ts-ignore
export const ImportLiquidityFormStoreContext =
  // @ts-ignore
  React.createContext<RemoveLiquidityFormStore>();

export type ImportLiquidityFormStoreProviderProps = React.PropsWithChildren<{
  dex?: DexAccountService;
  tokensCache?: TokensCacheService;
  wallet?: WalletService;
}>;

export function useImportLiquidityFormStoreContext(): RemoveLiquidityFormStore {
  return React.useContext(ImportLiquidityFormStoreContext);
}

export function ImportLiquidityFormStoreProvider(
  props: ImportLiquidityFormStoreProviderProps
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
    <ImportLiquidityFormStoreContext.Provider value={context}>
      {children}
    </ImportLiquidityFormStoreContext.Provider>
  );
}
