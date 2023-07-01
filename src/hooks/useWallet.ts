import { DexConstants, WalletService, log } from "@andex/sdk"
import { MinWalletVersion } from "../constants"

let wallet: WalletService

export function useWallet(): WalletService {
    if (wallet === undefined) {
        log(
            '%cCreated a new WalletService instance as global service to interact with the Venom Wallet browser extension',
            'color: #bae701',
        )
        wallet = new WalletService({
            decimals: DexConstants.CoinDecimals,
            icon: DexConstants.CoinLogoURI,
            name: DexConstants.CoinSymbol,
            symbol: DexConstants.CoinSymbol,
        }, {
            minWalletVersion: MinWalletVersion,
        })
    }
    return wallet
}
