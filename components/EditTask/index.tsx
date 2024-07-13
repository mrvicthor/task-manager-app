"use client";
import { useParams } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { Form } from "..";
import { toggleEditTaskForm } from "@/lib/features/task/taskSlice";
import { TaskProps } from "@/lib/models";

const EditTask = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const showForm = useAppSelector((state) => state.task.showEditTask);
  const lightTheme = useAppSelector((state) => state.theme.lightTheme);
  const { task } = useAppSelector((state) => state.task);
  const subtasks = useAppSelector((state) => state.task.subtask);
  const taskToEdit = { ...task, subtasks } as TaskProps;

  const hideFormToggle = () => {
    document.body.style.overflow = "auto";
    dispatch(toggleEditTaskForm());
  };

  return (
    <>
      {showForm ? (
        <>
          <div
            onClick={hideFormToggle}
            className="fixed top-0 left-0 right-0 bottom-0 z-[9999] size-full bg-[#000] opacity-50 cursor-pointer"
          />
          <section
            className={`${
              lightTheme ? "bg-[#ffffff]" : "bg-[#2b2c37]"
            } absolute mx-auto top-[20px] min-h-[659px] w-[90%] left-[16px] right-[16px] z-[10000] rounded-lg px-6 py-6 md:w-[480px] md:top-[40px]`}
          >
            <p className="font-bold capitalize">edit task</p>
            <Form columnId={Number(params.boardId)} taskData={taskToEdit} />
          </section>
        </>
      ) : null}
    </>
  );
};

export default EditTask;