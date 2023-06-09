import { Observer } from 'mobx-react-lite'

import {
    BuilderField,
    BuilderSubmitButton,
    BuilderTransaction,
} from '.'
import { useCreateTokenForm } from '../hooks/useCreateTokenForm'
import { useCreateTokenStore } from '../state/CreateTokenStore'


export function Create(): JSX.Element {
    const creatingToken = useCreateTokenStore()
    const creatingTokenForm = useCreateTokenForm()

    return (
        <>
            <div className="card">
                <div className="card__wrap">
                    <div className="card__header">
                        <h2 className="card-title">Create token</h2>
                    </div>

                    <div className="form form-builder">
                        <Observer>
                            {() => (
                                <BuilderField
                                    className=''
                                    key="nameField"
                                    disabled={creatingToken.isCreating}
                                    label="Name"
                                    placeholder="Name your token"
                                    isValid={creatingToken.name.length > 0 && creatingToken.name.length < 255}
                                    value={creatingToken.name}
                                    onChange={creatingTokenForm.onChangeData('name')}
                                />
                            )}
                        </Observer>

                        <Observer>
                            {() => (
                                <BuilderField
                                    className=''
                                    key="symbolField"
                                    disabled={creatingToken.isCreating}
                                    label="Symbol"
                                    placeholder="Add token symbol"
                                    isValid={creatingToken.symbol.length > 0 && creatingToken.symbol.length < 255}
                                    value={creatingToken.symbol}
                                    onChange={creatingTokenForm.onChangeData('symbol')}
                                />
                            )}
                        </Observer>

                        <Observer>
                            {() => (
                                <BuilderField
                                    className=''
                                    key="decimalsField"
                                    type="number"
                                    disabled={creatingToken.isCreating}
                                    label="Decimals"
                                    placeholder="Set token decimals"
                                    isValid={
                                        creatingToken.decimals.length > 0
                                            && (+creatingToken.decimals >= 0 && +creatingToken.decimals <= 18)
                                    }
                                    inputMode="decimal"
                                    pattern="^[0-9]+$"
                                    value={creatingToken.decimals}
                                    onChange={creatingTokenForm.onChangeData('decimals')}
                                />
                            )}
                        </Observer>

                        <BuilderSubmitButton key="submitButton" />
                    </div>
                </div>
            </div>

            <BuilderTransaction
                key="transaction"
                onDismiss={creatingTokenForm.onDismissTransactionReceipt}
            />
        </>
    )
}
