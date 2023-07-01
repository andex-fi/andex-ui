import * as React from 'react'

import { useBuilderStore } from '../state/BuilderStore'
import { BuilderStoreData } from '../types'
import { debounce } from '@andex/sdk'


type FilterFormShape = {
    debouncedFilter: () => void;
    onChangeData: <K extends keyof BuilderStoreData>(key: K) => (value: BuilderStoreData[K]) => void;
}


export function useFilterForm(): FilterFormShape {
    const builder = useBuilderStore()

    const onChangeData = <K extends keyof BuilderStoreData>(key: K) => (value: BuilderStoreData[K]) => {
        builder.changeData(key, value)
    }

    const debouncedFilter = debounce(async () => {
        await builder.filterTokens()
    }, 500)

    React.useEffect(() => {
        (async () => {
            await builder.init()
        })()

        return () => {
            builder.dispose()
        }
    })

    return { onChangeData, debouncedFilter }
}
