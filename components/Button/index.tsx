import React, { ReactNode, MouseEvent } from "react";

interface ButtonProps {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  style: string;
  disabled?: boolean;
}

const Button = ({ onClick, children, style, disabled }: ButtonProps) => {
  return (
    <button onClick={onClick} className={style} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
