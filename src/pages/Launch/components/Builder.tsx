/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react'

import { BuilderTokensList } from './BuilderTokensList'
import { useBuilderStore } from '../state/BuilderStore'


export function Builder(): JSX.Element {
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
        <div className="bg-white dark:bg-purple-light bg-opacity-8 rounded-md mx-auto p-8 relative w-[70%]">
            <div className="">
                <BuilderTokensList />
            </div>
        </div>
    )
}
