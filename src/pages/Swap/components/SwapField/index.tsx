import * as React from "react";
import classNames from "classnames";
import { observer } from "mobx-react-lite";
import { TokenCache, WalletNativeCoin } from "@andex/sdk";
import { Button } from "../../../../components/Button";
import TokenIcon from "../../../../components/TokenIcon";
import { useField, useTokenBalanceWatcher } from "../../../../hooks";
import TokenIcons from "../../../../components/TokenIcons";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

type Props = {
  balance?: string;
  disabled?: boolean;
  label?: string;
  id?: string;
  isMultiple?: boolean;
  isValid?: boolean;
  nativeCoin?: WalletNativeCoin;
  readOnly?: boolean;
  showMaximizeButton?: boolean;
  token?: TokenCache;
  value?: string;
  onChange?: (value: string) => void;
  onMaximize?: () => void;
  onToggleTokensList?: () => void;
};

const Field: React.FC<Props> = ({
  balance = "0",
  isMultiple = false,
  // isValid = true,
  nativeCoin,
  showMaximizeButton,
  token,
  ...props
}) => {
  const field = useField({
    decimals: nativeCoin !== undefined ? nativeCoin.decimals : token?.decimals,
    value: props.value,
    onChange: props.onChange,
  });
  // const formStore = useSwapFormStore();
  // const tokensCache = formStore.useTokensCache;

  useTokenBalanceWatcher(token, {
    subscriberPrefix: "swap-filed",
  });

  return (
    <>
      <div className="p-6 flex w-full justify-between">
        <input
          autoComplete="off"
          className="bg-transparent focus:border-0 block w-1/3 focus:outline-0 text-5xl "
          id={props.id}
          style={{ background: "transparent" }}
          inputMode="decimal"
          pattern="^[0-9]*[.]?[0-9]*$"
          placeholder="0.0"
          readOnly={props.readOnly}
          type="text"
          value={props.value}
          onBlur={field.onBlur}
          onChange={field.onChange}
        />

        {(() => {
          switch (true) {
            case isMultiple:
              return (
                <Button
                  key="change-token "
                  btnStyles={classNames(
                    "rounded-3xl gap-1 bg-[#F3F3F3] px-1 items-center flex dark:bg-[#482168] text-black dark:text-white shadow-sm drop-shadow-xl ",
                    {
                      disabled: props.disabled,
                    }
                  )}
                  disabled={props.disabled}
                  onClick={props.onToggleTokensList}
                >
                  <span className="form-drop__logo">
                    <TokenIcons
                      icons={[
                        {
                          icon: nativeCoin?.icon,
                          name: nativeCoin?.name,
                        },
                        {
                          address: token?.root,
                          icon: token?.icon,
                          name: token?.name,
                        },
                      ]}
                    />
                  </span>
                  <span className="text-[10px]">
                    <span className="form-drop__arrow">
                      {`${nativeCoin?.symbol} + ${token?.symbol}`}
                    </span>
                  </span>
                  <ChevronDownIcon
                    className="-mr-1 h-7 w-4 text-gray-400"
                    aria-hidden="true"
                  />
                </Button>
              );

            case token !== undefined:
            case nativeCoin !== undefined:
              return (
                <Button
                  key="change-token"
                  btnStyles={classNames(
                    "rounded-3xl gap-2 bg-[#F3F3F3] items-center flex dark:bg-[#482168] px-4 py-3 text-lg font-semibold text-black  dark:text-white shadow-sm drop-shadow-xl ",
                    {
                      disabled: props.disabled,
                    }
                  )}
                  disabled={props.disabled}
                  onClick={props.onToggleTokensList}
                >
                  <span className="form-drop__logo">
                    <TokenIcon
                      address={token?.root}
                      icon={nativeCoin?.icon || token?.icon}
                      name={nativeCoin?.symbol || token?.symbol}
                      size="small"
                    />
                  </span>
                  <span className="form-drop__name">
                    {nativeCoin?.symbol || token?.symbol}
                  </span>
                  <span className="form-drop__arrow">
                    <ChevronDownIcon
                      className="h-4 w-4 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Button>
              );

            default:
              return (
                <Button
                  key="select-token"
                  btnStyles={classNames(
                    "rounded-3xl gap-2 bg-[#F3F3F3] items-center flex dark:bg-[#482168] px-4 py-3 text-lg font-semibold text-black  dark:text-white shadow-sm drop-shadow-xl ",
                    {
                      disabled: props.disabled,
                    }
                  )}
                  disabled={props.disabled}
                  onClick={props.onToggleTokensList}
                >
                  <span className="form-select__txt">Select a token</span>
                  {/* <span className="form-select__arrow"> */}
                  <ChevronDownIcon
                    className="h-4 w-4 text-gray-400"
                    aria-hidden="true"
                  />
                  {/* </span> */}
                </Button>
              );
          }
        })()}
      </div>

      <div className="form-fieldset__footer">
        <div className="form-fieldset__footer-label">{props.label}</div>
        <div className="form-fieldset__footer-inner flex justify-end px-6">
          {(token !== undefined || nativeCoin !== undefined) &&
            typeof props.onMaximize === "function" &&
            showMaximizeButton && (
              <Button
                key="max-button"
                className="form-btn-max"
                btnStyles="mr-auto"
                disabled={props.disabled}
                size="xs"
                type="secondary"
                onClick={props.onMaximize}
              >
                Max
              </Button>
            )}
          <div key="mr-auto text-right" className="swap-field-balance truncate">
            {`Balance ${balance}`}
          </div>
        </div>
      </div>
    </>
  );
}

export const SwapField = observer(Field);
