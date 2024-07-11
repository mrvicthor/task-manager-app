import prisma from "@/lib/prisma";

// Custom order array
const customOrder = ["Todo", "Doing", "Done"];

function sortColumnsByCustomOrder(columns: any) {
  return columns.sort(
    (a: any, b: any) =>
      customOrder.indexOf(a.name) - customOrder.indexOf(b.name)
  );
}

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
  const sortedColumns = sortColumnsByCustomOrder(columns);
  const subtasks = await prisma.subtask.findMany();

  return { board, sortedColumns, subtasks };
};

export default getData;
