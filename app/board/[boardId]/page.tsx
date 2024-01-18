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

  console.log(tasks);

  return (
    <BoardDetailsClient>
      <section>
        <div className="grid task-column-wrapper"></div>
        {tasks.map((task) => (
          <p key={task.id}>{task.title}</p>
        ))}
      </section>
    </BoardDetailsClient>
  );
};
export default BoardDetails;
