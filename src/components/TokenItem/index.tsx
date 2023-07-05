import { Observer } from "mobx-react-lite";
import { TokenCache } from "@andex/sdk";
import { Button } from "../Button";
import TokenIcon from "../TokenIcon";
import { useTokenBalanceWatcher, useTokensCache } from "../../hooks";
import TokenImportPopup from "../TokenImportPopup";

export type TokenItemProps = {
  disabled?: boolean;
  token: TokenCache;
  onSelect?: (root: string) => void;
};

const TokenItem: React.FC<TokenItemProps> = ({ token, onSelect }) => {
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
        style={{ borderCollapse: "collapse" }}
        className="flex items-center cursor-pointer justify-between px-5 py-5 font-[600] text-[20px] border-y-[1px] border-[#CCCEE7]"
        onClick={isStored ? onClick : undefined}
      >
        <div className="flex gap-2 items-center justify-between">
          <div className="popup-item__icon">
            <TokenIcon
              address={token.root}
              name={token.symbol}
              size="medium"
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
      <Observer>
        {() => <TokenImportPopup isOpen={tokensCache.isImporting} />}
      </Observer>
    </>
  );
}

export default TokenItem;
