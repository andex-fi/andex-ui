/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as React from 'react'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'

import { Button } from '../../../../components/Button'
import { Icon } from '../../../../components/Icon'
import { isAddressValid } from '../../../../constants'
import { useManageTokenStore } from '../../state/ManageTokenStore'
import { useWallet } from '../../../../hooks'

type Props = {
    closePopup: () => void;
}

const SubmitButton: React.FC<Props> = ({ closePopup }) => {
    const { tokenRoot } = useParams<{ tokenRoot: string }>()

    const wallet = useWallet()
    const managingToken = useManageTokenStore(tokenRoot!)

    const buttonProps: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> = {
        disabled: managingToken.isTransfer,
    }
    let buttonText = "Confirm"
    const showSpinner = managingToken.isTransfer

    switch (true) {
        case !wallet.account:
            buttonProps.disabled = wallet.isConnecting
            buttonProps.onClick = async () => {
                await wallet.connect()
            }
            buttonText = "Connect wallet"
            break

        case !managingToken.newOwnerAddress:
            buttonProps.disabled = true
            buttonText = "Enter all data"
            break

        case !isAddressValid(managingToken.newOwnerAddress, true):
            buttonProps.disabled = true
            buttonText = "Enter valid target address"
            break

        case managingToken.newOwnerAddress != null:
            buttonProps.onClick = async () => {
                closePopup()
                await managingToken.transfer()
            }
            break

        default:
    }

    return (
        <Button
            aria-disabled={buttonProps.disabled}
            block
            btnStyles="bg-[#52058F] text-white rounded-2xl w-64 py-4 font-bold dark:bg-purple-darkest"
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

export const TransferSubmitButton = observer(SubmitButton)
