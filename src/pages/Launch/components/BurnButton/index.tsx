import { observer } from 'mobx-react-lite'

import { Button } from '../../../../components/Button'
import { BurnPopup } from '../BurnPopup'
import { useBurnForm } from '../../hooks/useBurnForm'


function ButtonInternal(): JSX.Element {
    const burnForm = useBurnForm()

    return (
        <>
            <Button
                btnStyles=''
                type="primary"
                onClick={burnForm.showBurnPopup}
            >
                Burn
            </Button>
            {burnForm.isBurnPopupShown && <BurnPopup onDismiss={burnForm.hideBurnPopup} />}
        </>
    )
}

export const BurnButton = observer(ButtonInternal)
