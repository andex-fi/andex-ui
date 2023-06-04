/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import getScrollBarSize from 'rc-util/es/getScrollBarSize'

import { Button } from '../Button'
import { Icon } from '../Icon'
import { NativeCoinItem } from '../NativeCoinItem'
import { TokenAndCoinCombinator } from '../TokenAndCoinCombinator'
import { WaypointWrappedItem } from '../WaypointWrappedItem'
import { useTokensCache } from '../../state/TokensCacheService'
import type { TokenCache } from '../../state/TokensCacheService'
import type { WalletNativeCoin } from '../../state/WalletService'

export type TokenSide = 'leftToken' | 'rightToken'


type Props = {
    allowMultiple?: boolean;
    currentToken?: TokenCache;
    currentTokenSide?: TokenSide;
    isMultiple?: boolean;
    combinedTokenRoot?: string;
    nativeCoin?: WalletNativeCoin;
    nativeCoinSide?: TokenSide;
    onDismiss?: () => void;
    onSelectMultipleSwap?: () => void;
    onSelectNativeCoin?: () => void;
    onSelectToken?: (root: string) => void;
}


export function TokensList({
    allowMultiple,
    currentToken,
    currentTokenSide,
    isMultiple,
    combinedTokenRoot,
    nativeCoin,
    nativeCoinSide,
    onDismiss,
    onSelectMultipleSwap,
    onSelectNativeCoin,
    onSelectToken,
}: Props): JSX.Element {
    const tokensCache = useTokensCache()

    const [query, setSearchQuery] = React.useState<string>()
    const [searchResults, setSearchResults] = React.useState<TokenCache[]>([])

    const tokens = React.useMemo(() => (
        // eslint-disable-next-line no-nested-ternary
        (query !== undefined || searchResults.length > 0)
            ? searchResults
            : !allowMultiple ? tokensCache.tokens : tokensCache.tokens.filter(
                token => token.root !== combinedTokenRoot,
            )
    ), [allowMultiple, query, searchResults, tokensCache.tokens])

    const onSearch = React.useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        if (value.length > 0) {
            setSearchQuery(value)
            const results = await tokensCache.search(value)
            setSearchResults(results)
        }
        else {
            setSearchQuery(undefined)
            setSearchResults([])
        }
    }, [query, searchResults])

    React.useEffect(() => {
        try {
            document.body.style.touchAction = 'none'
            document.body.style.overflow = 'hidden'
            document.body.style.width = `calc(100% - ${getScrollBarSize() || 0}px)`
        }
        catch (e) { /* empty */ }
        return () => {
            document.body.style.touchAction = ''
            document.body.style.overflow = ''
            document.body.style.width = ''
        }
    }, [])

    return ReactDOM.createPortal(
        <div className="popup">
            <div onClick={onDismiss} className="popup-overlay" />
            <div className="popup__wrap popup__wrap--list">
                <Button
                    type="icon"
                    onClick={onDismiss}
                    btnStyles="popup-close"
                >
                    <Icon icon="close" />
                </Button>
                <h2 className="popup-title">
                    Select a token
                </h2>
                <form className="popup-search">
                    <input
                        type="text"
                        className="popup-search__input"
                        placeholder="Enter a token name or address..."
                        value={query}
                        onChange={onSearch}
                    />
                </form>
                <div
                    className=""
                >
                    {(allowMultiple && nativeCoin !== undefined && !query) && (
                        <TokenAndCoinCombinator
                            key="multiple"
                            combinedTokenRoot={combinedTokenRoot}
                            currentToken={currentToken}
                            currentTokenSide={currentTokenSide}
                            isMultiple={isMultiple}
                            nativeCoin={nativeCoin}
                            nativeCoinSide={nativeCoinSide}
                            onSelectMultipleSwap={onSelectMultipleSwap}
                            onSelectNativeCoin={onSelectNativeCoin}
                            onSelectToken={onSelectToken}
                        />
                    )}
                    {(!allowMultiple && nativeCoin !== undefined && !query) && (
                        <NativeCoinItem
                            key={nativeCoin.symbol}
                            disabled={currentTokenSide === nativeCoinSide}
                            coin={nativeCoin}
                            onSelect={onSelectNativeCoin}
                        />
                    )}
                    {tokens.length > 0 ? tokens.map(token => (
                        <WaypointWrappedItem
                            key={token.root}
                            disabled={currentTokenSide !== nativeCoinSide && currentToken?.root === token.root}
                            token={token}
                            onSelect={onSelectToken}
                        />
                    )) : (
                        <div className="popup-search__message">
                            No results found
                        </div>
                    )}
                </div>
            </div>
        </div>,
        document.body,
    )
}
