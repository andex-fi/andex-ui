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