import React, { FC } from "react";

interface Props {
  btnStyles: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button: FC<Props> = ({ btnStyles, onClick, children }) => {
  return (
    <button className={btnStyles} onClick={onClick}>
      {children}
    </button>
  );
};
