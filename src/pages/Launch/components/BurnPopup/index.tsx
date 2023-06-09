/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { Button } from '../../../../components/Button'
import { Icon } from '../../../../components/Icon'
import { BuilderField } from '../BuilderField'
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
        <div className="popup popup_scrollable">
            <div className="popup-overlay" />
            <div className="popup__wrap">
                <Button
                    btnStyles=''
                    type="icon"
                    className="popup-close"
                    onClick={onDismiss}
                >
                    <Icon icon="close" />
                </Button>
                <h2 className="popup-title">
                    Burn tokens
                </h2>
                <div className="form-builder">
                    <BurnAddressField />
                    <BuilderField
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
                    <BuilderField
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
                    <BuilderField
                        className=''
                        disabled={managingToken.isBurning}
                        label="Callback payload"
                        type="string"
                        value={managingToken.callbackPayload}
                        onChange={burnForm.onChangeData('callbackPayload')}
                    />
                </div>
                <BurnDetails />
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
                    <BurnSubmitButton closePopup={onDismiss} />
                </div>
            </div>
        </div>,
        document.body,
    )
}

export const BurnPopup = observer(Popup)
