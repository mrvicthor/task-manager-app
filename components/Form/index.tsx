"use client";

import { toast } from "react-toastify";

import { useRef, useState } from "react";
import { SelectField, SvgComponent } from "..";
import Image from "next/image";
import { useAppSelector } from "@/lib/hooks";
import { useFormState } from "react-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "@/lib/formSchema";
import { z } from "zod";
import { TaskProps } from "@/lib/models";
import { createTask, updateTask } from "@/app/actions";
import { useDispatch } from "react-redux";
import {
  toggleTaskForm,
  toggleEditTaskForm,
} from "@/lib/features/task/taskSlice";

type FormProps = {
  columnId: number;
  taskData?: TaskProps;
};

const Form = ({ columnId, taskData }: FormProps) => {
  const dispatch = useDispatch();
  const notify = () => toast.success(`Task added to column ${columnId}`);
  const [isHovered, setIsHovered] = useState(false);
  const createTaskWitId = createTask.bind(null, columnId);
  const updateTaskWitId = updateTask.bind(null, taskData?.id as number);
  const [state, formAction] = useFormState(
    taskData ? updateTaskWitId : createTaskWitId,
    {
      message: "",
    }
  );

  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<z.output<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: taskData?.title ?? "",
      description: taskData?.description ?? "",
      status: taskData?.status ?? "Todo",
      subtasks: taskData?.subtasks ?? [{ title: "", isCompleted: false }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "subtasks",
  });
  const lighTheme = useAppSelector((state) => state.theme.lightTheme);
  const options = [
    { id: 1, title: "Todo" },
    { id: 2, title: "Doing" },
    { id: 3, title: "Done" },
  ];

  return (
    <form
      ref={formRef}
      onSubmit={(evt) => {
        evt.preventDefault();
        form.handleSubmit(() => {
          formAction(new FormData(formRef.current!));
          if (taskData) {
            dispatch(toggleEditTaskForm());
          } else {
            dispatch(toggleTaskForm());
          }
          notify();
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        })(evt);
      }}
      action={formAction}
      className="flex flex-col gap-5 mt-5"
    >
      <div className="relative">
        <label
          className={`${
            lighTheme ? "text-[#828FA3]" : "text-white"
          }  capitalize`}
          htmlFor="title"
        >
          title
        </label>
        <input
          {...form.register("title")}
          className={`w-full py-2 px-5 inline-block border border-[#ccc] border-opacity-50 hover:focus:outline placeholder:opacity-50 placeholder:text-sm rounded mt-1 bg-transparent focus:outline-none ${
            form.formState.errors.title && "border-[#ea5555]"
          }`}
          id="title"
          placeholder="e.g Take coffee break"
        />
        {form.formState.errors.title && (
          <small className="text-[#ea5555] absolute right-4 top-10">
            Can&apos;t be empty
          </small>
        )}
      </div>
      <div>
        <label
          className={`${
            lighTheme ? "text-[#828FA3]" : "text-white"
          } capitalize`}
          htmlFor="description"
        >
          description
        </label>
        <textarea
          {...form.register("description")}
          id="description"
          className={`w-full py-3 px-5 inline-block border border-[#ccc] border-opacity-50 placeholder:opacity-50 placeholder:text-sm rounded resize-none h-[112px] mt-1 bg-transparent`}
          placeholder="e.g It's always good to take a break. This 15 minutes break will recharge the battery a little."
        ></textarea>
      </div>
      <div>
        <label
          className={`${
            lighTheme ? "text-[#828FA3]" : "text-white"
          } capitalize`}
        >
          subtask
        </label>

        {fields.map((field, index) => (
          <div className="flex gap-4 mt-1 relative" key={field.id}>
            <input
              {...form.register(`subtasks.${index}.title` as const)}
              className={`w-full py-2 px-5 inline-block subtask-input border border-[#ccc] border-opacity-50 placeholder:opacity-50 placeholder:text-sm rounded bg-transparent focus:outline-none ${
                isHovered && "border-[#ea5555]"
              }`}
              placeholder="e.g Drink coffee and smile"
            />{" "}
            <input
              type="hidden"
              {...form.register(`subtasks.${index}.isCompleted` as const)}
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
            {isHovered && form.getValues(`subtasks.${index}.title`) === "" && (
              <small className="text-[#ea5555] absolute right-10 top-3 text-xs">
                Can&apos;t be empty
              </small>
            )}
          </div>
        ))}

        <button
          type="button"
          className="flex gap-x-1 bg-[#e4ebfa] w-full h-[40px] rounded-full items-center justify-center capitalize mt-2"
          onClick={() => append({ title: "", isCompleted: false })}
        >
          <Image
            src={"/" + "./assets/icon-add-purple.svg"}
            alt="plus-icon"
            width={5}
            height={20}
            className="self-center mt-1"
          />
          <p className="text-sm text-[#635fc7]">add new subtask</p>
        </button>
      </div>
      <div>
        <label
          htmlFor="status"
          className={`${
            lighTheme ? "text-[#828FA3]" : "text-white"
          } capitalize`}
        >
          status
        </label>
        <SelectField
          options={options}
          name="status"
          control={form.control}
          editValue={taskData?.status}
        />
      </div>
      <button
        type="submit"
        className="bg-[#635fc7] w-full h-[40px] rounded-full capitalize text-white"
      >
        {taskData ? "save changes" : "create task"}
      </button>
    </form>
  );
};

export default Form;
