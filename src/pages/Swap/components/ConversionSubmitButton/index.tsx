import * as React from "react";
import { observer } from "mobx-react-lite";
import { Button } from "../../../../components/Button";
import { useSwapFormStore } from "../../stores/SwapFormStore";
import { SwapExchangeMode } from "../../types";
import { Icon } from "../../../../components/Icon";

const SubmitButton: React.FC = () => {
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
        btnStyles="bg-purple-light text-white dark:bg-purple-lightest m-6 p-4 rounded-xl font-bold"
        disabled
      >
        <Icon icon="loader" className="spin" />
        {/* spinner */}
      </Button>
    );
  }

  const buttonProps: Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "type"
  > = { disabled: true };
  let buttonText: React.ReactNode = "Swap";

  if (formStore.isWrapMode) {
    buttonText = ` Wrap ${formStore.conversion.coin?.symbol}`;
  } else if (formStore.isUnwrapMode) {
    buttonText = `Unwrap ${formStore.conversion.coin?.symbol}`;
  }

  switch (true) {
    case wallet.account === undefined:
      buttonProps.disabled = wallet.isConnecting;
      buttonProps.onClick = async () => {
        await wallet.connect();
      };
      buttonText = "Connect Wallet";
      break;

    case formStore.isWrapMode && formStore.conversion.isWrapValid:
      buttonProps.disabled = false;
      buttonProps.onClick = async () => {
        await formStore.conversion.wrap();
      };
      break;

    case formStore.isUnwrapMode && formStore.conversion.isUnwrapValid:
      buttonProps.disabled = false;
      buttonProps.onClick = async () => {
        if (formStore.exchangeMode === SwapExchangeMode.WRAP_EVER) {
          await formStore.conversion.wrap();
        } else {
          await formStore.conversion.unwrap();
        }
      };
      break;

    default:
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

export const ConversionSubmitButton = observer(SubmitButton);
