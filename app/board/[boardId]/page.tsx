import prisma from "@/lib/prisma";
import {
  BoardDetailsClient,
  DropArea,
  StatusCircle,
  TaskClient,
  Task,
} from "@/components";
import React from "react";

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
      <div className="gap-6 pt-6 flex">
        {Object.entries(filterTasksByStatus).map(([status, tasksForStatus]) => (
          <div className="" key={status}>
            <div className="flex items-center gap-2 mb-6 font-bold text-xs text-[#828FA3]">
              <StatusCircle status={status} />
              <h2 className="uppercase">
                {status} ({tasksForStatus.length})
              </h2>
            </div>

            <DropArea>
              {tasksForStatus.map((item, index) => (
                <React.Fragment key={item.id}>
                  <TaskClient index={index} item={item}>
                    <Task title={item.title} id={item.id} />
                  </TaskClient>
                </React.Fragment>
              ))}
            </DropArea>
          </div>
        ))}
      </div>
    </BoardDetailsClient>
  );
};
export default BoardDetails;
