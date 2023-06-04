import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useAccountContext } from "../hooks";
import { DexRootAddress } from "../constants/config";
import { getFullContractState } from "../constants/contracts";
import { DexUtils } from "../constants/utils/DexUtils";
import { DexAccountUtils } from "../constants/utils/DexAccountUtils";
import { Address } from "everscale-inpage-provider";
import { toast } from "react-toastify";

interface DexAccount {
  dexAccount?: Address | string;
  connectOrDepoloy?: () => void;
}

export const DexAccountContext = createContext<DexAccount>({
  dexAccount: "",
});

function DexAccountProvider({ children }: { children: ReactNode }) {
  const [dexAccount, setDexAccount] = useState<Address | string | undefined>();
  const { address, venomProvider } = useAccountContext();

  const connectDexAccount = useCallback(async () => {
    const dexRootState = await getFullContractState(
      DexRootAddress,
      venomProvider
    );
    console.log("Dexroot state", dexRootState);
    console.log("trying to getExpectedAdress.....");
    const dexAccountAddress = await DexUtils.getExpectedAccountAddress(
      DexRootAddress,
      address as string,
      dexRootState,
      venomProvider
    );
    console.log("dex account address:", dexAccountAddress);

    console.log(" expectedAccount checked.....");
    if (!dexAccountAddress) {
      return undefined;
    }

    const state = await getFullContractState(dexAccountAddress, venomProvider);

    console.log("dex account state:", state);
    console.log("checking if address is deployed.....");
    if (!state?.isDeployed) {
      setDexAccount(undefined);
      return undefined;
    }

    console.log("trying to get version.....");
    try {
      await DexAccountUtils.version(dexAccountAddress, state, venomProvider);
      setDexAccount(dexAccountAddress);
      return dexAccountAddress;
    } catch (e) {
      return undefined;
    }
  }, [address, venomProvider]);

  const deployDexAccount = async () => {
    if (address === undefined) {
      return undefined;
    }

    const toastId = toast.info("Creating DEX Account", { autoClose: false });

    try {
      const message = await DexUtils.deployAccount(
        DexRootAddress,
        {
          dexAccountOwnerAddress: address,
        },
        venomProvider
      );
      toast.update(toastId, {
        render: "Account created successfully",
        type: toast.TYPE.SUCCESS,
        autoClose: 5000,
      });
      return message.transaction;
    } catch {
      toast.update(toastId, {
        render: "Account creation failed",
        type: toast.TYPE.ERROR,
        autoClose: 5000,
      });
      return undefined;
    }
  };
  const connectOrDepoloy = async () => {
    if (address === undefined) {
      return;
    }
    console.log("trying to connect.....");
    await connectDexAccount();

    if (dexAccount === undefined) {
      console.log("trying to deploy.....");
      await deployDexAccount();
    }

    await connectDexAccount();
  };

  useEffect(() => {
    if (address) {
      connectDexAccount();
    }
  }, [address, connectDexAccount]);

  return (
    <DexAccountContext.Provider value={{ dexAccount, connectOrDepoloy }}>
      {children}
    </DexAccountContext.Provider>
  );
}

export default DexAccountProvider;
