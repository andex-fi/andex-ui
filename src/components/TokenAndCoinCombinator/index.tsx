/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react'
import { observer } from 'mobx-react-lite'
import BigNumber from 'bignumber.js'

import { TokenIcon } from '../TokenIcon'
import { NativeCoinItem } from '../NativeCoinItem'
import { WaypointWrappedItem } from '../WaypointWrappedItem'
import { useTokensCache } from '../../state/TokensCacheService'
import { formattedBalance } from '../../utils'
import type { TokenSide } from '../TokensList'
import type { TokenCache } from '../../state/TokensCacheService'
import type { WalletNativeCoin } from '../../state/WalletService'


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
}


export function TokenAndCoinCombinatorInner({
    combinedTokenRoot,
    currentToken,
    currentTokenSide,
    isMultiple,
    nativeCoin,
    nativeCoinSide,
    onSelectMultipleSwap,
    onSelectNativeCoin,
    onSelectToken,
}: Props): JSX.Element {
    const tokensCache = useTokensCache()
    const token = tokensCache.get(combinedTokenRoot)

    const combinedBalance = React.useMemo(() => {
        const tokenBalance = new BigNumber(token?.balance ?? 0)
            .shiftedBy(token?.decimals !== undefined ? -token.decimals : 0)
        const nativeCoinBalance = new BigNumber(nativeCoin?.balance ?? 0)
            .shiftedBy(nativeCoin?.decimals !== undefined ? -nativeCoin.decimals : 0)
        return formattedBalance(
            tokenBalance
                .plus(nativeCoinBalance)
                .dp(Math.min((token?.decimals || 0), (nativeCoin?.decimals || 0)))
                .toFixed(),
        )
    }, [token?.balance, nativeCoin?.balance])

    return (
        <div className="popup-list-combined-selector">
            <div
                className=""
                onClick={onSelectMultipleSwap}
            >
                <div className="popup-item__left">
                    <div className="popup-item__icon">
                        <TokenIcon
                            name={nativeCoin?.symbol}
                            size="xsmall"
                            icon={nativeCoin?.icon}
                        />
                        <TokenIcon
                            address={token?.root}
                            name={token?.symbol}
                            size="xsmall"
                            icon={token?.icon}
                        />
                    </div>
                    <div className="popup-item__main">
                        <div className="popup-item__name" title={`${nativeCoin?.symbol} + ${token?.symbol}`}>
                            {`${nativeCoin?.symbol} + ${token?.symbol}`}
                        </div>
                        <div className="popup-item__txt">
                            Sum of the both tokens
                        </div>
                    </div>
                </div>
                <div className="popup-item__right">
                    {combinedBalance}
                </div>
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
                        disabled={(
                            currentToken?.root === token?.root
                            && currentTokenSide !== nativeCoinSide
                            && !isMultiple
                        )}
                        token={token}
                        onSelect={onSelectToken}
                    />
                )}
            </div>
        </div>
    )
}

export const TokenAndCoinCombinator = observer(TokenAndCoinCombinatorInner)
