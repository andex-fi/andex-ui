import { observer } from 'mobx-react-lite'

import { Button } from '../../../../components/Button'
import { MintPopup } from '../MintPopup'
import { useMintForm } from '../../hooks/useMintForm'


function ButtonInternal(): JSX.Element {
    const mintForm = useMintForm()

    return (
        <>
            <Button
                btnStyles='flex items-center justify-center text-white rounded-3xl w-20 py-1 bg-[#9645D7]'
                type="primary"
                onClick={mintForm.showMintPopup}
            >
                Mint
            </Button>
            {mintForm.isMintPopupShown && <MintPopup onDismiss={mintForm.hideMintPopup} />}
        </>
    )
}

export const MintButton = observer(ButtonInternal)
