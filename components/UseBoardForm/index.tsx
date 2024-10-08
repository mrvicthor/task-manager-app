"use client";
import { useState } from "react";
import Image from "next/image";
import SvgComponent from "../SVGComponent";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { toggleBoardForm, toggleEdit } from "@/lib/features/board/boardSlice";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { boardSchema } from "@/lib/formSchema";
import { createBoard, updateBoard } from "@/app/actions";
import { Board } from "@/lib/models";
type UseBoardFormProps = {
  board?: Board;
};
export type FormFields = z.infer<typeof boardSchema>;

const UseBoardForm = ({ board }: UseBoardFormProps) => {
  const dispatch = useAppDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const lightTheme = useAppSelector((state) => state.theme.lightTheme);
  const isEditing = useAppSelector((state) => state.board.isEditingBoard);

  const { register, handleSubmit, control, formState, getValues } =
    useForm<FormFields>({
      resolver: zodResolver(boardSchema),
      defaultValues: board || {
        name: "",
        columns: [{ name: "Todo" }, { name: "Doing" }],
      },
    });

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "columns",
  });

  const notify = () =>
    board
      ? toast.success("Board was successfully updated")
      : toast.success(`Board was successfully created`);

  const onSubmit = async (data: FormFields) => {
    try {
      if (isEditing && board?.id) {
        dispatch(toggleEdit());
        await updateBoard(board?.id as number, data);
      } else {
        dispatch(toggleBoardForm());
        await createBoard(data);
      }
      notify();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 mt-5"
    >
      <div className="relative">
        <label
          className={`${
            lightTheme ? "text-[#828FA3]" : "text-white"
          }  capitalize`}
          htmlFor="boardName"
        >
          board name
        </label>
        <input
          {...register("name")}
          className={`w-full py-2 px-5 inline-block border border-[#ccc] border-opacity-50 hover:focus:outline placeholder:opacity-50 placeholder:text-sm rounded mt-1 bg-transparent focus:outline-none ${
            formState.errors.name && "border-[#ea5555]"
          }`}
          id="boardName"
          placeholder="e.g Web Design"
        />
        {formState.errors.name && (
          <small className="text-[#ea5555] absolute right-4 top-10">
            {formState.errors.name.message}
          </small>
        )}
      </div>
      <div>
        <label
          className={`${
            lightTheme ? "text-[#828FA3]" : "text-white"
          } capitalize`}
        >
          board columns
        </label>

        {fields.map((field, index) => (
          <div className="flex gap-4 mt-1 relative" key={field.id}>
            <input
              {...register(`columns.${index}.name` as const)}
              className={`w-full py-2 px-5 inline-block subtask-input border border-[#ccc] border-opacity-50 placeholder:opacity-50 placeholder:text-sm rounded bg-transparent focus:outline-none ${
                isHovered && "border-[#ea5555]"
              }`}
              placeholder="e.g Todo"
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
            {isHovered && getValues(`columns.${index}.name`) === "" && (
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
        {board ? "save changes" : "create new board"}
      </button>
    </form>
  );
};

export default UseBoardForm;
