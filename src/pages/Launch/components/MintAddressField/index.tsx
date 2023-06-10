/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { useMintForm } from '../../hooks/useMintForm'
import { BuilderField } from '../BuilderField'
import { useManageTokenStore } from '../../state/ManageTokenStore'
import { isAddressValid } from '../../../../constants'

function Field(): JSX.Element {
    const { tokenRoot } = useParams<{ tokenRoot: string }>()

    const managingToken = useManageTokenStore(tokenRoot!)
    const mintForm = useMintForm()

    const handleChange = (targetAddress: string): void => {
        mintForm.onChangeData('targetAddress')(targetAddress)

        mintForm.debouncedLoadTargetWalletBalance()
    }

    return (
        <BuilderField
            className=''
            disabled={managingToken.isMinting}
            label="Target address"
            type="string"
            isValid={
                isAddressValid(managingToken.targetAddress)
            }
            value={managingToken.targetAddress}
            onChange={handleChange}
        />
    )
}

export const MintAddressField = observer(Field)
