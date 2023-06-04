import React, { FC } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface NativeButtonProps extends Omit<React.ButtonHTMLAttributes<any>, 'type' | 'onClick'> {
  htmlType?: 'button' | 'reset' | 'submit';
  onClick?: React.MouseEventHandler<HTMLElement>;
}

interface Props extends Partial<NativeButtonProps> {
  block?: boolean;
  btnStyles: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'primary' | 'link' | 'icon' | 'accept';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  submit?: boolean;
}

export const Button: FC<Props> = ({ btnStyles, onClick, children, submit }) => {
  return (
    <button className={btnStyles} onClick={onClick} type={submit ? 'submit' : 'button'}>
      {children}
    </button>
  );
};
