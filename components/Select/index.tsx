"use client";
import { useState } from "react";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { setTask } from "@/lib/features/task/taskSlice";
import { useParams } from "next/navigation";
import { updateStatus } from "@/app/actions";

type Option = {
  id: number;
  title: string;
};

type SelectProps = {
  options: Option[];
};
const Select = ({ options }: SelectProps) => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const [showOptions, setShowOptions] = useState(false);
  const lighTheme = useAppSelector((state) => state.theme.lightTheme);
  const task = useAppSelector((state) => state.task.task);

  const handleStatusUpdate = (value: string) => {
    if (task) {
      dispatch(setTask({ ...task, status: value }));
      updateStatus(Number(params.boardId), task, value);
    }
  };

  return (
    <div
      tabIndex={0}
      onClick={() => setShowOptions(!showOptions)}
      className="w-full h-[42px] px-5 flex items-center border border-[#ccc] border-opacity-50 rounded relative mt-1"
    >
      <span className={`${lighTheme ? "text-black" : "text-white"}`}>
        {task?.status}
      </span>
      <div className="absolute right-4 top-4">
        <Image
          src={`/${
            showOptions
              ? "./assets/icon-chevron-up.svg"
              : "./assets/icon-chevron-down.svg"
          }`}
          height={12}
          width={12}
          alt="arrow-logo"
        />
      </div>
      {showOptions && (
        <ul
          className={`${
            lighTheme ? "bg-white" : "bg-[#20212c]"
          } absolute top-[45px] left-0 right-0 rounded z-[30000px]`}
        >
          {options.map((item) => (
            <li
              className={`py-1 px-4 cursor-pointer text-[#828FA3]`}
              key={item.id}
              value={item.title}
              onClick={() => handleStatusUpdate(item.title)}
            >
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
