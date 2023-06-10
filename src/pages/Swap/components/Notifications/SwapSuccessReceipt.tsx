import * as React from 'react'
import classNames from 'classnames'

import { AccountExplorerLink } from '../../../../components/AccountExplorerLink'
import { TokenIcon } from '../../../../components/TokenIcon'
import { TransactionExplorerLink } from '../../../../components/TransactionExplorerLink'
import type { SwapTransactionReceipt } from '../../types'
import { formattedTokenAmount, isMobile } from '../../../../utils'


type Props = {
    receipt: SwapTransactionReceipt;
}


export function SwapSuccessReceipt(props: Props): JSX.Element {

    const { receipt } = props

    const onClickButton = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.stopPropagation()
    }

    return (
        <>
            <div className="notification-body">
                <div className="notification_token-badge">
                    <TokenIcon
                        address={receipt.receivedRoot}
                        icon={receipt.receivedIcon}
                        size="small"
                    />
                    <div className="notification_token-badge__title">
                        {`+ ${formattedTokenAmount(
                            receipt.amount,
                            receipt.receivedDecimals,
                        )} ${receipt.receivedSymbol}`}
                    </div>
                </div>
            </div>

            {(receipt.receivedRoot !== undefined || receipt.hash !== undefined) && (
                <div
                    className={classNames('notification-actions', {
                        'notification-actions--large': isMobile(navigator.userAgent),
                    })}
                >
                    {receipt.hash !== undefined && (
                        <TransactionExplorerLink
                            className={!isMobile(navigator.userAgent) ? 'btn btn-secondary' : 'btn btn-link'}
                            id={receipt.hash}
                            onClick={onClickButton}
                        >
                            Transaction result
                        </TransactionExplorerLink>
                    )}
                    {receipt.receivedRoot !== undefined && (
                        <AccountExplorerLink
                            address={receipt.receivedRoot}
                            className={!isMobile(navigator.userAgent) ? 'btn btn-secondary' : 'btn btn-link'}
                            onClick={onClickButton}
                        >
                            Token contract
                        </AccountExplorerLink>
                    )}
                </div>
            )}
        </>
    )
}
