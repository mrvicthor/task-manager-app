"use client";
import { useState, useRef } from "react";
import { useFormState } from "react-dom";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { toggleBoardForm, toggleEdit } from "@/lib/features/board/boardSlice";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { boardSchema } from "@/lib/formSchema";
import { createBoard, updateBoard } from "@/app/actions";
import Image from "next/image";
import { SvgComponent } from "..";
import { Board } from "@/lib/models";
type UseBoardFormProps = {
  board?: Board;
};
type FormFields = z.infer<typeof boardSchema>;

const UseBoardForm = ({ board }: UseBoardFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const lightTheme = useAppSelector((state) => state.theme.lightTheme);
  const formIsVisible = useAppSelector((state) => state.board.isOpen);

  const updateBoardWithId = updateBoard.bind(null, board?.id as number);
  const [state, formAction] = useFormState(
    board ? updateBoardWithId : createBoard,
    { message: "" }
  );
  const { register, handleSubmit, control, formState, getValues } =
    useForm<FormFields>({
      resolver: zodResolver(boardSchema),
      defaultValues: {
        name: board?.name ?? "",
        columns: board?.columns ?? [{ name: "Todo" }, { name: "Doing" }],
      },
    });

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "columns",
  });

  const notify = () => toast.success(`Board was successfully created`);

  const hideFormToggle = () => {
    document.body.style.overflow = "auto";
    dispatch(toggleBoardForm());
  };

  const onSubmit: SubmitHandler<FormFields> = () => {
    const formData = new FormData(formRef.current!);
    formAction(formData);
    dispatch(toggleBoardForm());
    notify();
    window.location.reload();
  };
  return (
    <form
      ref={formRef}
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
        create new board
      </button>
    </form>
  );
};

export default UseBoardForm;
