/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from "react";
import { Button } from "../../../components/Button";
import { Icon } from "../../../components/Icon";
import { TokenIcon } from "../../../components/TokenIcon";
import { TokensList } from "../../../components/TokensList";
import { useTokensCache } from "../../../state/TokensCacheService";

type Props = {
  disabled?: boolean
  root?: string;
  onOpen?: () => void;
  onClose?: () => void;
  onSelect?: (root: string) => void;
  size?: 'small' | 'medium';
  showIcon?: boolean;
}

export const TokenSelector: FC<Props> = ({
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
  const [listVisible, setListVisible] = useState(false);

  const placeholder = "Select Token...";

  const close = () => {
    setListVisible(false)
    if (onClose) {
      onClose()
    }
  }

  const open = () => {
    setListVisible(true)
    if (onOpen) {
      onOpen()
    }
  }

  const select = (_root: string) => {
    if (onSelect) {
        onSelect(_root)
    }
    close()
  }

  useEffect(() => {
    if (root) {
      (async () => {
        await tokensCache.syncCustomToken(root)
      })()
    }
  }, [root])

  return (
    <div className="mt-8 mb-8">
      <div className="flex item-center justify-between">
        <div
          className="h-15 flex items-center justify-start rounded-full"
          style={{
            boxShadow: "0px 4px 8px rgba(50, 14, 79, 0.15)",
          }}
        >
          <Button
            disabled={disabled}
            btnStyles="w-full h-14 md:w-[15rem] rounded-full bg-[#F3F3F3] dark:bg-purple-dark text-md lg:text-xl font-bold  px-5 py-1 outline-none"
            style={{
              boxShadow: "0px 4px 8px rgba(50, 14, 79, 0.15)",
            }}
            onClick={open}
          >
            <div className="flex gap-4">
              <span 
                className="flex items-center gap-8 overflow-hidden"
                title={token ? token.symbol : placeholder}>
                  {showIcon && token && (
                    <TokenIcon
                      size="small"
                      address={token.root}
                      icon={token.icon}
                    />
                  )}
                  <span className="overflow-hidden truncate">
                    {token ? token.symbol : placeholder}
                  </span>
              </span>
              <span className="">
                <Icon icon="arrowDown" />
              </span>
            </div>
          </Button>

          {listVisible && (
            <TokensList
              onDismiss={close}
              onSelectToken={select}
            />
          )}
        </div>
      </div>
    </div>
  );
};
