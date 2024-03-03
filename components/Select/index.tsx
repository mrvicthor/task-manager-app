"use client";
import { useState } from "react";
import Image from "next/image";
import { useAppSelector } from "@/lib/hooks";
import { Control, useController } from "react-hook-form";

type Option = {
  id: number;
  title: string;
};

type SelectProps = {
  options: Option[];
  control: Control<any>;
  name: string;
};
const Select = ({ options, name, control }: SelectProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const lighTheme = useAppSelector((state) => state.theme.lightTheme);
  const {
    field: { value, onChange },
  } = useController({ name, control });

  console.log(value);
  return (
    <div
      tabIndex={0}
      onClick={() => setShowOptions(!showOptions)}
      className="w-full h-[42px] px-5 flex items-center border border-[#ccc] border-opacity-50 rounded relative mt-1"
    >
      <span className={`${lighTheme ? "text-black" : "text-white"}`}>
        {value ? value : "Select one"}
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
              onClick={() => onChange(item.title)}
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
