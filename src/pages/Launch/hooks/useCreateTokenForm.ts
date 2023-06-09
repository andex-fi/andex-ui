import * as React from 'react'
import { useNavigate } from 'react-router-dom'

import { useCreateTokenStore } from '../state/CreateTokenStore'
import { CreateTokenStoreData } from '../types'


type CreateTokenFormShape = {
    onChangeData: <K extends keyof CreateTokenStoreData>(key: K) => (value: CreateTokenStoreData[K]) => void;
    onDismissTransactionReceipt: () => void
}


export function useCreateTokenForm(): CreateTokenFormShape {
    const navigate = useNavigate()
    const creatingToken = useCreateTokenStore()


    const onChangeData = <K extends keyof CreateTokenStoreData>(key: K) => (value: CreateTokenStoreData[K]) => {
        creatingToken.changeData(key, value)
    }

    const onDismissTransactionReceipt = () => {
        if (creatingToken.transaction?.success) {
            navigate('/builder')
        }

        creatingToken.cleanTransactionResult()
    }

    React.useEffect(() => {
        creatingToken.init()
        return () => {
            creatingToken.dispose()
        }
    })

    return {
        onChangeData,
        onDismissTransactionReceipt,
    }
}
