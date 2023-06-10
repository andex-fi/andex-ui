/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { reaction } from 'mobx'
import { observer } from 'mobx-react-lite'

import { Button } from '../../../../components/Button'
import { Icon } from '../../../../components/Icon'
import { TokenIcon } from '../../../../components/TokenIcon'
import { TokenIcons } from '../../../../components/TokenIcons'
import { SwapBill } from '../SwapBill'
import { useSwapFormStoreContext } from '../../context'
import { useNotifiedSwapCallbacks } from '../../hooks/useNotifiedSwapCallbacks'


function ConfirmationPopup(): JSX.Element {
    const formStore = useSwapFormStoreContext()
    const swapCallbacks = useNotifiedSwapCallbacks({})

    const [minExpectedAmount, setMinExpectedAmount] = React.useState(formStore.bill.minExpectedAmount)
    const [leftAmount, setLeftAmount] = React.useState(formStore.leftAmount)
    const [rightAmount, setRightAmount] = React.useState(formStore.rightAmount)
    const [isChanged, setChangedTo] = React.useState(false)

    const onUpdate = () => {
        setMinExpectedAmount(formStore.bill.minExpectedAmount)
        setLeftAmount(formStore.leftAmount)
        setRightAmount(formStore.rightAmount)
        setChangedTo(false)
    }

    const onDismiss = () => {
        formStore.setState('isConfirmationAwait', false)
    }

    const onSubmit = async () => {
        formStore.setState('isConfirmationAwait', false)
        await formStore.swap(swapCallbacks)
    }

    React.useEffect(() => reaction(() => [
        formStore.leftAmount,
        formStore.rightAmount,
        formStore.bill.minExpectedAmount,
    ], ([
        nextLeftAmount,
        nextRightAmount,
        nextMinExpectedAmount,
    ]) => {
        setChangedTo((
            nextLeftAmount !== leftAmount
            || nextRightAmount !== rightAmount
            || nextMinExpectedAmount !== minExpectedAmount
        ))
    }), [
        leftAmount,
        rightAmount,
        minExpectedAmount,
    ])

    return ReactDOM.createPortal(
        <div className="popup">
            <div onClick={onDismiss} className="popup-overlay" />
            <div className="popup__wrap popup__wrap-confirm-swap">
                <Button
                    type="icon"
                    onClick={onDismiss}
                    btnStyles="popup-close"
                >
                    <Icon icon="close" />
                </Button>
                <h2 className="popup-title">
                    Confirm Transaction
                </h2>

                <fieldset className="form-fieldset form-fieldset--small form-fieldset--dark">
                    <div className="form-fieldset__header">
                        <div>
                            From
                        </div>
                    </div>
                    <div className="form-fieldset__main">
                        <input
                            className="form-input"
                            readOnly
                            type="text"
                            value={leftAmount}
                        />
                        {formStore.isEnoughTokenBalance && (
                            <div key="token-swap" className="btn form-drop form-drop-extra">
                                <span className="form-drop__logo">
                                    <TokenIcon
                                        address={formStore.leftToken?.root}
                                        icon={formStore.leftToken?.icon}
                                        name={formStore.leftToken?.symbol}
                                        size="small"
                                    />
                                </span>
                                <span className="form-drop__name">
                                    {formStore.leftToken?.symbol}
                                </span>
                            </div>
                        )}
                        {(
                            formStore.isEnoughCoinBalance
                            && !formStore.isEnoughTokenBalance
                        ) && (
                            <div key="coin-swap" className="btn form-drop form-drop-extra">
                                <span className="form-drop__logo">
                                    <TokenIcon
                                        icon={formStore.wallet.coin.icon}
                                        name={formStore.wallet.coin.symbol}
                                        size="small"
                                    />
                                </span>
                                <span className="form-drop__name">
                                    {formStore.wallet.coin.symbol}
                                </span>
                            </div>
                        )}
                        {(
                            !formStore.isEnoughTokenBalance
                            && !formStore.isEnoughCoinBalance
                            && formStore.isEnoughCombinedBalance
                        ) && (
                            <div key="token-swap" className="btn form-drop form-drop-extra">
                                <span className="form-drop__logo">
                                    <TokenIcons
                                        icons={[
                                            {
                                                icon: formStore.wallet.coin.icon,
                                                name: formStore.wallet.coin.name,
                                            },
                                            {
                                                address: formStore.leftToken?.root,
                                                icon: formStore.leftToken?.icon,
                                                name: formStore.leftToken?.name,
                                            },
                                        ]}
                                    />
                                </span>
                                <span className="form-drop__name">
                                    {`${formStore.wallet.coin.symbol} + ${formStore.leftToken?.symbol}`}
                                </span>
                            </div>
                        )}
                    </div>
                </fieldset>

                <fieldset className="form-fieldset form-fieldset--small form-fieldset--dark">
                    <div className="form-fieldset__header">
                        <div>
                            To
                        </div>
                    </div>
                    <div className="form-fieldset__main">
                        <input
                            className="form-input"
                            readOnly
                            type="text"
                            value={rightAmount}
                        />
                        <div className="btn form-drop form-drop-extra">
                            <span className="form-drop__logo">
                                <TokenIcon
                                    address={formStore.rightToken?.root}
                                    name={formStore.rightToken?.symbol}
                                    size="small"
                                    icon={formStore.rightToken?.icon}
                                />
                            </span>
                            <span className="form-drop__name">
                                {formStore.rightToken?.symbol}
                            </span>
                        </div>
                    </div>
                </fieldset>

                {isChanged ? (
                    <div className="alert">
                        <div>
                            <strong>
                                Update a rate to swap the tokens
                            </strong>
                            <p>
                                The rate has changed. You can’t swap tokens at the previous rate.
                            </p>
                        </div>
                        <div>
                            <Button
                                btnStyles=''
                                size="md"
                                type="empty"
                                onClick={onUpdate}
                            >
                                Update rate
                            </Button>
                        </div>
                    </div>
                ) : (
                    <SwapBill key="bill" />
                )}

                <Button
                    btnStyles=''
                    block
                    size="lg"
                    type="primary"
                    disabled={isChanged}
                    onClick={onSubmit}
                >
                    Confirm
                </Button>
            </div>
        </div>,
        document.body,
    )
}


export const MultiSwapConfirmationPopup = observer(ConfirmationPopup)
