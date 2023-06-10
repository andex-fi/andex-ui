import * as React from 'react'
import classNames from 'classnames'

import { AccountExplorerLink } from '../../../../components/AccountExplorerLink'
import { TokenIcon } from '../../../../components/TokenIcon'
import { TransactionExplorerLink } from '../../../../components/TransactionExplorerLink'
import type { ConversionTransactionSuccessResult } from '../../types'
import { formattedTokenAmount, isMobile } from '../../../../utils'


type Props = {
    result: ConversionTransactionSuccessResult;
}


export function ConversionSuccessReceipt(props: Props): JSX.Element {

    const { result } = props

    const onClickButton = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.stopPropagation()
    }

    return (
        <>
            <div className="notification-body">
                <div className="notification_token-badge">
                    <TokenIcon
                        key="wrap-icon"
                        address={result.input.receivedRoot}
                        icon={result.input.receivedIcon}
                        size="small"
                    />
                    <div className="notification_token-badge__title">
                        {`+ ${formattedTokenAmount(
                            result.input.amount,
                            result.input.receivedDecimals,
                            { preserve: true },
                        )} ${result.input.receivedSymbol}`}
                    </div>
                </div>
            </div>

            {(result.input.receivedRoot !== undefined || result.transaction.id.hash !== undefined) && (
                <div
                    className={classNames('notification-actions', {
                        'notification-actions--large': isMobile(navigator.userAgent),
                    })}
                >
                    {result.transaction.id.hash !== undefined && (
                        <TransactionExplorerLink
                            className={isMobile(navigator.userAgent) ? 'btn btn-link' : 'btn btn-secondary'}
                            id={result.transaction.id.hash}
                            onClick={onClickButton}
                        >
                            Transaction result
                        </TransactionExplorerLink>
                    )}
                    {result.input.receivedRoot !== undefined && (
                        <AccountExplorerLink
                            address={result.input.receivedRoot}
                            className={isMobile(navigator.userAgent) ? 'btn btn-link' : 'btn btn-secondary'}
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
