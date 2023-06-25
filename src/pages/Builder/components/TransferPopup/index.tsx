/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as ReactDOM from 'react-dom'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { Button } from '../../../../components/Button'
import { TransferField } from '../TransferField'
import { isAddressValid } from '../../../../constants'
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
        <div 
            className="fixed h-full w-full inset-0 flex justify-center items-center p-4"
            style={{ background: "rgba(0, 0, 0, 0.2)", backdropFilter: "blur(9px)" }}
            onClick={onDismiss}
        >
            <div 
                className="w-full lg:w-[35%] h-[50vh] p-4 md:p-6 bg-white dark:bg-purple-light rounded-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <h4 className="text-[#13173E] dark:text-white font-bold">
                    Transfer token ownership
                </h4>
                <div className="mt-3 border-[1px] border-[#FA2B39] rounded-lg p-4 text-[#FA2B39]">
                    <div className='flex items-center gap-2 font-bold'>
                        <h4>⚠️ Warning</h4>
                    </div>
                    <h5 className="text-sm font-bold my-1">This action is irreversible!</h5>
                    <p className="text-sm">Please double check the target address before confirming the transfer.</p>
                </div>
                    <TransferField
                        className=''
                        disabled={managingToken.isTransfer}
                        label="New owner address"
                        placeholder='New owner address'
                        type="string"
                        isValid={
                            isAddressValid(managingToken.newOwnerAddress, true)
                        }
                        value={managingToken.newOwnerAddress}
                        onChange={transferForm.onChangeData('newOwnerAddress')}
                    />
                <div className="flex items-center justify-between gap-4 mt-4">
                    <Button
                        block
                        btnStyles="text-[#52058F] bg-[#F4F5FA] rounded-2xl w-56 py-4 font-bold border-2 border-[#DFE8F9]"
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
