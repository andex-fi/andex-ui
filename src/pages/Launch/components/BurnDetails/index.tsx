/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as React from 'react'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import BigNumber from 'bignumber.js'

import { useManageTokenStore } from '../../state/ManageTokenStore'
import { isAddressValid } from '../../../../constants'


function Details(): JSX.Element {
    const { tokenRoot } = useParams<{ tokenRoot: string }>()

    const managingToken = useManageTokenStore(tokenRoot!)

    const currentTargetAddressBalance = React.useMemo(
        () => new BigNumber(managingToken.targetWalletBalance)
            .decimalPlaces(+managingToken.token!.decimals, BigNumber.ROUND_DOWN)
            .toFixed()
        , [managingToken.targetWalletBalance],
    )

    const afterTargetAddressBalance = React.useMemo(
        () => new BigNumber(managingToken.targetWalletBalance)
            .minus(managingToken.amountToBurn)
            .decimalPlaces(+managingToken.token!.decimals, BigNumber.ROUND_DOWN)
            .toFixed()
        , [managingToken.targetWalletBalance, managingToken.amountToBurn],
    )

    const currentSupply = React.useMemo(
        () => new BigNumber(managingToken.token?.totalSupply ?? 0)
            .shiftedBy(-(managingToken.token?.decimals || 0))
            .decimalPlaces(+managingToken.token!.decimals, BigNumber.ROUND_DOWN)
            .toFixed()
        , [managingToken.token!.totalSupply],
    )

    const afterSupply = React.useMemo(
        () => new BigNumber(managingToken.token?.totalSupply ?? 0)
            .shiftedBy(-(managingToken.token?.decimals || 0))
            .minus(managingToken.amountToBurn ?? 0)
            .decimalPlaces(+managingToken.token!.decimals, BigNumber.ROUND_DOWN)
            .toFixed()
        , [managingToken.token!.totalSupply, managingToken.amountToBurn],
    )

    const getBalanceMessage = (): string => {
        if (!isAddressValid(managingToken.targetAddress)) {
            return "Enter Valid target address"
        }

        if (!managingToken.amountToMint) {
            return "Enter amount to mint"
        }

        return "Enter target address"
    }

    return (
        <div className="burn-details">
            <h3 className="burn-details-title">
                Target address balance
            </h3>
            <div className="burn-details-table">
                {managingToken.targetWalletBalance && managingToken.amountToBurn
                    ? (
                        <>
                            <div className="burn-details-table__row">
                                <div>
                                    Current
                                </div>
                                <div>
                                    {currentTargetAddressBalance}
                                </div>
                            </div>
                            <div className="burn-details-table__row">
                                <div>
                                    After mining
                                </div>
                                <div>
                                    {afterTargetAddressBalance}
                                </div>
                            </div>
                        </>
                    )
                    : (
                        <div className="burn-details-table__row">
                            <div>{getBalanceMessage()}</div>
                        </div>
                    )}
            </div>
            <h3 className="burn-details-title">
                Circulating supply
            </h3>
            <div className="burn-details-table">
                {managingToken.amountToBurn
                    ? (
                        <>
                            <div className="burn-details-table__row">
                                <div>
                                    Current
                                </div>
                                <div>
                                    {currentSupply}
                                </div>
                            </div>
                            <div className="burn-details-table__row">
                                <div>
                                    After mining
                                </div>
                                <div>
                                    {afterSupply}
                                </div>
                            </div>
                        </>
                    )
                    : (
                        <div className="burn-details-table__row">
                            <div>
                                Enter amount to mint
                            </div>
                        </div>
                    )}
            </div>
        </div>
    )
}

export const BurnDetails = observer(Details)
