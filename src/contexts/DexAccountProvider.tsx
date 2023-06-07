/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ReactNode, createContext, useRef } from "react";
import { DexAccountService, useDexAccount } from "../state/DexAccountService";

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
