/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { observer } from "mobx-react-lite";
import BigNumber from "bignumber.js";

import TokenIcon from "../TokenIcon";
import NativeCoinItem from "../NativeCoinItem";
import WaypointWrappedItem from "../WaypointWrappedItem";
import { useTokensCache } from "../../state/TokensCacheService";
import { formattedBalance } from "../../utils";
import type { TokenSide } from "../TokensList";
import type { TokenCache } from "../../state/TokensCacheService";
import type { WalletNativeCoin } from "../../state/WalletService";

type Props = {
  combinedTokenRoot?: string;
  currentToken?: TokenCache;
  currentTokenSide?: TokenSide;
  isMultiple?: boolean;
  nativeCoin?: WalletNativeCoin;
  nativeCoinSide?: TokenSide;
  onSelectMultipleSwap?: () => void;
  onSelectNativeCoin?: () => void;
  onSelectToken?: (root: string) => void;
};

const TokenAndCoinCombinatorInner: React.FC<Props> = ({
  combinedTokenRoot,
  currentToken,
  currentTokenSide,
  isMultiple,
  nativeCoin,
  nativeCoinSide,
  onSelectMultipleSwap,
  onSelectNativeCoin,
  onSelectToken,
}) => {
  const tokensCache = useTokensCache();
  const token = tokensCache.get(combinedTokenRoot);

  const combinedBalance = React.useMemo(() => {
    const tokenBalance = new BigNumber(token?.balance ?? 0).shiftedBy(
      token?.decimals !== undefined ? -token.decimals : 0
    );
    const nativeCoinBalance = new BigNumber(nativeCoin?.balance ?? 0).shiftedBy(
      nativeCoin?.decimals !== undefined ? -nativeCoin.decimals : 0
    );
    return formattedBalance(
      tokenBalance
        .plus(nativeCoinBalance)
        .dp(Math.min(token?.decimals || 0, nativeCoin?.decimals || 0))
        .toFixed()
    );
  }, [token?.balance, nativeCoin?.balance]);

  return (
    <div className="popup-list-combined-selector">
      <div
        className="flex items-center cursor-pointer justify-between px-5 py-5 font-[600] text-[15px] border-y-[1px] border-[#CCCEE7]"
        onClick={onSelectMultipleSwap}
      >
        <div className="flex gap-2 items-center">
          <div className="flex items-center">
            <TokenIcon
              name={nativeCoin?.symbol}
              size="medium"
              icon={nativeCoin?.icon}
            />
            <TokenIcon
              className="ml-[-10px]"
              address={token?.root}
              name={token?.symbol}
              size="medium"
              icon={token?.icon}
            />
          </div>
          <div className="popup-item__main">
            <div
              className="popup-item__name"
              title={`${nativeCoin?.symbol} + ${token?.symbol}`}
            >
              {`${nativeCoin?.symbol} + ${token?.symbol}`}
            </div>
            <div className="popup-item__txt">Sum of the both tokens</div>
          </div>
        </div>
        <div className="popup-item__right">{combinedBalance}</div>
      </div>
      <div className="popup-list-combined-selector-inner">
        {nativeCoin !== undefined && (
          <NativeCoinItem
            key={nativeCoin.symbol}
            disabled={currentTokenSide === nativeCoinSide}
            coin={nativeCoin}
            onSelect={onSelectNativeCoin}
          />
        )}
        {token !== undefined && (
          <WaypointWrappedItem
            disabled={
              currentToken?.root === token?.root &&
              currentTokenSide !== nativeCoinSide &&
              !isMultiple
            }
            token={token}
            onSelect={onSelectToken}
          />
        )}
      </div>
    </div>
  );
}

export const TokenAndCoinCombinator = observer(TokenAndCoinCombinatorInner);
