import BigNumber from "bignumber.js";
import { TokenIcon } from "../TokenIcon";
import type { WalletNativeCoin } from "../../state/WalletService";

export type NativeCoinItemProps = {
    coin: WalletNativeCoin;
    disabled?: boolean;
    onSelect?: () => void;
}

export function NativeCoinItem({ coin, onSelect }: NativeCoinItemProps): JSX.Element {
    return (
        <>
            <div
                className=""
                onClick={onSelect}
            >
                <div className="popup-item__left">
                    <div className="popup-item__icon">
                        <TokenIcon
                            name={coin.symbol}
                            size="small"
                            icon={coin.icon}
                        />
                    </div>
                    <div className="popup-item__main">
                        <div className="popup-item__name" title={coin.symbol}>
                            {coin.symbol}
                        </div>
                        <div className="popup-item__txt" title={coin.name}>
                            {coin.name}
                        </div>
                    </div>
                </div>
                <div className="popup-item__right">
                    {new BigNumber(coin.balance ?? 0).shiftedBy(-coin.decimals).toFixed()}
                </div>
            </div>
        </>
    )
}
