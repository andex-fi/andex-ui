import { observer } from 'mobx-react-lite'

import { Button } from '../../../../components/Button'
import { useTransferForm } from '../../hooks/useTransferForm'
import { TransferPopup } from '../TransferPopup'

function ButtonInternal(): JSX.Element {
    const transferForm = useTransferForm()

    return (
        <>
            <Button 
                btnStyles="flex items-center justify-center text-white rounded-3xl w-24 py-1 bg-[#FA2B39]" 
                type="danger" onClick={transferForm.showTransferPopup}
            >
                Transfer
            </Button>
            {transferForm.isTransferPopupShown && <TransferPopup onDismiss={transferForm.hideTransferPopup} />}
        </>
    )
}

export const TransferButton = observer(ButtonInternal)
