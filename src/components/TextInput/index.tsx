import * as React from "react";
import { TextInputProps } from "./types";

const TextInput: React.FC<TextInputProps> = ({
  placeholder,
  value = "",
  disabled,
  id,
  inputMode,
  prefix,
  suffix,
  readOnly,
  onBlur,
  onChange,
  onChangeInput,
  onFocus,
}) => {
  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.currentTarget.value);
    onChangeInput?.(e);
  };

  return (
    <div className="w-full relative">
      {prefix && <div className="text-input_prefix">{prefix}</div>}
      <div className="text-input_input">
        <input
          autoComplete="off"
          type="text"
          className="block m-0 h-10 w-full border-2 border-black/30 p-2 rounded-lg"
          placeholder={placeholder}
          id={id}
          inputMode={inputMode}
          value={value}
          disabled={disabled}
          readOnly={readOnly}
          onBlur={onBlur}
          onChange={_onChange}
          onFocus={onFocus}
        />
      </div>
      {suffix && (
        <div className="absolute top-2 right-2 flex justify-center items-center">
          {suffix}
        </div>
      )}
    </div>
  );
}

export default TextInput;