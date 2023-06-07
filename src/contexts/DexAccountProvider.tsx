/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAccountContext } from "../hooks";
import { DexRootAddress } from "../constants/config";
import { getFullContractState } from "../constants/contracts";
import { DexUtils } from "../constants/utils/DexUtils";
import { DexAccountUtils } from "../constants/utils/DexAccountUtils";
import { Address } from "everscale-inpage-provider";
import { toast } from "react-toastify";
// import { WalletService, useWallet } from "../state/WalletService";
import { DexAccountService, useDexAccount } from "../state/DexAccountService";

// interface DexAccount {
//   dexAccountLoading?: boolean;
//   dexAccount?: Address | string;
//   connectOrDepoloy?: () => void;
// }
//@ts-ignore
export const DexAccountContext = createContext<DexAccountService>();

function DexAccountProvider({ children }: { children: ReactNode }) {
  const { current: context } = useRef(useDexAccount());
  console.log("dex context: ", context);

  // useEffect(() => {
  //   const connect = async () => {
  //     console.log(await context.connect());
  //   };
  //   connect();
  // }, [context]);

  return (
    <DexAccountContext.Provider value={context}>
      {children}
    </DexAccountContext.Provider>
  );
}

export default DexAccountProvider;
