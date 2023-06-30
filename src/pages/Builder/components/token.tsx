/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import { useParams } from 'react-router-dom'
import { Observer } from 'mobx-react-lite'
import BigNumber from 'bignumber.js'

import {
    BuilderConfirmationPopup,
    BuilderField,
} from '.'
import { getTokenFromLocalStorage, saveTokenToLocalStorage } from '../utils'
import { useManageTokenStore } from '../state'
import { Icon } from '../../../components/Icon'
import { Actions } from './actions'


export const Token: React.FC = () => {
    const { tokenRoot } = useParams<{ tokenRoot: string }>()

    const managingToken = useManageTokenStore(tokenRoot!)

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(managingToken.token?.root || '')
        }
        catch (e) { /* empty */ }
    }

    React.useEffect(() => {
        managingToken.init()

        return () => {
            managingToken.dispose()
        }
    })

    React.useEffect(() => {
        if (tokenRoot) {
            const tokens = getTokenFromLocalStorage()

            if (!tokens.some(token => token === tokenRoot)) {
                saveTokenToLocalStorage(tokenRoot)
            }
        }
    }, [tokenRoot])

    return (
        <>
            <div className="bg-white dark:bg-purple-light rounded-xl lg:flex items-start gap-4 w-full lg:w-[60%] p-6">
                    <Observer>
                        {() => (managingToken.isLoading ? (
                            <div className="message">
                                <div className="popup-main__loader">
                                    <Icon icon="loader" />
                                </div>
                            </div>
                        ) : (
                            <>
                            <div className="w-full lg:w-[50%]">
                                <h2 className="text-[#13173E] dark:text-white font-bold">
                                    Description
                                </h2>
                                <div className="">
                                    <BuilderField
                                        className=''
                                        label="Network"
                                        readOnly
                                        value="Devnet"    
                                    />
                                    <BuilderField
                                        showCopy
                                        className=""
                                        label="Root"
                                        disabled
                                        value={managingToken.token?.root}
                                        onClick={copyToClipboard}    
                                    />    
                                    <BuilderField
                                        className=''
                                        label=""
                                        readOnly
                                        value={managingToken.token?.name}    
                                    />
                                    <BuilderField
                                        className=''
                                        label="Token symbol"
                                        readOnly
                                        value={managingToken.token?.symbol}    
                                    />
                                    <BuilderField
                                        className=''
                                        label="Decimal places"
                                        readOnly
                                        value={`${managingToken.token?.decimals}`}    
                                    />
                                    <BuilderField
                                        className=''
                                        label="Total supply"
                                        readOnly
                                        value={new BigNumber(managingToken.token?.totalSupply ?? 0)
                                            .shiftedBy(-(managingToken.token?.decimals || 0))
                                            .toFixed()}    
                                    />
                                </div>
                            </div>
                            <Actions />
                            </>
                        ))}
                    </Observer>
                
            </div>

            <BuilderConfirmationPopup key="confirmation" />
        </>
    )
}
