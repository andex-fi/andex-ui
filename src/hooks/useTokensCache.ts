/* eslint-disable react-hooks/rules-of-hooks */
import { TokensCacheService } from "@andex/sdk";
import { useWallet } from "./useWallet";
import { useTokensList } from "./useTokensList";

  
const TokensCacheServiceStore = new TokensCacheService(
    useWallet(),
    useTokensList(),
    { withImportedTokens: true }
);
  
export function useTokensCache(): TokensCacheService {
    return TokensCacheServiceStore;
}
  