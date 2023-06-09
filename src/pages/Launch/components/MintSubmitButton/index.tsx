/* eslint-disable @typescript-eslint/no-non-null-assertion */
import BigNumber from 'bignumber.js'
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
        disabled: managingToken.isMinting,
    }
    let buttonText = "Mint"
    const showSpinner = managingToken.isMinting

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

        case !managingToken.targetAddress || !managingToken.amountToMint:
            buttonProps.disabled = true
            buttonText = "Enter all data"
            break

        case new BigNumber(managingToken.amountToMint).isZero():
            buttonProps.disabled = true
            buttonText = "Enter valid amount"
            break

        case managingToken.targetAddress != null && managingToken.amountToMint != null:
            buttonProps.onClick = async () => {
                closePopup()
                await managingToken.mint()
            }
            break

        default:
    }

    return (
        <Button
            aria-disabled={buttonProps.disabled}
            block
            btnStyles="form-submit"
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

export const MintSubmitButton = observer(SubmitButton)
