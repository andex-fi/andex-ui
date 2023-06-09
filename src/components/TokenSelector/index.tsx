import * as React from "react";

import { Button } from "../Button";
import { TokenIcon } from "../TokenIcon";
import { TokensList } from "../TokensList";
import { useTokensCache } from "../../state/TokensCacheService";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

type Props = {
  disabled?: boolean;
  root?: string;
  onOpen?: () => void;
  onClose?: () => void;
  onSelect?: (root: string) => void;
  size?: "small" | "medium";
  showIcon?: boolean;
};

export function TokenSelector({
  disabled,
  root,
  onOpen,
  onClose,
  onSelect,
  // size = 'small',
  showIcon,
}: Props): JSX.Element {
  const tokensCache = useTokensCache();
  const token = root && tokensCache.get(root);
  const [listVisible, setListVisible] = React.useState(false);

  const placeholder = "Select token";

  const close = () => {
    setListVisible(false);
    if (onClose) {
      onClose();
    }
  };

  const open = () => {
    setListVisible(true);
    if (onOpen) {
      onOpen();
    }
  };

  const select = (_root: string) => {
    if (onSelect) {
      onSelect(_root);
    }
    close();
  };

  React.useEffect(() => {
    if (root) {
      (async () => {
        await tokensCache.syncCustomToken(root);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [root]);

  return (
    <div className="dark:bg-purple-light">
      <div className="flex item-center justify-between w-full">
        <div
          className="h-14 bg-[#F3F3F3] dark:bg-purple-dark flex items-center justify-start rounded-full"
          style={{
            boxShadow: "0px 4px 8px rgba(50, 14, 79, 0.15)",
          }}
        >
          <Button
            disabled={disabled}
            btnStyles="flex items-center px-5 gap-1"
            onClick={open}
          >
            <span
              className=" flex items-center gap-1 justify-between block w-full rounded-full dark:bg-purple-dark text-md lg:text-xl font-bold py-1 outline-none"
              title={token ? token.symbol : placeholder}
            >
              {showIcon && token && (
                <TokenIcon
                  size="small"
                  address={token.root}
                  icon={token.icon}
                />
              )}
              <span className="token-selector__symbol">
                {token ? token.symbol : placeholder}
              </span>
            </span>
            <ChevronDownIcon width={"20px"} />
          </Button>

          <TokensList
            isOpen={listVisible}
            onDismiss={close}
            onSelectToken={select}
          />
        </div>
      </div>
    </div>
  );
}
