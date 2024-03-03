"use client";
import { Select, Button } from "..";
import Image from "next/image";
import { useAppSelector } from "@/lib/hooks";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "@/lib/formScema";
import { z } from "zod";

type IStatus = "Todo" | "Doing" | "Done";

type Option = {
  id: number;
  title: string;
};

const Form = () => {
  const {
    handleSubmit,
    register,
    control,

    formState: { errors, isSubmitting },
  } = useForm<z.output<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      status: "Todo",
      subtasks: [{ title: "", isCompleted: false }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtasks",
  });
  const lighTheme = useAppSelector((state) => state.theme.lightTheme);
  const options = [
    { id: 1, title: "Todo" },
    { id: 2, title: "Doing" },
    { id: 3, title: "Done" },
  ];

  const onSubmit = (data: any) => console.log(data);
  console.log(errors);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 mt-5"
    >
      <div>
        <label
          className={`${
            lighTheme ? "text-[#828FA3]" : "text-white"
          }  capitalize`}
          htmlFor="title"
        >
          title
        </label>
        <input
          {...register("title")}
          className={`w-full py-2 px-5 inline-block border border-[#ccc] border-opacity-50 placeholder:opacity-50 rounded mt-1 bg-transparent`}
          id="title"
          placeholder="e.g Take coffee break"
        />
      </div>
      {errors.title && <small>{errors.title.message}</small>}
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
          {...register("description")}
          id="description"
          className={`w-full py-3 px-5 inline-block border border-[#ccc] border-opacity-50 placeholder:opacity-50 rounded resize-none h-[112px] mt-1 bg-transparent`}
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
          <div className="flex gap-4 mt-1" key={field.id}>
            <input
              {...register(`subtasks.${index}.title` as const)}
              className={`w-full py-2 px-5 inline-block border border-[#ccc] border-opacity-50 placeholder:opacity-50 rounded bg-transparent`}
              placeholder="e.g Drink coffee and smile"
            />{" "}
            <div onClick={() => remove(index)} className="flex items-center">
              <Image
                src={"/" + "./assets/icon-cross.svg"}
                alt="cross-icon"
                height={16}
                width={16}
              />
            </div>
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
        <Select options={options} control={control} name="status" />
      </div>
      <button
        type="submit"
        className="bg-[#635fc7] w-full h-[40px] rounded-full capitalize text-white"
      >
        create task
      </button>
    </form>
  );
};

export default Form;
