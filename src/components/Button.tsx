/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import * as H from 'history'
import { Link } from "react-router-dom";

export interface AnchorButtonProps extends Omit<React.AnchorHTMLAttributes<any>, 'onClick'> {
  href: string;
  target?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export interface NativeButtonProps extends Omit<React.ButtonHTMLAttributes<any>, 'type' | 'onClick'> {
  htmlType?: 'button' | 'reset' | 'submit';
  onClick?: React.MouseEventHandler<HTMLElement>;
}

interface Props<S = H.LocationState>  extends Partial<NativeButtonProps> {
  block?: boolean;
  btnStyles: string;
  href?: string;
  children: React.ReactNode;
  link?: H.LocationDescriptor<S> | ((location: H.Location<S>) => H.LocationDescriptor<S>) | any;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'primary' | 'secondary' | 'tertiary' | 'link' | 'icon' | 'accept' | 'danger' | 'empty';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  submit?: boolean;
}

export const Button = React.forwardRef<unknown, Props>(({
  btnStyles,
  onClick,
  link,
  href,
  children,
  submit,
  ...props
}, ref): JSX.Element => {
  const buttonRef = (ref as any) || React.useRef<HTMLElement | null>(null)
  

  if (link) {
    return (
      <Link
        ref={buttonRef}
        to={link}
        className={btnStyles}
      >
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a
        ref={buttonRef}
        className={btnStyles}
        href={href}
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        {children}
      </a>
    )
  }

  return (
    <button
      ref={buttonRef} 
      className={btnStyles}
      onClick={onClick}
      {...props}
      type={submit ? 'submit' : 'button'}
    >
      {children}
    </button>
  );
});
