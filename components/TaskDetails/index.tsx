"use client";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setShowTaskDetails } from "@/lib/features/task/taskSlice";

const TaskDetails = () => {
  const dispatch = useAppDispatch();
  const showTaskDetails = useAppSelector((state) => state.task.showTaskDetails);
  const lightTheme = useAppSelector((state) => state.theme.lightTheme);
  const taskDetails = useAppSelector((state) => state.task.task);
  const subTasks = useAppSelector((state) => state.task.subtask);
  console.log(subTasks);
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
        } absolute mx-auto top-[50%] -translate-y-[50%] min-h-[557px] w-[90%] left-[50%] z-[10000] -translate-x-[50%] rounded-lg px-6 py-6 delete-modal space-y-6 md:w-[480px] md:min-h-[523px]`}
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
        <form>
          <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
          <label htmlFor="vehicle1"> I have a bike</label>
        </form>
      </section>
    </>
  );
};

export default TaskDetails;
