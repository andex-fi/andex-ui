import * as React from "react";
import { observer } from "mobx-react-lite";

import { Button } from "../../../../components/Button";
import { Icon } from "../../../../components/Icon";
import { useSwapFormStore } from "../../stores/SwapFormStore";
import { SwapDirection } from "../../types";

function SubmitButton(): JSX.Element {
  const formStore = useSwapFormStore();
  const tokensCache = formStore.useTokensCache;
  const wallet = formStore.useWallet;

  if (
    formStore.isPreparing ||
    formStore.isSwapping ||
    formStore.isCalculating ||
    formStore.isLoading ||
    !tokensCache.isReady
  ) {
    return (
      <Button
        block
        size="lg"
        type="primary"
        className="form-submit"
        aria-disabled="true"
        disabled
      >
        <Icon icon="loader" className="spin" />
      </Button>
    );
  }

  const buttonProps: Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "type"
  > = {};
  let buttonText: React.ReactNode = "Swap";

  switch (true) {
    case wallet.account === undefined:
      buttonProps.disabled = wallet.isConnecting;
      buttonProps.onClick = async () => {
        await wallet.connect();
      };
      buttonText = "Connect Wallet";
      break;

    case formStore.leftToken === undefined ||
      formStore.rightToken === undefined:
      buttonProps.disabled = true;
      buttonText = "Select a token";
      break;

    case (formStore.leftAmount.length > 0 ||
      formStore.rightAmount.length > 0) &&
      (formStore.pair === undefined || !formStore.isEnoughLiquidity):
      buttonProps.disabled = true;
      buttonText = "Not enough liquidity";
      break;

    case formStore.leftAmount.length === 0 &&
      formStore.direction === SwapDirection.LTR:
    case formStore.rightAmount.length === 0 &&
      formStore.direction === SwapDirection.RTL:
      buttonProps.disabled = true;
      buttonText = "Enter an ammount";
      break;

    case !formStore.isLeftAmountValid:
      buttonProps.disabled = true;
      buttonText = formStore.isMultipleSwapMode
        ? "Insufficient balance"
        : `Insufficient <s>${
            (formStore.nativeCoinSide === "leftToken"
              ? formStore.coin.symbol
              : formStore.leftToken?.symbol) || ""
          }</s> balance`;
      break;

    case formStore.isConfirmationAwait:
      buttonProps.disabled = true;
      buttonText = "Await confirmation...";
      break;

    case formStore.isValid:
      buttonProps.onClick = () => {
        formStore.setState("isConfirmationAwait", true);
      };
      break;

    default:
      buttonProps.disabled = !formStore.isValid || formStore.isLoading;
  }

  return (
    <Button
      block
      size="lg"
      type="primary"
      className="form-submit"
      aria-disabled={buttonProps.disabled}
      btnStyles="bg-purple-light text-white dark:bg-purple-lightest m-6 p-4 rounded-xl font-bold"
      {...buttonProps}
    >
      {buttonText}
    </Button>
  );
}

export const SwapSubmitButton = observer(SubmitButton);
