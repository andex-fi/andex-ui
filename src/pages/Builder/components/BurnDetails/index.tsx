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
        <div className="border border-[#DFE8F9] p-4 rounded-lg mt-3 overflow-hidden bg-[#F4F5FA] dark:bg-purple-darkest">
            <h3 className="font-bold">
                Target address balance
            </h3>
            <div>
                {managingToken.targetWalletBalance && managingToken.amountToBurn
                    ? (
                        <>
                            <div className="flex items-center justify-between gap-4 text-xs mt-1">
                                <div>
                                    Current
                                </div>
                                <div>
                                    {currentTargetAddressBalance}
                                </div>
                            </div>
                            <div className="flex items-center justify-between gap-4 text-xs mt-1">
                                <div>
                                    After burning
                                </div>
                                <div>
                                    {afterTargetAddressBalance}
                                </div>
                            </div>
                        </>
                    )
                    : (
                        <div className="flex items-center justify-between gap-4 text-xs mt-1">
                            <div>{getBalanceMessage()}</div>
                        </div>
                    )}
            </div>
            <h3 className="font-bold mt-4">
                Circulating supply
            </h3>
            <div>
                {managingToken.amountToBurn
                    ? (
                        <>
                            <div className="flex items-center justify-between gap-4 text-xs mt-1">
                                <div>
                                    Current
                                </div>
                                <div>
                                    {currentSupply}
                                </div>
                            </div>
                            <div className="flex items-center justify-between gap-4 text-xs mt-1">
                                <div>
                                    After burning
                                </div>
                                <div>
                                    {afterSupply}
                                </div>
                            </div>
                        </>
                    )
                    : (
                        <div className="flex items-center justify-between gap-4 text-xs mt-1">
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
