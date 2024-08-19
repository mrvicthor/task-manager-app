"use client";
import { useAppSelector } from "@/lib/hooks";
import { useState, useRef, useEffect } from "react";
import { Control, useController, Controller } from "react-hook-form";

interface Option {
  id: number;
  title: string;
}

interface SelectProps {
  options: Option[];
  name: string;
  control: Control<any>;
  editValue?: string;
}

function SelectField({ options, name, control, editValue }: SelectProps) {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const lightTheme = useAppSelector((state) => state.theme.lightTheme);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLSelectElement>(null);

  const {
    field: { value, onChange },
  } = useController({ name, control });

  const handleOptionClick = (option: Option) => {
    if (selectRef.current) {
      const selectedIndex = options.findIndex(
        (opt) => opt.title === option.title
      );
      selectRef.current.selectedIndex = selectedIndex;
    }
    setSelectedOption(option);
  };

  const toggleSelect = () => {
    setIsOpen((prev) => !prev);
  };

  const closeSelect = () => {
    setIsOpen(false);
  };

  const handleDocumentClick = (e: MouseEvent) => {
    const target = e.target as Node;
    if (selectRef.current && !selectRef.current.contains(target)) {
      closeSelect();
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  });
  return (
    <div className="custom-select w-full" onClick={toggleSelect}>
      <div
        className={`select-selected ${
          isOpen ? "select-arrow-active" : ""
        } border border-[#ccc] border-opacity-50 rounded text-[#828FA3]`}
      >
        {selectedOption ? selectedOption.title : editValue ?? "Todo"}
      </div>
      <select
        ref={selectRef}
        name={name}
        className="hidden"
        defaultValue={editValue ?? "Todo"}
      >
        {options.map((option) => (
          <option key={option.id} value={option.title}>
            {option.title}
          </option>
        ))}
      </select>
      <div
        className={`select-items ${isOpen ? "" : "select-hide"} ${
          lightTheme ? "bg-white" : "bg-[#20212c]"
        } border border-[#ccc] border-opacity-50 rounded`}
      >
        {options.map((option) => (
          <div
            className={`${
              selectedOption && selectedOption.title === option.title
                ? "same-as-selected"
                : ""
            } text-[#828FA3]`}
            key={option.id}
            onClick={() => {
              onChange(option.title);
              handleOptionClick(option);
            }}
          >
            {option.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectField;
