import React from "react"
import { observer } from "mobx-react-lite"
import { useField } from "../../../../hooks"
import { CopyToClipboard } from "../../../../components/CopyToClipboard"
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
    showCopy,
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
        <label className="form-label" htmlFor={props.id}>
            <fieldset
                className={classNames('form-fieldset', className, {
                    invalid: isDirty.current && !isValid,
                })}
                onClick={props.onClick}
            >
                <div className="form-fieldset__header ml-3 font-bold">
                    <div>{props.label}</div>
                </div>
                <div className="form-fieldset__main">
                    <input
                        className="form-input outline-none w-full placeholder-[#7F8FA9] bg-[#F4F5FA] dark:bg-purple px-3 py-5 rounded-[12px]"
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
                    {showCopy && (
                        <CopyToClipboard
                            text={props.value ?? ''}
                        />
                    )}
                </div>
            </fieldset>
        </label>
    )
}

export const BuilderField = observer(Field)
