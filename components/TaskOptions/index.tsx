"use client";
import React, { Dispatch, SetStateAction } from "react";
import {
  setShowTaskDetails,
  setShowDeleteTask,
  toggleEditTaskForm,
} from "@/lib/features/task/taskSlice";
import { useAppDispatch } from "@/lib/hooks";

type ITaskOptions = {
  toggleTaskOptions: Dispatch<SetStateAction<boolean>>;
};

const TaskOptions = ({ toggleTaskOptions }: ITaskOptions) => {
  const dispatch = useAppDispatch();

  const handleShowDeleteBoard = () => {
    dispatch(setShowTaskDetails());
    dispatch(setShowDeleteTask());
    toggleTaskOptions(false);
  };

  const showForm = () => {
    document.body.style.overflow = "hidden";
    dispatch(toggleEditTaskForm());
    toggleTaskOptions(false);
    dispatch(setShowTaskDetails());
  };

  return (
    <div className="space-y-6">
      <p
        onClick={showForm}
        className="text-[#828FA3] capitalize text-xs cursor-pointer"
      >
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
