"use client";
import { useEffect, Suspense, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { setBoardSelected } from "@/lib/features/board/boardSlice";
import { Board, Subtask } from "@prisma/client";
import Column from "./Column";
import { NewColumnClient } from "@/components";
import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd";

interface DetailsProps {
  board: Board | null;
  columns: Column[];
  subtasks: Subtask[];
}

interface Column {
  id: number;
  boardId: number;
  name: string;
  tasks: Task[];
}

interface Task {
  id: number;
  columnId: number;
  status: string;
  description: string | null;
  title: string;
}

const ListContainer = ({ board, columns, subtasks }: DetailsProps) => {
  const lightTheme = useAppSelector((state) => state.theme.lightTheme);
  const showSidebar = useAppSelector((state) => state.sidebar.hideSidebar);
  // const data = useAppSelector((state) => state.board.columns);
  const [data, setData] = useState<Column[]>(columns);
  const [tasks, setTasks] = useState<Task[]>([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const todos = useAppSelector((state) => state.board.tasks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (board) {
      dispatch(setBoardSelected(board?.name));
    }
  }, [board, dispatch]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    console.log(source.droppableId, destination.droppableId);
    const start = data[Number(source.droppableId)];
    const finish = data[Number(destination.droppableId)];
    console.log(start, finish);
    if (start === finish) {
      const newTasks = Array.from(start.tasks);
      const [movedTask] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, movedTask);
      const newColumn = {
        ...start,
        tasks: newTasks,
      };
      setData(
        data.map((column) =>
          column.id === newColumn.id
            ? { ...column, tasks: newColumn.tasks }
            : column
        )
      );
      return;
    }

    // Moving from one list to another column
    const startTasks = Array.from(start.tasks);
    const [movedTask] = startTasks.splice(source.index, 1);
    const newTasks = {
      ...start,
      tasks: startTasks,
    };
    const finishTasks = Array.from(finish.tasks);
    finishTasks.splice(destination.index, 0, {
      ...movedTask,
      columnId: finish.id,
      status: finish.name,
    });
    const newFinish = {
      ...finish,
      tasks: finishTasks,
    };

    setData((prevData) =>
      prevData.map((column) => {
        if (column.id === newTasks.id) {
          return { ...column, tasks: newTasks.tasks };
        } else if (column.id === newFinish.id) {
          return { ...column, tasks: newFinish.tasks };
        } else {
          return column;
        }
      })
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ol
        className={`${
          lightTheme ? "bg-[#F4F7FD] text-[#000112]" : "bg-[#20212c] text-white"
        }  ${
          showSidebar ? "md:translate-x-[18.75rem]" : "translate-x-0"
        } sidebar h-[100vh] min-w-[1440px] mt-16 overflow-x-auto flex gap-6 pl-6`}
      >
        <Suspense fallback={<p>Loading columns</p>}>
          <div className="gap-6 pt-6 flex">
            {data.map((column, index) => {
              return (
                <Column
                  key={column.id}
                  id={column.id}
                  status={column.name}
                  data={column.tasks}
                  subtask={subtasks}
                  index={index}
                />
              );
            })}
          </div>
        </Suspense>
        <NewColumnClient />
      </ol>
    </DragDropContext>
  );
};

export default ListContainer;
