import React, { FC } from "react";

interface Props {
  btnContent: string;
  btnStyles: string;
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button: FC<Props> = ({ btnContent, btnStyles, handleClick }) => {
  return (
    <button className={btnStyles} onClick={handleClick}>
      {btnContent}
    </button>
  );
};
