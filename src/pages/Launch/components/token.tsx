/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import { useParams } from 'react-router-dom'
import { Observer } from 'mobx-react-lite'
import BigNumber from 'bignumber.js'

import {
    BuilderConfirmationPopup,
    BuilderField,
    BurnButton,
    MintButton,
    TransferButton,
} from '.'
import { getTokenFromLocalStorage, saveTokenToLocalStorage } from '../utils'
import { useManageTokenStore } from '../state'
import { Icon } from '../../../components/Icon'


export function Token(): JSX.Element {
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
            <div className="card card--flat">
                <div className="card__wrap">
                    <Observer>
                        {() => (managingToken.isLoading ? (
                            <div className="message">
                                <div className="popup-main__loader">
                                    <Icon icon="loader" />
                                </div>
                            </div>
                        ) : (
                            <div className="card-parts">
                                <div className="card-parts__part">
                                    <div className="card__header">
                                        <h2 className="card-title">
                                            Description
                                        </h2>
                                    </div>
                                    <div className="form form-builder">
                                        <BuilderField
                                            className=''
                                            label="Network"
                                            readOnly
                                            value="Devnet"
                                        />
                                        <BuilderField
                                            showCopy
                                            className="builder-address-field"
                                            label="Root"
                                            disabled
                                            value={managingToken.token?.root}
                                            onClick={copyToClipboard}
                                        />
                                        <BuilderField
                                            className=''
                                            label="Token name"
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
                                <div className="card-parts__part">
                                    <div className="card__header">
                                        <h2 className="card-title">
                                            Actions
                                        </h2>
                                    </div>
                                    <div className="card-block">
                                        <h3 className="card-block__title">
                                            Manage circulating supply
                                        </h3>
                                        <div className="card-block__action">
                                            <div>
                                                <div className="card-block__action__name">
                                                    Mint
                                                </div>
                                                <div className="card-block__action__description">
                                                    Issue additional tokens to a specific address
                                                </div>
                                            </div>
                                            <MintButton key="mint-button" />
                                        </div>
                                        <div className="card-block__action">
                                            <div>
                                                <div className="card-block__action__name">
                                                    Burn
                                                </div>
                                                <div className="card-block__action__description">
                                                    Burn tokens at a specific address
                                                </div>
                                            </div>
                                            <BurnButton key="burn-button" />
                                        </div>
                                    </div>
                                    <div className="card-block card-block--alert">
                                        <h3 className="card-block__title">
                                            Danger zone
                                        </h3>
                                        <div className="card-block__action">
                                            <div>
                                                <div className="card-block__action__name">
                                                    Transfer ownership
                                                </div>
                                                <div className="card-block__action__description">
                                                    Set a new token owner
                                                </div>
                                            </div>
                                            <TransferButton key="transfer-button" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Observer>
                </div>
            </div>

            <BuilderConfirmationPopup key="confirmation" />
        </>
    )
}
