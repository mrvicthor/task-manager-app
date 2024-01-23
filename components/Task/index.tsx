import prisma from "@/lib/prisma";
interface TaskProps {
  title: string;
  id: number;
}

const Task = async ({ title, id }: TaskProps) => {
  const subtask = await prisma.subtask.findMany({
    where: {
      taskId: id,
    },
  });

  return (
    <article className="flex flex-col">
      <p>{title}</p>
      <p className="text-xs text-[#828FA3]">{subtask.length}</p>
    </article>
  );
};

export default Task;
