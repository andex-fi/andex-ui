import * as React from 'react'
import classNames from 'classnames'
import { toast } from 'react-toastify'

import { TransactionExplorerLink } from '../../../components/TransactionExplorerLink'
import { notify, NotifyType } from '../../../components/Notification'
import { ConversionSuccessReceipt } from '../components/Notifications'
import type { ConversionTransactionCallbacks } from '../types'
import { isMobile, stopEventPropagate } from '../../../utils'


export function useNotifiedConversionCallbacks(props: ConversionTransactionCallbacks): ConversionTransactionCallbacks {

    const {
        onSend: onSendCallback,
        onTransactionFailure: onTransactionFailureCallback,
        onTransactionSuccess: onTransactionSuccessCallback,
    } = props

    const onSend = React.useCallback<Required<ConversionTransactionCallbacks>['onSend']>(
        (message, params) => {
            onSendCallback?.(message, params)
            let title = "Message sent"
            if (params.mode === 'wrap') {
                title = "Wait until wrap is completed"
            }
            else if (params.mode === 'unwrap') {
                title = "Wait until unwrap is completed"
            }
            notify(
                undefined,
                title,
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
    const onTransactionFailure = React.useCallback<Required<ConversionTransactionCallbacks>['onTransactionFailure']>(reason => {
        onTransactionFailureCallback?.(reason)
        notify(
            <>
                <div className="notification-body">
                    {reason.message}
                </div>
                {reason?.transaction?.id.hash !== undefined && (
                    <div
                        className={classNames('notification-actions', {
                            'notification-actions--large': isMobile(navigator.userAgent),
                        })}
                    >
                        <TransactionExplorerLink
                            className={isMobile(navigator.userAgent) ? 'btn btn-link' : 'btn btn-secondary'}
                            id={reason?.transaction?.id.hash}
                            onClick={stopEventPropagate}
                        >
                            Transaction Details
                        </TransactionExplorerLink>
                    </div>
                )}
            </>,
            "Deposit has been cancelled",
            {
                closeOnClick: true,
                isLoading: false,
                toastId: `toast__${reason.callId}`,
                type: NotifyType.WARNING,
                update: toast.isActive(`toast__${reason.callId}`),
            },
        )
    }, [onTransactionFailureCallback])

    const onTransactionSuccess = React.useCallback<Required<ConversionTransactionCallbacks>['onTransactionSuccess']>(
        result => {
            onTransactionSuccessCallback?.(result)
            let title: string | undefined
            if (result.direction === 'wrap') {
                title = "Transaction details"
            }
            else if (result.direction === 'unwrap') {
                title = "The unwrap has been completed"
            }
            notify(
                <ConversionSuccessReceipt result={result} />,
                title,
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
