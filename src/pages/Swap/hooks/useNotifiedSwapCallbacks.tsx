import * as React from 'react'

import { notify, NotifyType } from '../../../components/Notification'
import {
    CrossSwapFailureReceipt,
    SwapFailureReceipt,
    SwapSuccessReceipt,
} from '../components/Notifications'
import type { SwapTransactionCallbacks } from '../types'


export function useNotifiedSwapCallbacks(props: SwapTransactionCallbacks): SwapTransactionCallbacks {

    const {
        onTransactionFailure: onTransactionFailureCallback,
        onTransactionSuccess: onTransactionSuccessCallback,
        onSend: onSendCallback,
    } = props

    const onSend = React.useCallback<Required<SwapTransactionCallbacks>['onSend']>(
        (message, params) => {
            onSendCallback?.(message, params)
            notify(
                undefined,
                "Wait until the swap is completed",
                {
                    autoClose: false,
                    isLoading: true,
                    toastId: params.callId,
                    type: NotifyType.INFO,
                },
            )
        },
        [onSendCallback],
    )

    const onTransactionFailure = React.useCallback<Required<SwapTransactionCallbacks>['onTransactionFailure']>(
        (reason, receipt) => {
            onTransactionFailureCallback?.(reason, receipt)
            notify(
                receipt.isCrossExchangeCanceled
                    ? <CrossSwapFailureReceipt receipt={receipt} message={reason.message} />
                    : <SwapFailureReceipt receipt={receipt} message={reason.message} />,
                receipt.isCrossExchangeCanceled
                    ? "The swap has been canceled"
                    : "The swap has been canceled"
                ,
                {
                    isLoading: false,
                    toastId: reason.callId,
                    type: NotifyType.WARNING,
                    update: true,
                },
            )
        },
        [onTransactionFailureCallback],
    )

    const onTransactionSuccess = React.useCallback<Required<SwapTransactionCallbacks>['onTransactionSuccess']>(
        (result, receipt) => {
            onTransactionSuccessCallback?.(result, receipt)
            notify(
                <SwapSuccessReceipt receipt={receipt} />,
                "The swap has been completed",
                {
                    isLoading: false,
                    toastId: result.callId,
                    type: NotifyType.SUCCESS,
                    update: true,
                },
            )
        },
        [onTransactionSuccessCallback],
    )

    return {
        onSend,
        onTransactionFailure,
        onTransactionSuccess,
    }
}
