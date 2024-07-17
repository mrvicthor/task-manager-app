"use client";
import { useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { useForm, useFieldArray } from "react-hook-form";
import Image from "next/image";
import { SvgComponent } from "..";

type ColumnProps = {
  name: string;
};

type FormFields = {
  name: string;
  columns: ColumnProps[];
};
const UseBoardForm = () => {
  const [isHovered, setIsHovered] = useState(false);
  const lightTheme = useAppSelector((state) => state.theme.lightTheme);
  const form = useForm<FormFields>();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "columns",
  });
  return (
    <>
      <h3>Add New Board</h3>
      <form className="flex flex-col gap-5 mt-5">
        <div className="relative">
          <label
            className={`${
              lightTheme ? "text-[#828FA3]" : "text-white"
            }  capitalize`}
            htmlFor="title"
          >
            title
          </label>
          <input
            {...form.register("name")}
            className={`w-full py-2 px-5 inline-block border border-[#ccc] border-opacity-50 hover:focus:outline placeholder:opacity-50 placeholder:text-sm rounded mt-1 bg-transparent focus:outline-none ${
              form.formState.errors.name && "border-[#ea5555]"
            }`}
            id="title"
            placeholder="e.g Take coffee break"
          />
          {<form action="" className="formState errors boardName"></form> && (
            <small className="text-[#ea5555] absolute right-4 top-10">
              Can&apos;t be empty
            </small>
          )}
        </div>
        <div>
          <label
            className={`${
              lightTheme ? "text-[#828FA3]" : "text-white"
            } capitalize`}
          >
            subtask
          </label>

          {fields.map((field, index) => (
            <div className="flex gap-4 mt-1 relative" key={field.id}>
              <input
                {...form.register(`columns.${index}.name` as const)}
                className={`w-full py-2 px-5 inline-block subtask-input border border-[#ccc] border-opacity-50 placeholder:opacity-50 placeholder:text-sm rounded bg-transparent focus:outline-none ${
                  isHovered && "border-[#ea5555]"
                }`}
                placeholder="e.g Drink coffee and smile"
              />
              <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => remove(index)}
                className="flex items-center subtask-icon cursor-pointer text-[#828FA3] hover:text-[#ea5555]"
              >
                <SvgComponent
                  color=""
                  pathString="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"
                />
              </div>
              {isHovered && form.getValues(`columns.${index}.name`) === "" && (
                <small className="text-[#ea5555] absolute right-10 top-3 text-xs">
                  Can&apos;t be empty
                </small>
              )}
            </div>
          ))}

          <button
            type="button"
            className="flex gap-x-1 bg-[#e4ebfa] w-full h-[40px] rounded-full items-center justify-center capitalize mt-2"
            onClick={() => append({ name: "" })}
          >
            <Image
              src={"/" + "./assets/icon-add-purple.svg"}
              alt="plus-icon"
              width={5}
              height={20}
              className="self-center mt-1"
            />
            <p className="text-sm text-[#635fc7]">add new column</p>
          </button>
        </div>
        <button
          type="submit"
          className="bg-[#635fc7] w-full h-[40px] rounded-full capitalize text-white"
        >
          create new board
        </button>
      </form>
    </>
  );
};

export default UseBoardForm;
