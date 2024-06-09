import prisma from "@/lib/prisma";
const getData = async (id: number) => {
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
};

export default getData;
