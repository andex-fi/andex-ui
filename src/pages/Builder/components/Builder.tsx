/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react'

import { BuilderTokensList } from './BuilderTokensList'
import { useBuilderStore } from '../state/BuilderStore'


export const Builder: React.FC = () => {
    const builder = useBuilderStore()

    React.useEffect(() => {
        (async () => {
            await builder.init()
        })()

        return () => {
            builder.dispose()
        }
    }, [])

    return (
        <>
            <BuilderTokensList />
        </>
    )
}
