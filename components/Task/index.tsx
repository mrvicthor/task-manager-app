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
    <>
      <p>{title}</p>
      <p className="text-xs text-[#828FA3] mt-2">{subtask.length} subtasks</p>
    </>
  );
};

export default Task;
