"use client";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { setShowDeleteTask } from "@/lib/features/task/taskSlice";

const DeleteTask = () => {
  const dispatch = useAppDispatch();
  const showDelete = useAppSelector((state) => state.task.showDeleteTask);
  const lightTheme = useAppSelector((state) => state.theme.lightTheme);
  const taskToDelete = useAppSelector((state) => state.task.task);
  console.log(showDelete, taskToDelete, "vic");
  if (!showDelete) return null;
  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 bottom-0 z-[9999] size-full bg-[#000] opacity-50 cursor-pointer"
        onClick={() => dispatch(setShowDeleteTask())}
      />
      <section
        className={`${
          lightTheme ? "bg-[#ffffff]" : "bg-[#2b2c37]"
        } absolute mx-auto top-[20px] min-h-[659px] w-[90%] left-[16px] right-[16px] z-[10000] rounded-lg px-6 py-6`}
      >
        {" "}
        <p>make i delete</p>
      </section>
    </>
  );
};

export default DeleteTask;
