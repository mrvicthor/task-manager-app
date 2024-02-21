import prisma from "@/lib/prisma";
import React, { Suspense } from "react";
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
  const board = await prisma.board.findUnique({
    where: {
      id: Number(params?.boardId),
    },
    include: {
      columns: true,
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

  const subtasks = await prisma.subtask.findMany();

  return <ListContainer board={board} columns={columns} subtasks={subtasks} />;
};
export default BoardDetails;
