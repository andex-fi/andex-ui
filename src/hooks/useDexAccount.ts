/* eslint-disable react-hooks/rules-of-hooks */
import { DexAccountService } from "@andex/sdk";
import { useWallet } from "./useWallet";
import { DexRootAddress } from "../constants";

const wallet = useWallet()
const DexAccount = new DexAccountService(DexRootAddress, wallet);

export function useDexAccount(): DexAccountService {
    
    return DexAccount;
}