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

    // handle drag events for columns
    if (type === "column") {
      const entries = Array.from(data);
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const reorderedColumns = entries;
      setData(reorderedColumns);
    }

    const columns = Array.from(data);
    const startColumnIndex = columns.find(
      (column) => column.name === source.droppableId
    )?.id;
    const finishColumnIndex = columns.find(
      (column) => column.name === destination.droppableId
    )?.id;

    if (!startColumnIndex || !finishColumnIndex) return;
    if (
      source.index === destination.index &&
      startColumnIndex === finishColumnIndex
    )
      return;

    const startColumn = data[startColumnIndex - 1];
    const finishColumn = data[finishColumnIndex - 1];
    if (startColumn === finishColumn) {
      // within the same column
      const newTasks = Array.from(startColumn.tasks);
      const [movedTask] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, movedTask);
      const newColumn = {
        ...startColumn,
        tasks: newTasks,
      };

      setData(
        data.map((column) =>
          column.id === newColumn.id
            ? { ...column, tasks: newColumn.tasks }
            : column
        )
      );
    } else {
      const startTask = Array.from(startColumn.tasks);
      const [movedTask] = startTask.splice(source.index, 1);
      const newStartColumn = {
        ...startColumn,
        tasks: startTask,
      };
      const newFinishTask = Array.from(finishColumn.tasks);
      newFinishTask.splice(destination.index, 0, {
        ...movedTask,
        columnId: finishColumn.id,
        status: finishColumn.name,
      });
      const newFinishColumn = {
        ...finishColumn,
        tasks: newFinishTask,
      };

      setData((prevData) =>
        prevData.map((column) => {
          if (column.id === newStartColumn.id) {
            return { ...column, tasks: newStartColumn.tasks };
          } else if (column.id === newFinishColumn.id) {
            return { ...column, tasks: newFinishColumn.tasks };
          } else {
            return column;
          }
        })
      );
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="column" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`${
              lightTheme
                ? "bg-[#F4F7FD] text-[#000112]"
                : "bg-[#20212c] text-white"
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

              {provided.placeholder}
            </Suspense>
            <NewColumnClient />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ListContainer;
