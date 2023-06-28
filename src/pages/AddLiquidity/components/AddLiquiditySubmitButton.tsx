/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react";
import { observer } from "mobx-react-lite";

import { Button } from "../../../components/Button";
import { isAddressValid } from "../../../constants";
import { useAddLiquidityFormStoreContext } from "../../../contexts/AddLiquidityFormStoreContext";
import {
  useNotifiedDepositLiquidityCallbacks,
  useNotifiedDepositTokenCallbacks,
  useNotifiedPoolConnectionCallbacks,
  useNotifiedPoolCreationCallbacks,
} from "../hooks/index";
import { useFavoritePools } from "../../../state/FavoritePairs";
import { isGoodBignumber } from "../../../utils";
import { Oval } from "react-loader-spinner";

const SubmitButton: React.FC = () => {
  const formStore = useAddLiquidityFormStoreContext();
  const poolConnectionCallbacks = useNotifiedPoolConnectionCallbacks({});
  const poolCreationCallbacks = useNotifiedPoolCreationCallbacks({});
  const tokenDepositCallbacks = useNotifiedDepositTokenCallbacks({});
  const liquidityDepositCallbacks = useNotifiedDepositLiquidityCallbacks({
    onTransactionSuccess: (_, receipt) => {
      if (isAddressValid(receipt.poolAddress?.toString())) {
        const faves = useFavoritePools();
        faves.add(receipt.poolAddress.toString());
      }
    },
  });

  if (
    formStore.isPreparing ||
    formStore.isConnectingDexAccount ||
    formStore.isCheckingDexAccount ||
    formStore.isCreatingPool ||
    formStore.isConnectingPool ||
    (formStore.isDepositingLeft && formStore.isEnoughDexRightBalance) ||
    formStore.isDepositingRight ||
    formStore.isDepositingLiquidity ||
    formStore.isSyncingPool
  ) {
    return (
      <Button
        aria-disabled="true"
        block
        className="form-submit"
        disabled
        size="lg"
        type="primary"
        btnStyles="bg-[#52058F] dark:bg-purple-lightest text-white flex items-center justify-center w-full rounded-lg py-3 mt-4"
      >
        <Oval
          height={20}
          width={20}
          strokeWidth={5}
          strokeWidthSecondary={5}
          color={"rgba(255, 255, 255)"}
          secondaryColor="rgba(255, 255, 255, 0.1)"
        />
      </Button>
    );
  }

  const buttonProps: Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "type"
  > = {
    disabled: true,
  };
  let buttonText = "Supply";

  const isLeftAmountEmpty = !isGoodBignumber(formStore.leftAmount);
  const isRightAmountEmpty = !isGoodBignumber(formStore.rightAmount);

  switch (true) {
    case formStore.dex.address === undefined &&
      formStore.isCheckingDexAccount === false:
      buttonProps.disabled = false;
      buttonProps.onClick = async () => {
        await formStore.connectDexAccount();
      };
      buttonText = "Connect Account";
      break;

    case formStore.leftToken === undefined ||
      formStore.rightToken === undefined:
      buttonProps.disabled = true;
      buttonText = "Select Pair";
      break;

    case formStore.pool?.address === undefined &&
      formStore.isSyncingPool === false:
      buttonProps.disabled = false;
      buttonProps.onClick = async () => {
        await formStore.createPool(poolCreationCallbacks);
      };
      buttonText = "Create Pool";
      break;

    case !formStore.isPoolConnected && formStore.isSyncingPool === false:
      buttonProps.disabled = false;
      buttonProps.onClick = async () => {
        await formStore.connectPool(poolConnectionCallbacks);
      };
      buttonText = "Connect Pool";
      break;

    case !isLeftAmountEmpty &&
      !formStore.isEnoughDexLeftBalance &&
      !formStore.isDepositingLeft:
      buttonProps.disabled =
        formStore.isAwaitingLeftDeposit || !formStore.isLeftAmountValid;
      buttonProps.onClick = async () => {
        if (buttonProps.disabled) {
          return;
        }

        if (formStore.leftToken?.root !== undefined) {
          await formStore.depositLeftToken(tokenDepositCallbacks);
        }
      };
      buttonText = `Deposit ${formStore.leftToken?.symbol ?? ""}`;
      break;

    case !isRightAmountEmpty && !formStore.isEnoughDexRightBalance:
      buttonProps.disabled =
        formStore.isAwaitingRightDeposit ||
        formStore.isDepositingRight ||
        !formStore.isRightAmountValid;
      buttonProps.onClick = async () => {
        if (buttonProps.disabled) {
          return;
        }

        if (formStore.rightToken?.root !== undefined) {
          await formStore.depositRightToken(tokenDepositCallbacks);
        }
      };
      buttonText = `Deposit ${formStore.rightToken?.symbol ?? ""}`;
      break;

    case formStore.isSupplyReady:
      buttonProps.disabled =
        formStore.isDepositingLiquidity ||
        formStore.isWithdrawingLeftToken ||
        formStore.isWithdrawingRightToken;
      buttonProps.onClick = async () => {
        if (buttonProps.disabled) {
          return;
        }
        await formStore.supply(liquidityDepositCallbacks);
      };
      buttonText = "Supply";
      break;

    case isLeftAmountEmpty || isRightAmountEmpty:
      buttonProps.disabled = true;
      buttonText = "Enter an amount";
      break;

    default:
  }

  if (!formStore.wallet.address) {
    buttonProps.disabled = formStore.wallet.isConnecting;
    buttonProps.onClick = async () => {
      await formStore.wallet.connect();
    };
    buttonText = "Connect Wallet";
  }

  return (
    <Button
      btnStyles="bg-[#52058F] dark:bg-purple-lightest text-white flex items-center justify-center w-full rounded-lg py-3 mt-4"
      aria-disabled={buttonProps.disabled}
      block
      size="lg"
      type="primary"
      {...buttonProps}
    >
      {buttonText}
    </Button>
  );
}

export const AddLiquiditySubmitButton = observer(SubmitButton);
