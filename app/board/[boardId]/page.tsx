import prisma from "@/lib/prisma";
import {
  BoardDetailsClient,
  NewColumnClient,
  StatusCircle,
  TaskClient,
  Task,
} from "@/components";

interface Task {
  id: number;
  title: string;
  description: string | null;
  status: string;
  columnId: number;
  [key: string]: any;
}

const BoardDetails = async ({ params }: { params: { boardId: string } }) => {
  const tasks = await prisma.task.findMany({
    where: {
      column: {
        boardId: Number(params?.boardId),
      },
    },
  });

  const board = await prisma.board.findUnique({
    where: {
      id: Number(params?.boardId),
    },
  });

  const filterTasksByStatus: Record<string, Task[]> = tasks.reduce(
    (acc: Record<string, Task[]>, task) => {
      const status = task.status || "";
      acc[status] = [...(acc[status] || []), task];
      return acc;
    },
    {}
  );

  return (
    <BoardDetailsClient board={board}>
      <div className="task-column-wrapper gap-6 pt-6 flex px-6">
        {Object.entries(filterTasksByStatus).map(([status, tasksForStatus]) => (
          <section
            key={status}
            className="flex flex-col  gap-5 min-w-[280px] max-w-[280px]"
          >
            <div className="flex items-center gap-2 font-bold text-xs text-[#828FA3]">
              <StatusCircle status={status} />
              <h2 className="uppercase">
                {status} ({tasksForStatus.length})
              </h2>
            </div>
            {tasksForStatus.map((item) => (
              <TaskClient key={item.id}>
                <Task title={item.title} id={item.id} />
              </TaskClient>
            ))}
          </section>
        ))}
        <NewColumnClient />
      </div>
    </BoardDetailsClient>
  );
};
export default BoardDetails;
