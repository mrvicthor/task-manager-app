"use client";
import React, { Dispatch, SetStateAction } from "react";
import {
  setShowTaskDetails,
  setShowDeleteTask,
} from "@/lib/features/task/taskSlice";
import { useAppDispatch } from "@/lib/hooks";

type ITaskOptions = {
  isToggle: boolean;
  toggleTaskOptions: Dispatch<SetStateAction<boolean>>;
};

const TaskOptions = ({ isToggle, toggleTaskOptions }: ITaskOptions) => {
  const dispatch = useAppDispatch();

  const handleShowDeleteBoard = () => {
    dispatch(setShowTaskDetails());
    dispatch(setShowDeleteTask());
  };

  return (
    <div className="space-y-6">
      <p className="text-[#828FA3] capitalize text-xs cursor-pointer">
        edit task
      </p>
      <p
        onClick={handleShowDeleteBoard}
        className="text-[#ea5555] capitalize text-xs cursor-pointer"
      >
        delete task
      </p>
    </div>
  );
};

export default TaskOptions;
