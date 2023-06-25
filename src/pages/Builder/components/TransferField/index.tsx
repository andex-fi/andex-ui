import React from "react"
import { observer } from "mobx-react-lite"
import { useField } from "../../../../hooks"
import classNames from "classnames"


type Props = {
    className: string;
    disabled?: boolean;
    label: string;
    id?: string;
    type?: string;
    inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
    isValid?: boolean;
    readOnly?: boolean;
    pattern?: string;
    placeholder?: string;
    value?: string;
    showCopy?: boolean;
    onChange?: (value: string) => void;
    onClick?: () => void;
}

function Field({
    className,
    isValid = true,
    type = 'text',
    // showCopy,
    ...props
}: Props): JSX.Element {
    const isDirty = React.useRef<boolean>(false)

    const onChangeTextInput: React.ChangeEventHandler<HTMLInputElement> = event => {
        const { value } = event.target
        props.onChange?.(value)
        isDirty.current = true
    }

    const numberField = useField({
        value: props.value,
        onChange: (value: string) => {
            props.onChange?.(value)
            isDirty.current = true
        },
    })


    return (
        <label htmlFor={props.id}>
            <fieldset
                className={classNames('form-fieldset', className, {
                    invalid: isDirty.current && !isValid,
                })}
                onClick={props.onClick}
            >
                <div className="w-full h-16 border-[1px] border-[#DFE8F9] p-2 mt-4 rounded-lg dark:bg-purple-light">
                        <input
                            className="w-full h-full dark:bg-purple-light outline-none"
                            disabled={props.disabled}
                            inputMode={props.inputMode}
                            pattern={props.pattern}
                            placeholder={props.placeholder}
                            readOnly={props.readOnly}
                            type="text"
                            value={props.value}
                            onChange={type === 'number' ? numberField.onChange : onChangeTextInput}
                            onBlur={type === 'number' ? numberField.onBlur : undefined}
                        />
                </div>
            </fieldset>
        </label>
    )
}

export const TransferField = observer(Field)
