import React, { useState, useMemo} from 'react'
import { FilterFieldProps } from './types'
import { Box, Input } from '@andex/uikit'
import { debounce } from 'lodash'
import styled from 'styled-components'

const StyledBox = styled(Box)`
    width: 70%;
`

const StyledInput = styled(Input)`
  border-radius: 32px;
  height: 100%;
  padding: 13.5px;
  padding-left: 32px;
  margin-left: auto;
`

const InputWrapper = styled.div`
  position: relative;
  ${({ theme }) => theme.mediaQueries.sm} {
    display: block;
  }
`

const FilterField: React.FC<FilterFieldProps> = ({ onChange: onChangeCallback, placeholder = 'Filtering...' }) => {
    const [searchText, setSearchText] = useState('')

    const debouncedOnChange = useMemo(
        () => debounce((e: React.ChangeEvent<HTMLInputElement>) => onChangeCallback(e), 500),
        [onChangeCallback],
    )

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value)
        debouncedOnChange(e)
    }
    return (
        <StyledBox>
            <InputWrapper>
                <StyledInput 
                    value={searchText} 
                    onChange={onChange}
                    placeholder={placeholder}
                />
            </InputWrapper>
            {/*<input
                className="block p-3 pl-8 text-sm text-gray-900 bg-[#DFE4EE] dark:bg-[#482168] border border-grey-light rounded-3xl w-full bg-gray-50 outline-none font-bold"
                placeholder={placeholder}
                onChange={onChange}
                value={searchText}    
    />*/}    
        </StyledBox>
    )
}

export default FilterField;