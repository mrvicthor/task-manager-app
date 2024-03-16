"use client";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { Form } from "..";
import { toggleTaskForm } from "@/lib/features/task/taskSlice";

const CreateTask = () => {
  const dispatch = useAppDispatch();
  const showForm = useAppSelector((state) => state.task.showForm);
  const lightTheme = useAppSelector((state) => state.theme.lightTheme);
  const boardId = useAppSelector((state) => state.board.boards?.id);
  const columnId = useAppSelector((state) => state.board);

  console.log(columnId, "column");

  const hideFormToggle = () => {
    document.body.style.overflow = "auto";
    dispatch(toggleTaskForm());
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
            } absolute mx-auto top-[20px] min-h-[659px] w-[90%] left-[16px] right-[16px] z-[10000] rounded-lg px-6 py-6`}
          >
            <p className="font-bold capitalize">add new task</p>
            <Form boardId={boardId as number} />
          </section>
        </>
      ) : null}
    </>
  );
};

export default CreateTask;
