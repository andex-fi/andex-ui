import * as React from "react";
import classNames from "classnames";
import { toast } from "react-toastify";

import { TransactionExplorerLink } from "../../../components/TransactionExplorerLink";
import type { LiquidityPoolCreateCallbacks } from "../../../constants";
import { notify, NotifyType } from "../../../components/Notification";
import { isMobile, stopEventPropagate } from "../../../utils";

export function useNotifiedPoolCreationCallbacks(
  props: LiquidityPoolCreateCallbacks
): LiquidityPoolCreateCallbacks {
  const {
    onSend: onSendCallback,
    onTransactionFailure: onTransactionFailureCallback,
    onTransactionSuccess: onTransactionSuccessCallback,
  } = props;

  const onSend = React.useCallback<
    Required<LiquidityPoolCreateCallbacks>["onSend"]
  >(
    (message, params) => {
      onSendCallback?.(message, params);
      notify(
        <div className="notification-body">
          {"Wait until the pool is created"}
        </div>,
        "Creating pool",
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
    Required<LiquidityPoolCreateCallbacks>["onTransactionSuccess"]
  >(
    (result) => {
      onTransactionSuccessCallback?.(result);
      notify(
        <>
          <div className="notification-body">
            {"Now you may connect to the pool"}
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
              {"Transaction details"}
            </TransactionExplorerLink>
          </div>
        </>,
        "Pool has been created",
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
    Required<LiquidityPoolCreateCallbacks>["onTransactionFailure"]
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
                {"Transaction details"}
              </TransactionExplorerLink>
            </div>
          )}
        </>,
        "Pool creation was canceled",
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
