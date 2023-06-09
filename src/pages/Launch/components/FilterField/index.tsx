import * as React from 'react'

import { FilterField as FilterFieldCommon } from '../../../../components/FilterField'
import { useFilterForm } from '../../hooks/useFilterForm'

type Props = {
    className?: string;
}

export function FilterField({ className }: Props): JSX.Element {
    const form = useFilterForm()

    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        form.onChangeData('filter')(event.currentTarget.value)
        form.debouncedFilter()
    }

    return (
        <FilterFieldCommon
            className={className}
            placeholder="Filtering..."
            onChange={onChange}
        />
    )
}
