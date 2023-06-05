import * as React from 'react'
import { observer } from 'mobx-react-lite'

import { Button } from '../../../components/Button'
import { Icon } from '../../../components/Icon'
import { useRemoveLiquidityFormStoreContext } from '../../../contexts'
import { useNotifiedWithdrawLiquidityCallbacks } from '../hooks'

function SubmitButton(): JSX.Element {
    const formStore = useRemoveLiquidityFormStoreContext()
    const withdrawLiquidityCallbacks = useNotifiedWithdrawLiquidityCallbacks({})

    if (
        formStore.isPreparing === undefined
        || formStore.isPreparing
        || formStore.isSyncingPool === undefined
        || formStore.isSyncingPool
        || formStore.isWithdrawingLiquidity
    ) {
        return (
            <Button
                btnStyles=''
                aria-disabled="true"
                block
                disabled
                size="lg"
                type="primary"
            >
                <Icon icon="loader" className="spin" />
            </Button>
        )
    }

    const buttonProps: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> = {
        disabled: true,
    }
    let buttonText = 'Confirm'

    switch (true) {
        case formStore.isAwaitingConfirmation:
            buttonProps.disabled = true
            buttonText = 'Await Confirmation...'
            break

        case formStore.amount === '':
            buttonProps.disabled = true
            buttonText = 'Enter an amount'
            break

        case formStore.isWithdrawLiquidityAvailable:
            buttonProps.disabled = formStore.isWithdrawingLiquidity || !formStore.isAmountValid
            buttonProps.onClick = async () => {
                await formStore.withdrawLiquidity(withdrawLiquidityCallbacks)
            }
            buttonText = 'Confirm'
            break

        default:
    }

    if (!formStore.wallet.address) {
        buttonProps.disabled = formStore.wallet.isConnecting
        buttonProps.onClick = async () => {
            await formStore.wallet.connect()
        }
        buttonText = 'Connect Wallet'
    }

    return (
        <Button
            btnStyles=''
            aria-disabled={buttonProps.disabled}
            block
            size="lg"
            type="primary"
            {...buttonProps}
        >
            {buttonText}
        </Button>
    )
}

export const RemoveLiquiditySubmitButton = observer(SubmitButton)
