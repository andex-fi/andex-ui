/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react";
import { AddLiquidityFormStore } from "../state/liquidity/AddLiquidityFormStore";
import { DexAccountService, useDexAccount } from "../state/DexAccountService";
import {
  TokensCacheService,
  useTokensCache,
} from "../state/TokensCacheService";
import { WalletService, useWallet } from "../state/WalletService";

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
