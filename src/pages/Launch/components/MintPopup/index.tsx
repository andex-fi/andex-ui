/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { Button } from '../../../../components/Button'
import { Icon } from '../../../../components/Icon'
import { usePage } from '../../../../hooks/usePage'
import { BuilderField } from '../BuilderField'
import { MintSubmitButton } from '../MintSubmitButton'
import { useMintForm } from '../../hooks/useMintForm'
import { useManageTokenStore } from '../../state/ManageTokenStore'
import { MintAddressField } from '../MintAddressField'
import { MintDetails } from '../MintDetails'

type Props = {
    onDismiss: () => void;
}


function Popup({ onDismiss }: Props): JSX.Element {
    const { rootToken } = useParams<{ rootToken: string }>()
    const managingToken = useManageTokenStore(rootToken!)
    const mintForm = useMintForm()
    const page = usePage()

    React.useEffect(() => {
        page.block()
        mintForm.onChangeData('amountToMint')('')

        return () => {
            page.unblock()
        }
    }, [])

    return ReactDOM.createPortal(
        <div className="popup popup_scrollable">
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
                    Mint tokens
                </h2>
                <div className="form-builder">
                    <MintAddressField />
                    <BuilderField
                        className=''
                        disabled={managingToken.isMinting}
                        label="Amount to mint"
                        type="number"
                        isValid={
                            managingToken.amountToMint.length > 0
                        }
                        value={managingToken.amountToMint}
                        onChange={mintForm.onChangeData('amountToMint')}
                    />
                </div>
                <MintDetails />
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
                    <MintSubmitButton closePopup={onDismiss} />
                </div>
            </div>
        </div>,
        document.body,
    )
}

export const MintPopup = observer(Popup)
