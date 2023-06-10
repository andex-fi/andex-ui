import { observer } from 'mobx-react-lite'

import { Button } from '../../../../components/Button'
import { useTransferForm } from '../../hooks/useTransferForm'
import { TransferPopup } from '../TransferPopup'

function ButtonInternal(): JSX.Element {
    const transferForm = useTransferForm()

    return (
        <>
            <Button btnStyles="" type="danger" onClick={transferForm.showTransferPopup}>
                Transfer
            </Button>
            {transferForm.isTransferPopupShown && <TransferPopup onDismiss={transferForm.hideTransferPopup} />}
        </>
    )
}

export const TransferButton = observer(ButtonInternal)
