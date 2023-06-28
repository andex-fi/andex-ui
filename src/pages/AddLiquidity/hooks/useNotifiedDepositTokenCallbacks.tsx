import * as React from "react";
import classNames from "classnames";
import { toast } from "react-toastify";

import TransactionExplorerLink from "../../../components/TransactionExplorerLink";
import type {
  DexAccountDepositTokenCallbacks,
  LiquidityPoolTokenData,
} from "../../../constants/utils";
import { TokensReceivedSuccess } from "../components/TokensReceivedSuccess";
import { useAddLiquidityFormStoreContext } from "../../../contexts/AddLiquidityFormStoreContext";
import type { DepositTokenCallbacks } from "../../../types/LiquidityTypes";
import { notify, NotifyType } from "../../../components/Notification";
import type { TokenCache } from "../../../state/TokensCacheService";
import {
  formattedTokenAmount,
  isMobile,
  stopEventPropagate,
} from "../../../utils";

export function useNotifiedDepositTokenCallbacks(
  props: DexAccountDepositTokenCallbacks
): DepositTokenCallbacks {
  const formStore = useAddLiquidityFormStoreContext();

  const {
    onSend: onSendCallback,
    onTransactionFailure: onTransactionFailureCallback,
    onTransactionSuccess: onTransactionSuccessCallback,
  } = props;

  const onSend = React.useCallback<Required<DepositTokenCallbacks>["onSend"]>(
    (message, params) => {
      const token: TokenCache | undefined = formStore.tokensCache.get(
        params.tokenAddress?.toString()
      );

      const tokens: Record<string, LiquidityPoolTokenData> = {};

      if (formStore.pool?.left.address !== undefined) {
        tokens[formStore.pool.left.address.toString()] = formStore.pool.left;
      }

      if (formStore.pool?.right.address !== undefined) {
        tokens[formStore.pool.right.address.toString()] = formStore.pool.right;
      }

      const poolToken: LiquidityPoolTokenData | undefined = params.tokenAddress
        ? tokens[params.tokenAddress.toString()]
        : undefined;

      onSendCallback?.(message, params);

      notify(
        <div className="notification-body">
          {"Wait until the deposit is completed"}
        </div>,
        `Depositing ${formattedTokenAmount(
          params.amount,
          token?.decimals ?? poolToken?.decimals
        )} ${token?.symbol ?? poolToken?.symbol ?? ""}`,
        {
          autoClose: false,
          closeOnClick: false,
          isLoading: true,
          toastId: `toast__${params.callId}`,
          type: NotifyType.INFO,
        }
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onSendCallback]
  );

  const onTransactionSuccess = React.useCallback<
    Required<DepositTokenCallbacks>["onTransactionSuccess"]
  >(
    (result, receipt) => {
      onTransactionSuccessCallback?.(result);
      notify(
        <TokensReceivedSuccess
          address={result.input.tokenAddress.toString()}
          amount={receipt?.amount ?? result.input.amount}
          decimals={receipt?.receivedDecimals}
          icon={receipt?.receivedIcon}
          symbol={receipt?.receivedSymbol ?? ""}
          txHash={receipt?.hash ?? result.transaction.id.hash}
        />,
        "Deposit has been completed",
        {
          closeOnClick: true,
          isLoading: false,
          toastId: `toast__${result.callId}`,
          type: NotifyType.SUCCESS,
          update: toast.isActive(`toast__${result.callId}`),
        }
      );
    },
    [onTransactionSuccessCallback]
  );

  const onTransactionFailure = React.useCallback<
    Required<DepositTokenCallbacks>["onTransactionFailure"]
  >(
    (reason) => {
      onTransactionFailureCallback?.(reason);
      notify(
        <>
          <div className="notification-body">{reason.message}</div>
          {reason.transaction?.id.hash !== undefined && (
            <div
              className={classNames("notification-actions", {
                "notification-actions--large": isMobile(navigator.userAgent),
              })}
            >
              <TransactionExplorerLink
                className={
                  isMobile(navigator.userAgent)
                    ? "btn btn-link"
                    : "btn btn-secondary"
                }
                id={reason.transaction.id.hash}
                onClick={stopEventPropagate}
              >
                {"Transaction Details"}
              </TransactionExplorerLink>
            </div>
          )}
        </>,
        "Deposit has been canceled",
        {
          closeOnClick: true,
          isLoading: false,
          toastId: `toast__${reason.callId}`,
          type: NotifyType.WARNING,
          update: toast.isActive(`toast__${reason.callId}`),
        }
      );
    },
    [onTransactionFailureCallback]
  );

  return {
    onSend,
    onTransactionFailure,
    onTransactionSuccess,
  };
}
