import * as React from 'react'
import { toast } from 'react-toastify'

import TransactionExplorerLink from '../../../components/TransactionExplorerLink'
import type { LiquidityPoolWithdrawCallbacks } from '@andex/sdk'
import { notify, NotifyType } from '../../../components/Notification'
import { isMobile, stopEventPropagate } from '../../../utils'


export function useNotifiedWithdrawLiquidityCallbacks(
    props: LiquidityPoolWithdrawCallbacks,
): LiquidityPoolWithdrawCallbacks {

    const {
        onSend: onSendCallback,
        onTransactionFailure: onTransactionFailureCallback,
        onTransactionSuccess: onTransactionSuccessCallback,
    } = props

    const onSend = React.useCallback<Required<LiquidityPoolWithdrawCallbacks>['onSend']>((message, params) => {
        onSendCallback?.(message, params)

        notify(
            <div className="notification-body">
                Wait until the withdrawal is completed
            </div>,
            `Withdrawing Liquidity`,
            {
                autoClose: false,
                closeOnClick: false,
                isLoading: true,
                toastId: `toast__${params.callId}`,
                type: NotifyType.INFO,
            },
        )
    }, [onSendCallback])

    const onTransactionSuccess = React.useCallback<Required<LiquidityPoolWithdrawCallbacks>['onTransactionSuccess']>(result => {
        onTransactionSuccessCallback?.(result)

        notify(
            <>
                <div className="notification-body">
                    You have successfully withdrawn liquidity
                </div>
                <div
                    className=""
                >
                    <TransactionExplorerLink
                        className=""
                        id={result.transaction.id.hash}
                        onClick={stopEventPropagate}
                    >
                        Transaction Details
                    </TransactionExplorerLink>
                </div>
            </>,
            `Withdrawal has been completed`,
            {
                closeOnClick: true,
                isLoading: false,
                toastId: `toast__${result.callId}`,
                type: NotifyType.SUCCESS,
                update: toast.isActive(`toast__${result.callId}`),
            },
        )
    }, [onTransactionSuccessCallback])

    const onTransactionFailure = React.useCallback<Required<LiquidityPoolWithdrawCallbacks>['onTransactionFailure']>(reason => {
        onTransactionFailureCallback?.(reason)
        notify(
            <>
                <div className="notification-body">
                    {reason.message}
                </div>
                {reason.transaction?.id.hash !== undefined && (
                    <div
                        className=""
                    >
                        <TransactionExplorerLink
                            className={isMobile(navigator.userAgent) ? 'btn btn-link' : 'btn btn-secondary'}
                            id={reason.transaction.id.hash}
                            onClick={stopEventPropagate}
                        >
                            Transaction Details
                        </TransactionExplorerLink>
                    </div>
                )}
            </>,
            `Withdrawal has been canceled`,
            {
                closeOnClick: true,
                isLoading: false,
                toastId: `toast__${reason.callId}`,
                type: NotifyType.WARNING,
                update: toast.isActive(`toast__${reason.callId}`),
            },
        )
    }, [onTransactionFailureCallback])

    return {
        onSend,
        onTransactionFailure,
        onTransactionSuccess,
    }
}
