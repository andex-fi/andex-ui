import { Observer } from "mobx-react-lite";

import { Button } from "../Button";
import { TokenIcon } from "../TokenIcon";
import { useTokenBalanceWatcher } from "../../hooks/useTokenBalanceWatcher";
import { TokenImportPopup } from "../TokenImportPopup";
import { TokenCache, useTokensCache } from "../../state/TokensCacheService";

export type TokenItemProps = {
  disabled?: boolean;
  token: TokenCache;
  onSelect?: (root: string) => void;
};

export function TokenItem({ token, onSelect }: TokenItemProps): JSX.Element {
  const tokensCache = useTokensCache();

  const balance = useTokenBalanceWatcher(token, {
    subscriberPrefix: "list",
    unwatchOnUnmount: false,
    watchOnMount: false,
  });

  const onClick = () => {
    onSelect?.(token.root);
  };

  const onImporting = async () => {
    await tokensCache.addToImportQueue(token.root);
  };

  const isStored = tokensCache.has(token.root);

  return (
    <>
      <div
        key={token.root}
        className="flex items-center justify-between px-5 py-2 font-[600] text-[20px] border-y-[1px] border-[#CCCEE7]"
        onClick={isStored ? onClick : undefined}
      >
        <div className="flex items-center justify-between">
          <div className="popup-item__icon">
            <TokenIcon
              address={token.root}
              name={token.symbol}
              size="large"
              icon={token.icon}
            />
          </div>
          <div className="popup-item__main">
            {/* <div className="popup-item__name" title={token.symbol}>
              {token.symbol}
            </div> */}
            <div className="popup-item__txt" title={token.name}>
              {token.name}
            </div>
          </div>
        </div>
        <Observer>
          {() =>
            isStored ? (
              <div className="popup-item__right">{balance.value}</div>
            ) : (
              <div className="popup-item__right">
                <Button
                  btnStyles=""
                  size="sm"
                  type="primary"
                  onClick={onImporting}
                >
                  Import
                </Button>
              </div>
            )
          }
        </Observer>
      </div>
      {tokensCache.isImporting && <TokenImportPopup />}
    </>
  );
}
