"use client";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { Draggable } from "@hello-pangea/dnd";
import { Subtask } from "@prisma/client";
import { Task } from "@/lib/models";
import { deleteTask } from "@/app/actions";
import { setShowDeleteTask, setTask } from "@/lib/features/task/taskSlice";
// interface Task {
//   id: number;
//   title: string;
//   description: string | null;
//   status: string;
//   columnId: number;
//   [key: string]: any;
// }
interface TaskClientProps {
  children: React.ReactNode;
  index: number;
  item: Task;
  subtask: Subtask[];
}
const TaskClient = ({ children, index, item, subtask }: TaskClientProps) => {
  const dispatch = useAppDispatch();
  const lightTheme = useAppSelector((state) => state.theme.lightTheme);

  return (
    <Draggable draggableId={item.id.toString()} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={() => {
            dispatch(setShowDeleteTask());
            dispatch(setTask(item));
          }}
          role="button"
          className={`${
            lightTheme ? "bg-white" : "bg-[#2B2C37]"
          } min-h-[5.5rem] task-item flex px-4 py-4 active:animate-pulse active:cursor-grabbing cursor-grab`}
        >
          <article className={`flex flex-col`}>{children}</article>
        </li>
      )}
    </Draggable>
  );
};

export default TaskClient;
