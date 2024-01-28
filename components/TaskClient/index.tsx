"use client";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { setDraggingTask } from "@/lib/features/board/boardSlice";
import { Draggable } from "@hello-pangea/dnd";
interface Task {
  id: number;
  title: string;
  description: string | null;
  status: string;
  columnId: number;
  [key: string]: any;
}
interface TaskClientProps {
  children: React.ReactNode;
  index: number;
  item: Task;
}
const TaskClient = ({ children, index, item }: TaskClientProps) => {
  const lightTheme = useAppSelector((state) => state.theme.lightTheme);
  const dispatch = useAppDispatch();
  const handleDragging = (value: string) => {
    console.log(`dragging ${value}`);
    dispatch(setDraggingTask(value));
  };
  return (
    <Draggable draggableId={item.id.toString()} index={index}>
      {(provided) => (
        <section
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          className={`${
            lightTheme ? "bg-white" : "bg-[#2B2C37]"
          } min-h-[5.5rem] task-item flex px-4 py-4 active:animate-pulse active:cursor-grabbing cursor-grab`}
        >
          <article className={`flex flex-col`}>{children}</article>
        </section>
      )}
    </Draggable>
  );
};

export default TaskClient;
