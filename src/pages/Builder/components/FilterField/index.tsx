import * as React from 'react'

import FilterField from '../../../../components/FilterField'
import { useFilterForm } from '../../hooks/useFilterForm'


export function FilterFieldCommon(): JSX.Element {
    const form = useFilterForm()

    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        form.onChangeData('filter')(event.currentTarget.value)
        form.debouncedFilter()
    }

    return (
        <FilterField
            // className={className}
            placeholder="Filtering..."
            onChange={onChange}
        />
    )
}
