"use client";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { toast } from "react-toastify";
import { setShowDeleteTask } from "@/lib/features/task/taskSlice";
import { Button } from "..";
import { deleteTask } from "@/app/actions";

const DeleteTask = () => {
  const dispatch = useAppDispatch();

  const showDelete = useAppSelector((state) => state.task.showDeleteTask);
  const lightTheme = useAppSelector((state) => state.theme.lightTheme);
  const taskToDelete = useAppSelector((state) => state.task.task);
  const notify = () =>
    toast.success(`Task with id: ${taskToDelete?.id} was successfully deleted`);

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
        } absolute mx-auto top-[50%] -translate-y-[50%] min-h-[284px] w-[90%] left-[50%] z-[10000] -translate-x-[50%] rounded-lg px-6 py-6 delete-modal space-y-4 md:w-[480px] md:min-h-[229px]`}
      >
        <p className="text-[#ea5555] text-lg font-semibold">
          Delete this task?
        </p>
        <p className="text-[#828FA3]">
          Are you sure you want to delete &quot;{taskToDelete?.title}&quot; task
          and its subtasks? This action cannot be reversed.
        </p>
        <div className="flex flex-col gap-4 md:flex-row">
          <Button
            style="bg-[#ea5555] text-white rounded-full py-2 md:w-[200px]"
            onClick={() => {
              deleteTask(taskToDelete?.id as number);
              notify();
              dispatch(setShowDeleteTask());
            }}
          >
            Delete
          </Button>
          <Button
            style="bg-[#e4ebfa] py-2 rounded-full text-[#635fc7] md:w-[200px]"
            onClick={() => dispatch(setShowDeleteTask())}
          >
            Cancel
          </Button>
        </div>
      </section>
    </>
  );
};

export default DeleteTask;
