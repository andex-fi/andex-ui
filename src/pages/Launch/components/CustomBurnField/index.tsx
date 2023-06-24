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
                <div className="border border-[#DFE8F9] p-4 rounded-lg mt-3 overflow-hidden bg-[#F4F5FA] dark:bg-purple-darkest">
                        <h4>{props.label}</h4>
                        <input
                            className="w-full font-bold bg-[#F4F5FA] dark:bg-purple-darkest mt-1 outline-none focus:border-[#F4F5FA]"
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

export const CustomBurnField = observer(Field)
