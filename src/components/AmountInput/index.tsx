import * as React from 'react'

import { Button } from '../Button'
import { TextInput, TextInputProps } from '../TextInput'
import { useField } from '../../hooks/useField'


type Props = {
    value?: string;
    decimals?: number;
    disabled?: boolean;
    maxIsVisible?: boolean;
    placeholder?: string;
    size?: TextInputProps['size'];
    id?: string;
    invalid?: boolean;
    prefix?: React.ReactNode;
    readOnly?: boolean;
    className?: string;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onChange?: (value: string) => void;
    onClickMax?: () => void;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
}

export function AmountInput({
    decimals,
    disabled,
    id,
    invalid,
    maxIsVisible = true,
    placeholder,
    size = 'small',
    prefix,
    readOnly,
    // className,
    onClickMax,
    onFocus,
    onBlur,
    ...props
}: Props): JSX.Element {
    const field = useField({
        decimals,
        value: props.value,
        // eslint-disable-next-line sort-keys
        onBlur,
        onChange: props.onChange,
    })

    return (
        <div
            className=""
        >
            <TextInput
                value={props.value}
                disabled={disabled}
                size={size}
                id={id}
                invalid={invalid}
                inputMode="decimal"
                placeholder={placeholder ?? 'Amount...'}
                prefix={prefix}
                readOnly={readOnly}
                suffix={maxIsVisible && (
                    <Button
                        type="secondary"
                        btnStyles=""
                        onClick={onClickMax}
                        disabled={disabled}
                    >
                        Max
                    </Button>
                )}
                onBlur={field.onBlur}
                onChangeInput={field.onChange}
                onFocus={onFocus}
            />
        </div>
    )
}
