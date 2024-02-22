import React, { ReactNode, MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { toggleTaskForm } from "@/lib/features/task/taskSlice";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface ButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
}

const Button = ({ onClick, children }: ButtonProps) => {
  const dispatch = useDispatch();
  const pathname = usePathname();

  const showForm = () => {
    document.body.style.overflow = "hidden";
    dispatch(toggleTaskForm());
  };
  return (
    <button
      onClick={onClick}
      className={`${
        pathname === "/" ? "opacity-10" : "opacity-100"
      } flex bg-[#635fc7] text-white px-6 py-2 rounded-3xl gap-x-1 hover:bg-[#A8A4FF]`}
      disabled={pathname === "/"}
    >
      {children}
      <Image
        src={"/" + "./assets/icon-add-task-mobile.svg"}
        alt="plus-icon"
        width={5}
        height={20}
        className="self-center mt-1"
      />
      <p className="text-sm">Add New Task</p>
    </button>
  );
};

export default Button;
