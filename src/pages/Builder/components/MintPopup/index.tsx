/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { Button } from '../../../../components/Button'
// import { Icon } from '../../../../components/Icon'
import { usePage } from '../../../../hooks/usePage'
import { CustomField } from '../CustomField'
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
        <div 
            className="fixed h-full w-full inset-0 flex justify-center items-center"
            style={{ background: "rgba(0, 0, 0, 0.2)", backdropFilter: "blur(9px)" }}
            onClick={onDismiss}
        >
            <div 
                className="w-full lg:w-[30%] h-fit p-4 md:p-6 bg-white dark:bg-purple-light rounded-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <h4 className="text-[#13173E] dark:text-white font-bold">
                    Mint tokens
                </h4>
                <MintAddressField />
                <CustomField
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
                <MintDetails />
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
                    <MintSubmitButton closePopup={onDismiss} />
                </div>
            </div>
        </div>,
        document.body,
    )
}

export const MintPopup = observer(Popup)
