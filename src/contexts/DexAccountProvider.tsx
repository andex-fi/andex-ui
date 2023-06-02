import React, { ReactNode, createContext, useState } from "react";
import { useAccountContext, useRpc, useStaticRpc } from "../hooks";
import { DexAbi } from "../constants/abi";
import { DexRootAddress } from "../constants/dev";
import { dexRootContract, getFullContractState } from "../helpers/contracts";

interface DexAccount {
  address?: string;
  connectOrDepoloy?: () => void;
}

const DexAccountContext = createContext<DexAccount>({});

function DexAccountProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | undefined>();

  const staticRpc = useStaticRpc();
  const rpc = useRpc();
  const connect = async () => {
    const contract = dexRootContract(DexRootAddress, staticRpc);
    const dexRootState = await getFullContractState(DexRootAddress, staticRpc);
    const address = (
      await contract?.methods
        .getExpectedAccountAddress({
          account_owner: DexRootAddress,
          answerId: 0,
        })
        .call({ cachedState: dexRootState })
    )?.value0;
    const dexAccountAddress = await getFullContractState(address, staticRpc);
    if (!dexAccountAddress) {
      return undefined;
    }

    const state = await getFullContractState(dexAccountAddress, staticRpc);

    if (!state?.isDeployed) {
      return undefined;
    }

    try {
      // await DexAccountUtils.version(dexAccountAddress, state);
      return dexAccountAddress;
    } catch (e) {
      return undefined;
    }
  };

  return (
    <DexAccountContext.Provider value={{}}>
      {children}
    </DexAccountContext.Provider>
  );
}

export default DexAccountProvider;
