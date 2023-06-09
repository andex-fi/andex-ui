/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as ReactDOM from 'react-dom'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { Button } from '../../../../components/Button'
import { Icon } from '../../../../components/Icon'
import { isAddressValid } from '../../../../constants'
import { BuilderField } from '../BuilderField'
import { TransferSubmitButton } from '../TransferSubmitButton'
import { useManageTokenStore } from '../../state/ManageTokenStore'
import { useTransferForm } from '../../hooks/useTransferForm'

type Props = {
    onDismiss: () => void;
}


function Popup({ onDismiss }: Props): JSX.Element {
    const { rootToken } = useParams<{ rootToken: string }>()

    const managingToken = useManageTokenStore(rootToken!)
    const transferForm = useTransferForm()

    return ReactDOM.createPortal(
        <div className="manage-token transfer-popup popup">
            <div className="popup-overlay" />
            <div className="popup__wrap">
                <Button
                    btnStyles="popup-close"
                    type="icon"
                    onClick={onDismiss}
                >
                    <Icon icon="close" />
                </Button>
                <h2 className="popup-title">
                    Transfer token ownership
                </h2>
                <div className="card-block card-block--alert warning-block">
                    <p className="text text--bold">⚠️ Warning</p>
                    <p className="text">This action is irreversible!</p>
                    <p className="text">Please double check the target address before confirming the transfer.</p>
                </div>
                <div className="form-builder">
                    <BuilderField
                        className=''
                        disabled={managingToken.isTransfer}
                        label="New owner address"
                        type="string"
                        isValid={
                            isAddressValid(managingToken.newOwnerAddress, true)
                        }
                        value={managingToken.newOwnerAddress}
                        onChange={transferForm.onChangeData('newOwnerAddress')}
                    />
                </div>
                <div className="popup-actions">
                    <Button
                        block
                        btnStyles="form-submit"
                        size="lg"
                        type="tertiary"
                        onClick={onDismiss}
                    >
                        Cancel
                    </Button>
                    <TransferSubmitButton closePopup={onDismiss} />
                </div>
            </div>
        </div>,
        document.body,
    )
}

export const TransferPopup = observer(Popup)
