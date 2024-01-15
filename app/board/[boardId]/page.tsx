import prisma from "@/lib/prisma";

const BoardDetails = async ({ params }: { params: { boardId: string } }) => {
  const tasks = await prisma.task.findMany({
    where: {
      column: {
        boardId: Number(params?.boardId),
      },
    },
  });

  return (
    <section className="mt-16">
      {tasks.map((task) => (
        <p key={task.id}>{task.title}</p>
      ))}
    </section>
  );
};
export default BoardDetails;
