import * as React from 'react'
import { observer } from 'mobx-react-lite'

import { Button } from '../../../../components/Button'
import { Icon } from '../../../../components/Icon'
import { useCreateTokenStore } from '../../state/CreateTokenStore'
import { useWallet } from '../../../../hooks'


const SubmitButton: React.FC = () => {
    const wallet = useWallet()
    const creatingToken = useCreateTokenStore()

    const buttonProps: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> = {
        disabled: creatingToken.isCreating,
    }
    let buttonText = "Build"
    const showSpinner = creatingToken.isCreating

    switch (true) {
        case !wallet.account:
            buttonProps.disabled = wallet.isConnecting
            buttonProps.onClick = async () => {
                await wallet.connect()
            }
            buttonText = "Connect Wallet"
            break

        case !creatingToken.name || !creatingToken.symbol || !creatingToken.decimals:
            buttonProps.disabled = true
            buttonText = "Enter token data"
            break

        case creatingToken.name != null && creatingToken.symbol != null && creatingToken.decimals != null:
            buttonProps.onClick = async () => {
                await creatingToken.createToken()
            }
            break

        default:
    }

    return (
        <Button
            aria-disabled={buttonProps.disabled}
            block
            btnStyles="form-submit mt-2 bg-purple text-white dark:bg-purple-lightest text-lg font-bold p-4 rounded-[12px]"
            size="lg"
            type="primary"
            {...buttonProps}
        >
            {showSpinner ? (
                <div className="popup-main__loader">
                    <Icon icon="loader" />
                </div>
            ) : buttonText}
        </Button>
    )
}

export const BuilderSubmitButton = observer(SubmitButton)
