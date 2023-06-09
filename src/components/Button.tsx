/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from "react";
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
  type?: 'primary' | 'secondary' | 'tertiary' | 'link' | 'icon' | 'accept' | 'danger';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  submit?: boolean;
}

export const Button: FC<Props> = ({
  btnStyles,
  onClick,
  link,
  href,
  children,
  submit
}) => {
  

  if (link) {
    return (
      <Link
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
      className={btnStyles}
      onClick={onClick}
      type={submit ? 'submit' : 'button'}
    >
      {children}
    </button>
  );
};
