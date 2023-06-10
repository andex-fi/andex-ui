import * as React from "react";

export type TextInputProps = {
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  id?: string;
  invalid?: boolean;
  inputMode?:
    | "none"
    | "text"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search";
  size?: "small" | "medium";
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  readOnly?: boolean;
  className?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onChange?: (value: string) => void;
  onChangeInput?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
};

export function TextInput({
  placeholder,
  value = "",
  disabled,
  id,
  // invalid,
  inputMode,
  // size,
  prefix,
  suffix,
  readOnly,
  // className,
  onBlur,
  onChange,
  onChangeInput,
  onFocus,
}: TextInputProps): JSX.Element {
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
