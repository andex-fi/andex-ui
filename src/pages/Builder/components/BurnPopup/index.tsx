/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { Button } from '../../../../components/Button'
import { CustomField } from '../CustomField'
import { CustomBurnField } from '../CustomBurnField'
import { BurnSubmitButton } from '../BurnSubmitButton'
import { useBurnForm } from '../../hooks/useBurnForm'
import { useManageTokenStore } from '../../state/ManageTokenStore'
import { BurnAddressField } from '../BurnAddressField'
import { BurnDetails } from '../BurnDetails'
import { isAddressValid } from '../../../../constants'
import { usePage } from '../../../../hooks/usePage'

type Props = {
    onDismiss: () => void;
}


function Popup({ onDismiss }: Props): JSX.Element {
    const { rootToken } = useParams<{ rootToken: string }>()

    const managingToken = useManageTokenStore(rootToken!)
    const burnForm = useBurnForm()
    const page = usePage()

    React.useEffect(() => {
        page.block()
        burnForm.onChangeData('amountToBurn')('')
        burnForm.onChangeData('callbackPayload')('')

        return () => {
            page.unblock()
        }
    }, [])

    return ReactDOM.createPortal(
        <div 
            className="fixed h-full w-full inset-0 flex justify-center items-center p-4"
            style={{ background: "rgba(0, 0, 0, 0.2)", backdropFilter: "blur(9px)" }}
            onClick={onDismiss}
        >
            <div 
                className="w-full lg:w-[30%] h-[80vh] p-4 md:p-6 bg-white dark:bg-purple-light rounded-lg overflow-y-scroll"
                onClick={(e) => e.stopPropagation()}
            >
                <h4 className="text-[#13173E] dark:text-white font-bold">
                    Burn tokens
                </h4>
                    <BurnAddressField />
                    <CustomField
                        className=''
                        disabled={managingToken.isBurning}
                        label="Amount to burn"
                        type="number"
                        isValid={
                            managingToken.amountToBurn.length > 0
                        }
                        value={managingToken.amountToBurn}
                        onChange={burnForm.onChangeData('amountToBurn')}
                    />
                    <CustomBurnField
                        className=''
                        disabled={managingToken.isBurning}
                        label="Callback address"
                        type="string"
                        isValid={
                            isAddressValid(managingToken.callbackAddress)
                        }
                        value={managingToken.callbackAddress}
                        onChange={burnForm.onChangeData('callbackAddress')}
                    />
                    <CustomBurnField
                        className=''
                        disabled={managingToken.isBurning}
                        label="Callback payload"
                        type="string"
                        value={managingToken.callbackPayload}
                        onChange={burnForm.onChangeData('callbackPayload')}
                    />
                <BurnDetails />
                <div className="flex items-center justify-between gap-4 mt-4">
                    <Button
                        block
                        btnStyles="text-[#52058F] bg-[#F4F5FA] rounded-2xl w-48 py-4 font-bold border-2 border-[#DFE8F9]"
                        size="lg"
                        type="tertiary"
                        onClick={onDismiss}
                    >
                        Cancel
                    </Button>
                    <BurnSubmitButton closePopup={onDismiss} />
                </div>
            </div>
        </div>,
        document.body,
    )
}

export const BurnPopup = observer(Popup)
