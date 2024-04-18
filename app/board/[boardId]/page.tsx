import prisma from "@/lib/prisma";
import React, { Suspense, cache } from "react";
import ListContainer from "./_components/ListContainer";

interface Task {
  id: number;
  title: string;
  description: string | null;
  status: string;
  columnId: number;
  [key: string]: any;
}
const getData = cache(async (id: number) => {
  const board = await prisma.board.findUnique({
    where: {
      id,
    },
    include: {
      columns: true,
    },
  });

  const columns = await prisma.column.findMany({
    where: {
      boardId: id,
    },
    include: {
      tasks: true,
    },
  });

  const subtasks = await prisma.subtask.findMany();

  return { board, columns, subtasks };
});

const BoardDetails = async ({ params }: { params: { boardId: string } }) => {
  const { board, columns, subtasks } = await getData(Number(params.boardId));

  return <ListContainer board={board} columns={columns} subtasks={subtasks} />;
};

export default BoardDetails;
