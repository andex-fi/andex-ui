import classNames from 'classnames'

import { AccountExplorerLink } from '../../../../components/AccountExplorerLink'
import { TokenIcon } from '../../../../components/TokenIcon'
import { TransactionExplorerLink } from '../../../../components/TransactionExplorerLink'
import type { SwapTransactionReceipt } from '../../types'
import {
    formattedAmount,
    formattedTokenAmount,
    isMobile,
    stopEventPropagate,
} from '../../../../utils'


type Props = {
    message?: string;
    receipt: SwapTransactionReceipt;
}


export function CrossSwapFailureReceipt(props: Props): JSX.Element {

    const { /*message,*/ receipt } = props

    return (
        <>
            <div className="notification-body">
                <p>
                    {
                        `Due to the slippage being more than 
                        ${formattedAmount(receipt.slippage || '0')} 
                        of the ${receipt.spentSymbol || ''}/${receipt.receivedSymbol || ''} pair,
                        you still have ${receipt.spentSymbol || ''}`
                    }
                </p>

                <div className="notification_token-badge">
                    <TokenIcon
                        address={receipt.spentRoot}
                        icon={receipt.spentIcon}
                        size="small"
                    />
                    <div className="notification_token-badge__title">
                        {`+ ${formattedTokenAmount(
                            receipt.amount,
                            receipt.spentDecimals,
                            { preserve: true },
                        )} ${receipt.spentSymbol}`}
                    </div>
                </div>
            </div>

            {(receipt.spentRoot !== undefined || receipt.hash !== undefined) && (
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
                            Transaction Result
                        </TransactionExplorerLink>
                    )}
                    {receipt.spentRoot !== undefined && (
                        <AccountExplorerLink
                            address={receipt.spentRoot}
                            className={isMobile(navigator.userAgent) ? 'btn btn-link' : 'btn btn-secondary'}
                            onClick={stopEventPropagate}
                        >
                            Token contract
                        </AccountExplorerLink>
                    )}
                </div>
            )}
        </>
    )
}
