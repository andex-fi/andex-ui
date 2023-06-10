import * as React from 'react'
import { observer } from 'mobx-react-lite'

import { Button } from '../../../../components/Button'
import { Icon } from '../../../../components/Icon'
import { useSwapFormStoreContext } from '../../context'
import { useNotifiedConversionCallbacks } from '../../hooks/useNotifiedConversionCallbacks'


function SubmitButton(): JSX.Element {
    const formStore = useSwapFormStoreContext()
    const conversionCallbacks = useNotifiedConversionCallbacks({})

    if (
        formStore.isPreparing === undefined
        || formStore.isPreparing
        || formStore.isProcessing
    ) {
        return (
            <Button
                block
                size="lg"
                type="primary"
                btnStyles="form-submit"
                aria-disabled="true"
                disabled
            >
                <Icon icon="loader" className="spin" />
            </Button>
        )
    }

    const buttonProps: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> = { disabled: true }
    let buttonText: React.ReactNode = "Swap"

    if (formStore.isWrapMode) {
        buttonText = `Wrap ${formStore.wallet.coin.symbol}`
    }
    else if (formStore.isUnwrapMode) {
        buttonText = `Unwrap ${formStore.leftToken?.symbol}`
    }

    switch (true) {
        case formStore.wallet.account === undefined:
            buttonProps.disabled = formStore.wallet.isConnecting
            buttonProps.onClick = async () => {
                await formStore.wallet.connect()
            }
            buttonText = "Connect Wallet"
            break

        case formStore.isWrapMode && formStore.isWrapValid:
            buttonProps.disabled = false
            buttonProps.onClick = async () => {
                await formStore.wrap(conversionCallbacks)
            }
            break

        case formStore.isUnwrapMode && formStore.isUnwrapValid:
            buttonProps.disabled = false
            buttonProps.onClick = async () => {
                await formStore.unwrap(conversionCallbacks)
            }
            break

        default:
    }

    return (
        <Button
            block
            size="lg"
            type="primary"
            btnStyles="form-submit"
            aria-disabled={buttonProps.disabled}
            {...buttonProps}
        >
            {buttonText}
        </Button>
    )
}

export const ConversionSubmitButton = observer(SubmitButton)
