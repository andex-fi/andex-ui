import * as React from "react";
import BigNumber from "bignumber.js";
import { toast } from "react-toastify";

import TransactionExplorerLink from "../../../components/TransactionExplorerLink";
import type { LiquidityPoolDepositCallbacks } from "@andex/sdk";
import { TokensReceivedSuccess } from "../components/TokensReceivedSuccess";
import type { DepositLiquidityCallbacks } from "../../../types/LiquidityTypes";
import { notify, NotifyType } from "../../../components/Notification";
import {
  formattedTokenAmount,
  isMobile,
  stopEventPropagate,
} from "../../../utils";
import classNames from "classnames";

export function useNotifiedDepositLiquidityCallbacks(
  props: LiquidityPoolDepositCallbacks
): DepositLiquidityCallbacks {
  const {
    onSend: onSendCallback,
    onTransactionFailure: onTransactionFailureCallback,
    onTransactionSuccess: onTransactionSuccessCallback,
  } = props;

  const onSend = React.useCallback<
    Required<DepositLiquidityCallbacks>["onSend"]
  >(
    (message, params) => {
      onSendCallback?.(message, params);

      notify(
        <div className="notification-body">
          {"Wait until liquidity has been deposited"}
        </div>,
        "Deposit has been completed",
        {
          autoClose: false,
          closeOnClick: false,
          isLoading: true,
          toastId: `toast__${params.callId}`,
          type: NotifyType.INFO,
        }
      );
    },
    [onSendCallback]
  );

  const onTransactionSuccess = React.useCallback<
    Required<DepositLiquidityCallbacks>["onTransactionSuccess"]
  >(
    (result, receipt) => {
      onTransactionSuccessCallback?.(result, receipt);

      let { amount = "0" } = { ...receipt };

      if (result.input.type === "common") {
        amount = new BigNumber(result.input.result.step_1_lp_reward)
          .plus(result.input.result.step_3_lp_reward)
          .toFixed();
      } else if (result.input.type === "stable") {
        amount = result.input.result.lp_reward;
      }

      notify(
        receipt?.receivedRoot === undefined ? (
          <>
            <div className="notification-body">
              {`Wait until liquidity has been deposited ${formattedTokenAmount(
                amount,
                receipt?.receivedDecimals
              )} ${receipt?.receivedSymbol ?? ""}`}
            </div>
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
                id={result.transaction.id.hash}
                onClick={stopEventPropagate}
              >
                {`Transaction details`}
              </TransactionExplorerLink>
            </div>
          </>
        ) : (
          <TokensReceivedSuccess
            address={receipt.receivedRoot}
            amount={amount}
            decimals={receipt.receivedDecimals}
            icon={receipt.receivedIcon}
            symbol={receipt.receivedSymbol}
            txHash={receipt.hash ?? result.transaction.id.hash}
          />
        ),
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
    Required<DepositLiquidityCallbacks>["onTransactionFailure"]
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
