/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as React from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { Button } from '../../../../components/Button'
import { Icon } from '../../../../components/Icon'
import { isAddressValid } from '../../../../constants'
import { useManageTokenStore } from '../../state/ManageTokenStore'
import { useWallet } from '../../../../state/WalletService'

type Props = {
    closePopup: () => void;
}

function SubmitButton({ closePopup }: Props): JSX.Element {
    const { tokenRoot } = useParams<{ tokenRoot: string }>()

    const wallet = useWallet()
    const managingToken = useManageTokenStore(tokenRoot!)

    const buttonProps: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> = {
        disabled: managingToken.isBurning,
    }
    let buttonText = "Burn"
    const showSpinner = managingToken.isBurning

    switch (true) {
        case !wallet.account:
            buttonProps.disabled = wallet.isConnecting
            buttonProps.onClick = async () => {
                await wallet.connect()
            }
            buttonText = "Connect Wallet"
            break

        case !isAddressValid(managingToken.targetAddress):
            buttonProps.disabled = true
            buttonText = "Enter valid target address"
            break

        case !isAddressValid(managingToken.callbackAddress):
            buttonProps.disabled = true
            buttonText = "Invalid callback address"
            break

        case !managingToken.targetAddress || !managingToken.amountToBurn:
            buttonProps.disabled = true
            buttonText = "Enter all data"
            break

        case managingToken.targetAddress != null && managingToken.amountToBurn != null:
            buttonProps.onClick = async () => {
                closePopup()
                await managingToken.burn()
            }
            break

        default:
    }

    return (
        <Button
            aria-disabled={buttonProps.disabled}
            block
            size="lg"
            type="primary"
            btnStyles="bg-[#52058F] text-white rounded-2xl w-64 py-4 font-bold"
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

export const BurnSubmitButton = observer(SubmitButton)
