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

const Field: React.FC<Props> = ({
    className,
    isValid = true,
    type = 'text',
    // showCopy,
    ...props
}) => {
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
                <div className="bg-[#F4F5FA] dark:bg-purple-darkest rounded-lg mt-4 flex flex-col gap-2 p-2 overflow-hidden">
                    <div className="text-[#7F8FA9] dark:text-white text-sm">
                        <div>{props.label}</div>
                    </div>
                    <div className="text-[#13173E] dark:text-white font-bold text-sm">
                        <input
                            className="outline-none w-full placeholder-[#7F8FA9] bg-[#F4F5FA] dark:bg-purple"
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
                </div>
            </fieldset>
        </label>
    )
}

export const BuilderField = observer(Field)
