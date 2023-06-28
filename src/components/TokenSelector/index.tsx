import * as React from "react";

import { Button } from "../Button";
import TokenIcon from "../TokenIcon";
import TokensList from "../TokensList";
import { useTokensCache } from "../../state/TokensCacheService";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Observer } from "mobx-react-lite";

type Props = {
  disabled?: boolean;
  root?: string;
  onOpen?: () => void;
  onClose?: () => void;
  onSelect?: (root: string) => void;
  size?: "small" | "medium";
  showIcon?: boolean;
};

const TokenSelector: React.FC<Props> = ({
  disabled,
  root,
  onOpen,
  onClose,
  onSelect,
  // size = 'small',
  showIcon,
}) => {
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
    <div className="dark:bg-purple-light w-full">
      <div className="flex item-center justify-between w-full">
        <Button
          disabled={disabled}
          btnStyles="flex shadow-[0_4px_8px_rgba(50, 14, 79, 0.15)] w-[100%] items-center px-5 gap-1 h-14 bg-[#F3F3F3] w-full dark:bg-purple-dark flex items-center justify-start rounded-full"
          onClick={open}
        >
          <span
            className=" flex items-center gap-2 block w-full rounded-full dark:bg-purple-dark text-md lg:text-xl font-bold py-1 outline-none"
            title={token ? token.symbol : placeholder}
          >
            {showIcon && token && (
              <TokenIcon size="small" address={token.root} icon={token.icon} />
            )}
            <span className="token-selector__symbol">
              {token ? token.symbol : placeholder}
            </span>
          </span>
          <ChevronDownIcon width={"20px"} />
        </Button>

        <Observer>
          {() => (
            <TokensList
              isOpen={listVisible}
              onDismiss={close}
              onSelectToken={select}
              // onSelectNativeCoin={select}
              // nativeCoin={tokensCache.wallet.coin}
            />
          )}
        </Observer>
      </div>
      {/* </div> */}
    </div>
  );
}

export default TokenSelector;
