"use client";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import Column from "./Column";
import NewColumnClient from "../NewColumn";
import ModalBoard from "../ModalBoard";
import {
  setBoardSelected,
  setBoard,
  setColumns,
} from "@/lib/features/board/boardSlice";
import { Subtask } from "@prisma/client";
import { Board, Column as TColumn } from "@/lib/models";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface DetailsProps {
  board: Board | null;
  columns: TColumn[];
  subtasks: Subtask[];
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
  const isModalVisible = useAppSelector((state) => state.board.isModalOpen);
  const [data, setData] = useState<TColumn[]>(columns);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (board) {
      dispatch(setBoardSelected(board.name));
      dispatch(setColumns(columns));
      dispatch(setBoard(board));
    }
  }, [board, dispatch, columns]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const start = data[Number(source.droppableId)];
    const finish = data[Number(destination.droppableId)];
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
    <>
      <ToastContainer />
      {isModalVisible ? <ModalBoard boardId={board?.id as number} /> : null}
      <div
        className={`${
          lightTheme ? "bg-[#F4F7FD] text-[#000112]" : "bg-[#20212c] text-white"
        }  ${
          showSidebar ? "md:ml-[18.75rem]" : "ml-0"
        }  min-h-screen transition-transform duration-500 ease-in-out pt-16 overflow-x-auto pb-8`}
      >
        <DragDropContext key={+showSidebar} onDragEnd={onDragEnd}>
          <ol className={` flex gap-6 pl-6`}>
            <div className="gap-6 pt-6 flex">
              {data.map((column, index) => {
                return (
                  <Column
                    key={column.name}
                    id={column.id}
                    status={column.name}
                    data={column.tasks}
                    subtask={subtasks}
                    index={index}
                  />
                );
              })}
            </div>
            <NewColumnClient />
          </ol>
        </DragDropContext>
      </div>
    </>
  );
};

export default ListContainer;
