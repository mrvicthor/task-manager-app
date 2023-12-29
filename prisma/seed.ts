import { PrismaClient } from "@prisma/client";
import data from "../lib/data";

const prisma = new PrismaClient();

async function seed() {
  for (const board of data.boards) {
    const createdBoard = await prisma.board.create({
      data: { name: board.name },
    });

    for (const column of board.columns) {
      const createdColumn = await prisma.column.create({
        data: { name: column.name, boardId: createdBoard.id },
      });

      for (const task of column.tasks) {
        const createdTask = await prisma.task.create({
          data: {
            title: task.title,
            description: task.description,
            status: task.status,
            columnId: createdColumn.id,
          },
        });

        for (const subtask of task.subtasks) {
          await prisma.subtask.create({
            data: {
              title: subtask.title,
              isCompleted: subtask.isCompleted,
              taskId: createdTask.id,
            },
          });
        }
      }
    }
  }
}

seed()
  .catch((error) => {
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
