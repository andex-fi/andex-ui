import * as React from "react";
import { AmountInputProps } from "./types";
import { Button } from "../Button";
import TextInput from "../TextInput";
import { useField } from "../../hooks/useField";


const AmountInput: React.FC<AmountInputProps> = ({
  decimals,
  disabled,
  id,
  invalid,
  maxIsVisible = true,
  placeholder,
  size = "small",
  prefix,
  readOnly,
  // className,
  onClickMax,
  onFocus,
  onBlur,
  ...props
}) => {
  const field = useField({
    decimals,
    value: props.value,
    // eslint-disable-next-line sort-keys
    onBlur,
    onChange: props.onChange,
  });

  return (
    <div className="w-full">
      <TextInput
        value={props.value}
        disabled={disabled}
        size={size}
        id={id}
        invalid={invalid}
        inputMode="decimal"
        placeholder={placeholder ?? "Amount..."}
        prefix={prefix}
        readOnly={readOnly}
        suffix={
          maxIsVisible && (
            <Button
              type="secondary"
              btnStyles=""
              onClick={onClickMax}
              disabled={disabled}
            >
              Max
            </Button>
          )
        }
        onBlur={field.onBlur}
        onChangeInput={field.onChange}
        onFocus={onFocus}
      />
    </div>
  );
}

export default AmountInput
