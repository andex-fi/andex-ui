/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { reaction } from "mobx";
import { observer } from "mobx-react-lite";

import { Button } from "../../../../components/Button";
import TokenIcon from "../../../../components/TokenIcon";
import TokenIcons from "../../../../components/TokenIcons";
import { SwapBill } from "../SwapBill";
import { useSwapFormStore } from "../../stores/SwapFormStore";
import { Dialog } from "@headlessui/react";
import { Icon } from "../../../../components/Icon";


function ConfirmationPopup({ isOpen }: { isOpen: boolean }): JSX.Element {
  const formStore = useSwapFormStore();

  const [minExpectedAmount, setMinExpectedAmount] = React.useState(
    formStore.swap.minExpectedAmount
  );
  const [leftAmount, setLeftAmount] = React.useState(formStore.swap.leftAmount);
  const [rightAmount, setRightAmount] = React.useState(
    formStore.swap.rightAmount
  );
  const [isChanged, setChangedTo] = React.useState(false);

  const onUpdate = () => {
    setMinExpectedAmount(formStore.swap.minExpectedAmount);
    setLeftAmount(formStore.swap.leftAmount);
    setRightAmount(formStore.swap.rightAmount);
    setChangedTo(false);
  };

  const onDismiss = () => {
    formStore.setState("isConfirmationAwait", false);
  };

  const onSubmit = async () => {
    formStore.setState("isConfirmationAwait", false);
    await formStore.submit();
  };

  React.useEffect(
    () =>
      reaction(
        () => [
          formStore.swap.leftAmount,
          formStore.swap.rightAmount,
          formStore.swap.minExpectedAmount,
        ],
        ([nextLeftAmount, nextRightAmount, nextMinExpectedAmount]) => {
          setChangedTo(
            nextLeftAmount !== leftAmount ||
              nextRightAmount !== rightAmount ||
              nextMinExpectedAmount !== minExpectedAmount
          );
        }
      ),
    []
  );

  return (
    <Dialog
      open={isOpen}
      onClose={() => onDismiss()}
      className="relative w-full h-full z-40"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto w-1/3  p-5 flex flex-col gap-3 rounded-[24px] bg-white dark:bg-purple-dark shadow-[0_16px_48px_0_rgba(27, 0, 49, 0.16)]">
          <Button type="icon" onClick={onDismiss} btnStyles="ml-auto">
            <Icon icon="close" />
          </Button>
          <h2 className="text-center">Confirm transaction</h2>

          <fieldset className="form-fieldset form-fieldset--small form-fieldset--dark">
            <div className="form-fieldset__header">
              <div className="text-center">from</div>
            </div>
            <div className="flex gap-2 items-center justify-center">
              <span>{leftAmount}</span>
              {formStore.multipleSwap.isEnoughTokenBalance && (
                <div
                  key="token-swap"
                  className="flex gap-2 items-center justify-center"
                >
                  <span className="form-drop__logo">
                    <TokenIcon
                      address={formStore.leftToken?.root}
                      icon={formStore.leftToken?.icon}
                      name={formStore.leftToken?.symbol}
                      size="small"
                    />
                  </span>
                  <span className="form-drop__name">
                    {formStore.leftToken?.symbol}
                  </span>
                </div>
              )}
              {formStore.multipleSwap.isEnoughCoinBalance &&
                !formStore.multipleSwap.isEnoughTokenBalance && (
                  <div
                    key="coin-swap"
                    className="flex gap-2 items-center justify-center"
                  >
                    <span className="form-drop__logo">
                      <TokenIcon
                        icon={formStore.coin.icon}
                        name={formStore.coin.symbol}
                        size="small"
                      />
                    </span>
                    <span className="form-drop__name">
                      {formStore.coin.symbol}
                    </span>
                  </div>
                )}
              {!formStore.multipleSwap.isEnoughTokenBalance &&
                !formStore.multipleSwap.isEnoughCoinBalance &&
                formStore.multipleSwap.isEnoughCombinedBalance && (
                  <div
                    key="token-swap"
                    className="flex gap-2 items-center justify-center"
                  >
                    <span className="form-drop__logo">
                      <TokenIcons
                        icons={[
                          {
                            icon: formStore.coin.icon,
                            name: formStore.coin.name,
                          },
                          {
                            address: formStore.leftToken?.root,
                            icon: formStore.leftToken?.icon,
                            name: formStore.leftToken?.name,
                          },
                        ]}
                      />
                    </span>
                    <span className="form-drop__name">
                      {`${formStore.coin.symbol} + ${formStore.leftToken?.symbol}`}
                    </span>
                  </div>
                )}
            </div>
          </fieldset>

          <fieldset className="form-fieldset form-fieldset--small form-fieldset--dark">
            <div className="form-fieldset__header">
              <div className="text-center">to</div>
            </div>
            <div className="justify-center items-center flex gap-2">
              <span>{rightAmount}</span>
              {formStore.nativeCoinSide === "rightToken" ? (
                <>
                  <span className="form-drop__logo">
                    <TokenIcon
                      icon={formStore.coin.icon}
                      name={formStore.coin.symbol}
                      size="small"
                    />
                  </span>
                  <span className="form-drop__name">
                    {formStore.coin.symbol}
                  </span>
                </>
              ) : (
                <>
                  <span className="form-drop__logo">
                    <TokenIcon
                      address={formStore.rightToken?.root}
                      name={formStore.rightToken?.symbol}
                      size="small"
                      icon={formStore.rightToken?.icon}
                    />
                  </span>
                  <span className="form-drop__name">
                    {formStore.rightToken?.symbol}
                  </span>
                </>
              )}
            </div>
          </fieldset>

          {isChanged ? (
            <div className="alert">
              <div>
                <strong>Update a rate to swap the tokens</strong>
                <p>
                  The rate has changed. You can’t swap the tokens at the
                  previous rate.
                </p>
              </div>
              <div>
                <Button
                  btnStyles="bg-purple-light text-white dark:bg-purple-lightest m-6 p-4 rounded-xl font-bold"
                  size="xs"
                  onClick={onUpdate}
                >
                  Update a rate
                </Button>
              </div>
            </div>
          ) : (
            <SwapBill
              key="bill"
              fee={formStore.swap.fee}
              isCrossExchangeAvailable={false}
              isCrossExchangeMode={formStore.isCrossExchangeMode}
              leftToken={formStore.leftToken}
              minExpectedAmount={minExpectedAmount}
              priceImpact={formStore.swap.priceImpact}
              rightToken={formStore.rightToken}
              slippage={formStore.swap.slippage}
              // tokens={formStore.route?.tokens}
            />
          )}

          <Button
            block
            size="lg"
            type="primary"
            disabled={isChanged}
            onClick={onSubmit}
            btnStyles="bg-purple-light text-white dark:bg-purple-lightest m-6 p-4 rounded-xl font-bold"
          >
            Confirm
          </Button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export const MultiSwapConfirmationPopup = observer(ConfirmationPopup);
