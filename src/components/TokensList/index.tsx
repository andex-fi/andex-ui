/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import * as ReactDOM from "react-dom";
import getScrollBarSize from "rc-util/es/getScrollBarSize";

import { NativeCoinItem } from "../NativeCoinItem";
import { TokenAndCoinCombinator } from "../TokenAndCoinCombinator";
import { WaypointWrappedItem } from "../WaypointWrappedItem";
import { useTokensCache } from "../../state/TokensCacheService";
import type { TokenCache } from "../../state/TokensCacheService";
import type { WalletNativeCoin } from "../../state/WalletService";
import { Dialog } from "@headlessui/react";

export type TokenSide = "leftToken" | "rightToken";

type Props = {
  isOpen?: boolean;
  allowMultiple?: boolean;
  currentToken?: TokenCache;
  currentTokenSide?: TokenSide;
  isMultiple?: boolean;
  combinedTokenRoot?: string;
  nativeCoin?: WalletNativeCoin;
  nativeCoinSide?: TokenSide;
  onDismiss: () => void;
  onSelectMultipleSwap?: () => void;
  onSelectNativeCoin?: () => void;
  onSelectToken?: (root: string) => void;
};

export function TokensList({
  isOpen,
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
  const tokensCache = useTokensCache();

  const [query, setSearchQuery] = React.useState<string>();
  const [searchResults, setSearchResults] = React.useState<TokenCache[]>([]);

  const tokens = React.useMemo(
    () =>
      // eslint-disable-next-line no-nested-ternary
      query !== undefined || searchResults.length > 0
        ? searchResults
        : !allowMultiple
        ? tokensCache.tokens
        : tokensCache.tokens.filter(
            (token) => token.root !== combinedTokenRoot
          ),
    [allowMultiple, query, searchResults, tokensCache.tokens]
  );

  const onSearch = React.useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      if (value.length > 0) {
        setSearchQuery(value);
        const results = await tokensCache.search(value);
        setSearchResults(results);
      } else {
        setSearchQuery(undefined);
        setSearchResults([]);
      }
    },
    [query, searchResults]
  );

  React.useEffect(() => {
    try {
      document.body.style.touchAction = "none";
      document.body.style.overflow = "hidden";
      document.body.style.width = `calc(100% - ${getScrollBarSize() || 0}px)`;
    } catch (e) {
      /* empty */
    }
    return () => {
      document.body.style.touchAction = "";
      document.body.style.overflow = "";
      document.body.style.width = "";
    };
  }, []);

  return (
    <Dialog
      open={isOpen}
      onClose={() => onDismiss()}
      className="relative w-full h-full z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="mx-auto w-1/3  py-3 flex flex-col gap-3 rounded-[24px] bg-white shadow-[0_16px_48px_0_rgba(27, 0, 49, 0.16)]">
          <h2 className="text-[#13173E] font-[700] text-[28px] px-5">
            Select a token
          </h2>
          <form className="popup-search px-5">
            <input
              type="text"
              className="block w-full placeholder:text-[#CCCEE7] px-3 py-2 h-[55px] border-[1px] rounded border-[#CCCEE7]"
              placeholder="Search name or paste address"
              value={query}
              onChange={onSearch}
            />
          </form>
          <div className="min-h-[350px] overflow-y-auto">
            {allowMultiple && nativeCoin !== undefined && !query && (
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
            {!allowMultiple && nativeCoin !== undefined && !query && (
              <NativeCoinItem
                key={nativeCoin.symbol}
                disabled={currentTokenSide === nativeCoinSide}
                coin={nativeCoin}
                onSelect={onSelectNativeCoin}
              />
            )}
            {tokens.length > 0 ? (
              tokens.map((token) => (
                <WaypointWrappedItem
                  key={token.root}
                  disabled={
                    currentTokenSide !== nativeCoinSide &&
                    currentToken?.root === token.root
                  }
                  token={token}
                  onSelect={onSelectToken}
                />
              ))
            ) : (
              <div className="popup-search__message">No results found</div>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
