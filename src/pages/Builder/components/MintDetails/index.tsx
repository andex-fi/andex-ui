/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as React from 'react'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import BigNumber from 'bignumber.js'

import { useManageTokenStore } from '../../state/ManageTokenStore'
import { isAddressValid } from '../../../../constants'


const Details: React.FC = () => {
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
            .plus(managingToken.amountToMint)
            .decimalPlaces(+managingToken.token!.decimals, BigNumber.ROUND_DOWN)
            .toFixed()
        , [managingToken.targetWalletBalance, managingToken.amountToMint],
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
            .plus(managingToken.amountToMint ?? 0)
            .decimalPlaces(+managingToken.token!.decimals, BigNumber.ROUND_DOWN)
            .toFixed()
        , [managingToken.token!.totalSupply, managingToken.amountToMint],
    )

    const getBalanceMessage = (): string => {
        if (!isAddressValid(managingToken.targetAddress)) {
            return "Enter valid target address"
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
                {managingToken.targetWalletBalance && managingToken.amountToMint
                    ? (
                        <>
                            <div className="flex items-center justify-between gap-4 text-xs">
                                <div>
                                    Current
                                </div>
                                <div className=''>
                                    {currentTargetAddressBalance}
                                </div>
                            </div>
                            <div className="flex items-center justify-between gap-4 text-xs">
                                <div>
                                    After minting
                                </div>
                                <div>
                                    {afterTargetAddressBalance}
                                </div>
                            </div>
                        </>
                    )
                    : (
                        <div className="flex items-center justify-between gap-4 text-xs">
                            <div>{getBalanceMessage()}</div>
                        </div>
                    )}
            </div>
            <h3 className="font-bold mt-4">
                Circulating Supply
            </h3>
            <div>
                {managingToken.amountToMint
                    ? (
                        <>
                            <div className="flex items-center justify-between gap-4 text-xs">
                                <div>
                                    Current
                                </div>
                                <div>
                                    {currentSupply}
                                </div>
                            </div>
                            <div className="flex items-center justify-between gap-4 text-xs">
                                <div>
                                    After minting
                                </div>
                                <div>
                                    {afterSupply}
                                </div>
                            </div>
                        </>
                    )
                    : (
                        <div className="flex items-center justify-between gap-4 text-xs">
                            <div>
                                Enter amount to mint
                            </div>
                        </div>
                    )}
            </div>
        </div>
    )
}

export const MintDetails = observer(Details)
