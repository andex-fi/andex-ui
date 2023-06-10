import classNames from 'classnames'

import { AccountExplorerLink } from '../../../../components/AccountExplorerLink'
import { TransactionExplorerLink } from '../../../../components/TransactionExplorerLink'
import type { SwapTransactionReceipt } from '../../types'
import { isMobile, stopEventPropagate } from '../../../../utils'


type Props = {
    message?: string;
    receipt: SwapTransactionReceipt;
}


export function SwapFailureReceipt(props: Props): JSX.Element {

    const { message = "Your balance hasn’t changed.", receipt } = props

    return (
        <>
            {message && (
                <div className="notification-body">{message}</div>
            )}

            {(receipt.receivedRoot !== undefined || receipt.hash !== undefined) && (
                <div
                    className={classNames('notification-actions', {
                        'notification-actions--large': isMobile(navigator.userAgent),
                    })}
                >
                    {receipt.hash !== undefined && (
                        <TransactionExplorerLink
                            className={isMobile(navigator.userAgent) ? 'btn btn-link' : 'btn btn-secondary'}
                            id={receipt.hash}
                            onClick={stopEventPropagate}
                        >
                            Transaction result
                        </TransactionExplorerLink>
                    )}
                    {receipt.receivedRoot !== undefined && (
                        <AccountExplorerLink
                            address={receipt.receivedRoot}
                            className={isMobile(navigator.userAgent) ? 'btn btn-link' : 'btn btn-secondary'}
                            onClick={stopEventPropagate}
                        >
                            Token Contract
                        </AccountExplorerLink>
                    )}
                </div>
            )}
        </>
    )
}
