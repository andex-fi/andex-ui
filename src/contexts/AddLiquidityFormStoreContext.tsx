/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from "react";
import { DexAccountService, useDexAccount } from "../state/DexAccountService";

import { WalletService, useWallet } from "../state/WalletService";
import { AddLiquidityFormStore } from "../state/AddLiquidityFormStore";
import {
  TokensCacheService,
  useTokensCache,
} from "../state/TokensCacheService";

/// @ts-ignore
export const AddLiquidityFormStoreContext =
  // @ts-ignore
  React.createContext<AddLiquidityFormStore>();

export type AddLiquidityFormStoreProviderProps = React.PropsWithChildren<{
  dex?: DexAccountService;
  tokensCache?: TokensCacheService;
  wallet?: WalletService;
}>;

export function useAddLiquidityFormStoreContext(): AddLiquidityFormStore {
  return React.useContext(AddLiquidityFormStoreContext);
}

export function AddLiquidityFormStoreProvider(
  props: AddLiquidityFormStoreProviderProps
): JSX.Element {
  const {
    children,
    dex = useDexAccount(),
    tokensCache = useTokensCache(),
    wallet = useWallet(),
  } = props;

  const { current: context } = React.useRef(
    new AddLiquidityFormStore(wallet, dex, tokensCache)
  );

  return (
    <AddLiquidityFormStoreContext.Provider value={context}>
      {children}
    </AddLiquidityFormStoreContext.Provider>
  );
}
