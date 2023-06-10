import * as React from 'react'
import { observer } from 'mobx-react-lite'

import { Button } from '../../../../components/Button'
import { Icon } from '../../../../components/Icon'
import { useSwapFormStoreContext } from '../../context'
import { SwapDirection } from '../../types'


function SubmitButton(): JSX.Element {
    const formStore = useSwapFormStoreContext()

    if (
        formStore.isPreparing === undefined
        || formStore.isPreparing
        || formStore.isSyncingPool === undefined
        || formStore.isSyncingPool
        || formStore.isCalculating
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

    const buttonProps: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> = {}
    let buttonText: React.ReactNode = "Swap"
    const coinSymbol = (formStore.coinSide === 'leftToken' ? formStore.wallet.coin.symbol : formStore.leftToken?.symbol) || '';

    switch (true) {
        case formStore.wallet.account === undefined:
            buttonProps.disabled = formStore.wallet.isConnecting
            buttonProps.onClick = async () => {
                await formStore.wallet.connect()
            }
            buttonText = "Connect Wallet"
            break

        case formStore.leftToken === undefined || formStore.rightToken === undefined:
            buttonProps.disabled = true
            buttonText = "Select a token"
            break

        case (
            (formStore.leftAmount.length > 0 || formStore.rightAmount.length > 0)
            && (formStore.pool === undefined || !formStore.isEnoughLiquidity)
        ):
            buttonProps.disabled = true
            buttonText = "Not enough liquidity"
            break

        case formStore.leftAmount.length === 0 && formStore.direction === SwapDirection.LTR:
        case formStore.rightAmount.length === 0 && formStore.direction === SwapDirection.RTL:
            buttonProps.disabled = true
            buttonText = "Enter an amount"
            break

        case !formStore.isLeftAmountValid:
            buttonProps.disabled = true
            buttonText = `Insufficient ${coinSymbol} balance`
            break

        case formStore.isConfirmationAwait:
            buttonProps.disabled = true
            buttonText = "Await confirmation..."
            break

        case formStore.isValid:
            buttonProps.onClick = () => {
                formStore.setState('isConfirmationAwait', true)
            }
            break

        default:
            buttonProps.disabled = !formStore.isValid || formStore.isProcessing
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

export const LiquidityStableSwapSubmitButton = observer(SubmitButton)
