import { TokensListService, TokenListURI } from "@andex/sdk"

const tokenList = new TokensListService(TokenListURI)

export function useTokensList(): TokensListService {

    return tokenList
}