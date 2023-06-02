import { ReactNode, createContext, useState } from "react";
import { useAccountContext } from "../hooks";
import { DexRootAddress } from "../constants/config";
import { getFullContractState } from "../constants/contracts";
import { DexUtils } from "../constants/utils/DexUtils";
import { DexAccountUtils } from "../constants/utils/DexAccountUtils";
import { Address } from "everscale-inpage-provider";

interface DexAccount {
  dexAccount?: Address | string;
  connectOrDepoloy?: () => void;
}

export const DexAccountContext = createContext<DexAccount>({});

function DexAccountProvider({ children }: { children: ReactNode }) {
  const [dexAccount, setDexAccount] = useState<Address | string | undefined>();
  const { address } = useAccountContext();

  const connectDexAccount = async () => {
    const dexRootState = await getFullContractState(DexRootAddress);
    const dexAccountAddress = await DexUtils.getExpectedAccountAddress(
      DexRootAddress,
      address as string,
      dexRootState
    );

    if (!dexAccountAddress) {
      return undefined;
    }

    const state = await getFullContractState(dexAccountAddress);

    if (!state?.isDeployed) {
      return undefined;
    }

    try {
      await DexAccountUtils.version(dexAccountAddress, state);
      setDexAccount(dexAccountAddress);
      return dexAccountAddress;
    } catch (e) {
      return undefined;
    }
  };

  const deployDexAccount = async () => {
    if (address === undefined) {
      return undefined;
    }

    const message = await DexUtils.deployAccount(DexRootAddress, {
      dexAccountOwnerAddress: address,
    });

    return message.transaction;
  };
  const connectOrDepoloy = async () => {
    if (address === undefined) {
      return;
    }

    await connectDexAccount();

    if (dexAccount === undefined) {
      await deployDexAccount();
    }

    await connectDexAccount();
  };

  return (
    <DexAccountContext.Provider value={{ dexAccount, connectOrDepoloy }}>
      {children}
    </DexAccountContext.Provider>
  );
}

export default DexAccountProvider;
