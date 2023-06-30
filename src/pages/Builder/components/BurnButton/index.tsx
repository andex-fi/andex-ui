import { observer } from 'mobx-react-lite'
import { Button } from '../../../../components/Button'
import { BurnPopup } from '../BurnPopup'
import { useBurnForm } from '../../hooks/useBurnForm'


const ButtonInternal: React.FC = () => {
    const burnForm = useBurnForm()

    return (
        <>
            <Button
                btnStyles='flex items-center justify-center text-white rounded-3xl w-20 py-1 bg-[#9645D7]'
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
