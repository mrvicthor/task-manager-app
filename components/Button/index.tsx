import React, { ReactNode, MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { toggleTaskForm } from "@/lib/features/task/taskSlice";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface ButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  style: string;
  disabled?: boolean;
}

const Button = ({ onClick, children, style, disabled }: ButtonProps) => {
  const dispatch = useDispatch();
  const pathname = usePathname();

  return (
    <button onClick={onClick} className={style} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
