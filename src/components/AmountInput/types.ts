import React from "react";
import { TextInputProps } from "../TextInput/types";

export type AmountInputProps = {
    value?: string;
    decimals?: number;
    disabled?: boolean;
    maxIsVisible?: boolean;
    placeholder?: string;
    size?: TextInputProps["size"];
    id?: string;
    invalid?: boolean;
    prefix?: React.ReactNode;
    readOnly?: boolean;
    className?: string;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onChange?: (value: string) => void;
    onClickMax?: () => void;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
  };