"use client";
import { useState } from "react";
import { Select, Button } from "..";
import Image from "next/image";
type IStatus = "Todo" | "Doing" | "Done";
type Option = {
  id: number;
  title: string;
};
const Form = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [value, setValue] = useState<Option | null>(null);
  const options = [
    { id: 1, title: "Todo" },
    { id: 2, title: "Doing" },
    { id: 3, title: "Done" },
  ];

  const onChange = (value: Option | null) => {
    setValue(value);
  };

  return (
    <form className="flex flex-col gap-6 mt-6">
      <div>
        <label className="text-[#828FA3] capitalize" htmlFor="title">
          title
        </label>
        <input
          className="w-full py-2 px-5 inline-block border border-[#ccc] rounded"
          id="title"
          placeholder="e.g Take coffee break"
        />
      </div>
      <div>
        <label className="text-[#828FA3] capitalize" htmlFor="description">
          description
        </label>
        <textarea
          id="description"
          className="w-full py-3 px-5 inline-block border border-[#ccc] rounded resize-none h-[112px]"
          placeholder="e.g It's always good to take a break. This 15 minutes break will recharge the battery a little."
        ></textarea>
      </div>
      <div>
        <label className="text-[#828FA3] capitalize">subtask</label>
        <div className="flex gap-4">
          <input
            className="w-full py-2 px-5 inline-block border border-[#ccc] rounded"
            placeholder="e.g Make coffee"
          />{" "}
          <div className="flex items-center">
            <Image
              src={"/" + "./assets/icon-cross.svg"}
              alt="cross-icon"
              height={16}
              width={16}
            />
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <input
            className="w-full py-2 px-5 inline-block border border-[#ccc] rounded"
            placeholder="e.g Drink coffee and smile"
          />
          <div className="flex items-center">
            <Image
              src={"/" + "./assets/icon-cross.svg"}
              alt="cross-icon"
              height={16}
              width={16}
            />
          </div>
        </div>
        <Button
          style="flex gap-x-1 bg-[#e4ebfa] w-full h-[40px] rounded-full items-center justify-center"
          onClick={() => console.log("clicked")}
        >
          <Image
            src={"/" + "./assets/icon-add-task-mobile.svg"}
            alt="plus-icon"
            width={5}
            height={20}
            className="self-center mt-1"
          />
          <p className="text-sm">add new subtask</p>
        </Button>
      </div>
      <div>
        <label htmlFor="status" className="text-[#828FA3] capitalize">
          status
        </label>
        <Select options={options} value={value} onChange={onChange} />
      </div>
      <Button
        style="bg-[#635fc7] w-full h-[40px] rounded-full"
        onClick={() => console.log("clicked")}
      >
        create task
      </Button>
    </form>
  );
};

export default Form;
