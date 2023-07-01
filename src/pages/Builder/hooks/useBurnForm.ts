import * as React from 'react'
import { useParams } from 'react-router-dom'

import { useManageTokenStore } from '../state/ManageTokenStore'
import { ManageTokenStoreData } from '../types'
import { debounce } from '@andex/sdk'

type BurnFormShape = {
    isBurnPopupShown: boolean;
    showBurnPopup: () => void;
    hideBurnPopup: () => void;
    onChangeData: <K extends keyof Pick<ManageTokenStoreData, 'targetAddress' | 'amountToBurn' | 'callbackAddress' | 'callbackPayload'>>
    (key: K) => (value: ManageTokenStoreData[K]) => void;
    debouncedLoadTargetWalletBalance: () => void;

}

export function useBurnForm(): BurnFormShape {
    const { tokenRoot } = useParams<{ tokenRoot: string }>()
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const managingToken = useManageTokenStore(tokenRoot!)

    const [isBurnPopupShown, setIsBurnPopupShown] = React.useState(false)

    const showBurnPopup = () => {
        setIsBurnPopupShown(true)
    }

    const hideBurnPopup = () => {
        setIsBurnPopupShown(false)
    }

    const onChangeData = <K extends keyof Pick<ManageTokenStoreData, 'targetAddress' | 'amountToBurn' | 'callbackAddress' | 'callbackPayload'>>
        (key: K) => (value: ManageTokenStoreData[K]) => {
            managingToken.changeData(key, value)
        }

    const debouncedLoadTargetWalletBalance = debounce(async () => {
        await managingToken.loadTargetWalletBalance()
    }, 500)

    return {
        isBurnPopupShown,
        showBurnPopup,
        hideBurnPopup,
        onChangeData,
        debouncedLoadTargetWalletBalance,
    }
}
