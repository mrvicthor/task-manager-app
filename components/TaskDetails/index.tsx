"use client";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Subtask } from "@/lib/models";
import { setShowTaskDetails, setSubtask } from "@/lib/features/task/taskSlice";
import { updateSubtask } from "@/app/actions";
import Select from "../Select";

const TaskDetails = () => {
  const dispatch = useAppDispatch();
  const showTaskDetails = useAppSelector((state) => state.task.showTaskDetails);
  const lightTheme = useAppSelector((state) => state.theme.lightTheme);
  const taskDetails = useAppSelector((state) => state.task.task);
  const subTasks = useAppSelector((state) => state.task.subtask);

  const numberOfCompletedSubtasks = subTasks?.filter(
    (subtask) => subtask.isCompleted === true
  ).length;

  const options = [
    { id: 1, title: "Todo" },
    { id: 2, title: "Doing" },
    { id: 3, title: "Done" },
  ];
  const handleUpdateSubtask = (
    taskId: number,
    subtaskId: number,
    item: Subtask
  ) => {
    if (subTasks) {
      dispatch(
        setSubtask(
          subTasks.map((subtask) =>
            subtask.id === subtaskId
              ? { ...subtask, isCompleted: !subtask.isCompleted }
              : subtask
          )
        )
      );
    }
    console.log(item);
    updateSubtask(taskId, subtaskId, item);
  };

  if (!showTaskDetails) return null;
  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 bottom-0 z-[9999] size-full bg-[#000] opacity-50 cursor-pointer"
        onClick={() => dispatch(setShowTaskDetails())}
      />
      <section
        className={`${
          lightTheme ? "bg-[#ffffff]" : "bg-[#2b2c37]"
        } absolute mx-auto top-[50%] -translate-y-[50%] w-[90%] left-[50%] z-[10000] -translate-x-[50%] rounded-lg px-6 py-6 delete-modal space-y-4 md:w-[480px]`}
      >
        <div className="flex justify-between gap-4 h-[69px]">
          <p className="font-semibold">{taskDetails?.title}</p>{" "}
          <div className="pt-7">
            <Image
              src={"/" + "./assets/icon-vertical-ellipsis.svg"}
              alt="vertical-ellipsis"
              height={20}
              width={7}
            />
          </div>
        </div>
        <p className="text-xs text-[#828FA3] leading-6">
          {taskDetails?.description}
        </p>
        <div className="flex flex-col gap-4">
          <p className="text-[#828FA3] text-xs">
            Subtasks ({numberOfCompletedSubtasks} of {subTasks?.length})
          </p>
          {subTasks?.map((subtask) => (
            <div
              key={subtask.id}
              className={`${
                lightTheme ? "bg-[#f4f7fd]" : "bg-[#20212c]"
              } flex gap-4 items-center px-4 rounded py-2 hover:bg-[#e4ebfa] cursor-pointer`}
            >
              <input
                type="checkbox"
                id={subtask.title}
                name={subtask.title}
                value={subtask.title}
                onChange={() =>
                  handleUpdateSubtask(
                    taskDetails?.id as number,
                    subtask.id,
                    subtask
                  )
                }
                checked={subtask.isCompleted}
              />
              <label
                htmlFor="vehicle1"
                className={`${
                  subtask.isCompleted && "line-through text-[#828FA3]"
                } text-xs`}
              >
                {subtask.title}
              </label>
            </div>
          ))}
          <div>
            <p className="text-[#828FA3] text-xs">Current Status</p>
            <Select options={options} />
          </div>
        </div>
      </section>
    </>
  );
};

export default TaskDetails;
