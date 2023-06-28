/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'

import { useBurnForm } from '../../hooks/useBurnForm'
import { CustomAddressField } from '../CustomAddressField'
import { useManageTokenStore } from '../../state/ManageTokenStore'
import { isAddressValid } from '../../../../constants'


const Field: React.FC = () => {
    const { tokenRoot } = useParams<{ tokenRoot: string }>()
    const managingToken = useManageTokenStore(tokenRoot!)
    const burnForm = useBurnForm()

    const handleChange = (targetAddress: string): void => {
        burnForm.onChangeData('targetAddress')(targetAddress)
        burnForm.debouncedLoadTargetWalletBalance()
    }

    return (
        <CustomAddressField
            className=''
            disabled={managingToken.isBurning}
            label="Target address"
            isValid={isAddressValid(managingToken.targetAddress)}
            value={managingToken.targetAddress}
            onChange={handleChange}
        />
    )
}

export const BurnAddressField = observer(Field)
