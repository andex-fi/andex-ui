import BigNumber from "bignumber.js";
import { TokenIcon } from "../TokenIcon";
import type { WalletNativeCoin } from "../../state/WalletService";

export type NativeCoinItemProps = {
  coin: WalletNativeCoin;
  disabled?: boolean;
  onSelect?: () => void;
};

export function NativeCoinItem({
  coin,
  onSelect,
}: NativeCoinItemProps): JSX.Element {
  return (
    <>
      <div
        className="flex items-center cursor-pointer justify-between px-5 py-5 font-[600] text-[20px] border-y-[1px] border-[#CCCEE7]"
        onClick={onSelect}
      >
        <div className="flex items-center justify-between">
          <div className="popup-item__icon">
            <TokenIcon name={coin.symbol} size="large" icon={coin.icon} />
          </div>
          <div className="popup-item__main">
            {/* <div className="popup-item__name" title={coin.symbol}>
              {coin.symbol}
            </div> */}
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
  );
}
