import prisma from "@/lib/prisma";
import { BoardDetailsClient } from "@/components";

const BoardDetails = async ({ params }: { params: { boardId: string } }) => {
  const tasks = await prisma.task.findMany({
    where: {
      column: {
        boardId: Number(params?.boardId),
      },
    },
  });

  return (
    <BoardDetailsClient>
      <>
        {tasks.map((task) => (
          <p key={task.id}>{task.title}</p>
        ))}
      </>
    </BoardDetailsClient>
  );
};
export default BoardDetails;
