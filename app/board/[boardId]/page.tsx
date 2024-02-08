import prisma from "@/lib/prisma";
import React from "react";
import ListContainer from "./_components/ListContainer";

interface Task {
  id: number;
  title: string;
  description: string | null;
  status: string;
  columnId: number;
  [key: string]: any;
}

const BoardDetails = async ({ params }: { params: { boardId: string } }) => {
  // const tasks = await prisma.task.findMany({
  //   where: {
  //     column: {
  //       boardId: Number(params?.boardId),
  //     },
  //   },
  // });

  const board = await prisma.board.findUnique({
    where: {
      id: Number(params?.boardId),
    },
  });

  const columns = await prisma.column.findMany({
    where: {
      boardId: Number(params?.boardId),
    },
    include: {
      tasks: true,
    },
  });

  // const filterTasksByStatus: Record<string, Task[]> = tasks.reduce(
  //   (acc: Record<string, Task[]>, task) => {
  //     const status = task.status || "";
  //     acc[status] = [...(acc[status] || []), task];
  //     return acc;
  //   },
  //   {}
  // );

  const subtasks = await prisma.subtask.findMany();

  return <ListContainer board={board} columns={columns} subtasks={subtasks} />;
};
export default BoardDetails;
