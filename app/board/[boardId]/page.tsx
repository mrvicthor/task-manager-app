import prisma from "@/lib/prisma";
import { BoardDetailsClient, TaskClient, Task } from "@/components";

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

  const filterTasksByStatus: Record<string, Task[]> = tasks.reduce(
    (acc: Record<string, Task[]>, task) => {
      const status = task.status || "";
      acc[status] = [...(acc[status] || []), task];
      return acc;
    },
    {}
  );

  const getStatusColor = (status: string): string => {
    const colorMap: Record<string, string> = {
      Todo: "#49C4E5",
      Doing: "#8471F2",
      Done: "#67E2AE",
      // Add more status-color mappings as needed
    };
    return colorMap[status] || "#000"; // Default to black if no mapping found
  };
  return (
    <BoardDetailsClient>
      <div className="task-column-wrapper gap-6 pt-6 flex px-6">
        {Object.entries(filterTasksByStatus).map(([status, tasksForStatus]) => (
          <section
            key={status}
            className="flex flex-col  gap-5 min-w-[280px] max-w-[280px]"
          >
            <div className="flex items-center gap-2 font-bold text-xs text-[#828FA3]">
              <div
                className={`bg-[${getStatusColor(
                  status
                )}] h-[15px] w-[15px] rounded-full`}
              />
              <h2 className="uppercase">
                {status} ({tasksForStatus.length})
              </h2>
            </div>
            {tasksForStatus.map((item) => (
              <TaskClient key={item.id}>
                <Task title={item.title} />
              </TaskClient>
            ))}
          </section>
        ))}
      </div>
    </BoardDetailsClient>
  );
};
export default BoardDetails;
