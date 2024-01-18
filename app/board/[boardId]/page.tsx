import prisma from "@/lib/prisma";
import { BoardDetailsClient, TaskClient, Task } from "@/components";

const BoardDetails = async ({ params }: { params: { boardId: string } }) => {
  const tasks = await prisma.task.findMany({
    where: {
      column: {
        boardId: Number(params?.boardId),
      },
    },
  });
  const todos = tasks.filter((task) => task.status === "Todo");
  const doing = tasks.filter((task) => task.status === "Doing");
  const done = tasks.filter((task) => task.status === "Done");

  return (
    <BoardDetailsClient>
      <section className="px-6">
        <div className="grid task-column-wrapper gap-6 pt-6">
          <section className="flex flex-col gap-5">
            <div className="flex items-center gap-2 font-bold text-xs text-[#828FA3]">
              <div className="bg-[#49C4E5] h-[15px] w-[15px] rounded-full" />
              <h2 className="uppercase">Todo ({todos.length})</h2>
            </div>
            {todos.map((todo) => (
              <TaskClient key={todo.id}>
                <Task title={todo.title} />
              </TaskClient>
            ))}
          </section>
          <section className="flex flex-col gap-5">
            <div className="flex items-center gap-2 font-bold text-xs text-[#828FA3]">
              <div className="bg-[#8471F2] h-[15px] w-[15px] rounded-full" />
              <h2 className="uppercase">Doing ({doing.length})</h2>
            </div>
            {doing.map((item) => (
              <TaskClient key={item.id}>
                <Task title={item.title} />
              </TaskClient>
            ))}
          </section>
          <section className="flex flex-col gap-5">
            <div className="flex items-center gap-2 font-bold text-xs text-[#828FA3]">
              <div className="bg-[#67E2AE] h-[15px] w-[15px] rounded-full" />
              <h2 className="uppercase">Done ({done.length})</h2>
            </div>
            {done.map((item) => (
              <TaskClient key={item.id}>
                <Task title={item.title} />
              </TaskClient>
            ))}
          </section>
        </div>
      </section>
    </BoardDetailsClient>
  );
};
export default BoardDetails;
