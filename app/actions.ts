"use server";
import { schema, boardSchema } from "@/lib/formSchema";
import prisma from "@/lib/prisma";
import { formDataToJson } from "@/utils/formatDataToJson";
import { Subtask } from "@/lib/models";
import { revalidatePath } from "next/cache";
import { Task } from "@/lib/models";
export type FormState = {
  message: string;
};

export async function createTask(
  boardId: number,
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = formDataToJson(data);
  const parsed = schema.safeParse(formData);

  if (!parsed.success) {
    return {
      message: "Invalid form data",
    };
  }
  try {
    const column = await prisma.column.findFirst({
      where: {
        boardId: boardId,
        name: formData.status,
      },
    });

    if (!column) {
      throw new Error(
        `Column with status ${formData.status} not found on board ${boardId}`
      );
    }
    // Create a new task
    const task = await prisma.task.create({
      data: {
        title: formData.title,
        description: formData.description.trim(),
        subtasks: { create: formData.subtasks || [] },
        status: formData.status,
        columnId: column.id,
      },
    });

    // Optionally, update the column to include the new task
    await prisma.column.update({
      where: {
        id: column.id,
      },
      data: {
        tasks: { connect: { id: task.id } },
      },
    });
  } catch (error) {
    console.log(error);
  }

  return { message: "New task created" };
}

export async function deleteTask(taskId: number) {
  try {
    // find the task with the given id in the database
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
      include: { subtasks: true },
    });
    // check if the task exists, then delete it
    if (task) {
      // delete the subtask
      await prisma.subtask.deleteMany({
        where: {
          taskId,
        },
      });
      // delete the task
      await prisma.task.delete({
        where: {
          id: taskId,
        },
      });
    }
    revalidatePath(`/board`);
  } catch (error) {
    console.log("Error deleting task", error);
  }
}

export async function updateSubtask(
  taskId: number,
  subtaskId: number,
  updatedSubtaskData: Subtask
) {
  try {
    // Find the subtask with the given id and taskId in the database
    const subtask = await prisma.subtask.findFirst({
      where: {
        id: subtaskId,
        taskId,
      },
    });

    if (!subtask) {
      throw new Error(`Subtask with id ${subtaskId} for ${taskId} not found`);
    }
    // update task
    await prisma.subtask.update({
      where: {
        id: subtaskId,
      },
      data: {
        isCompleted: updatedSubtaskData.isCompleted,
      },
    });
  } catch (error) {
    console.error("Error updating subtask: ", error);
    throw error;
  }
}

export async function updateStatus(
  boardId: number,
  task: Task,
  newStatus: string
) {
  try {
    // Find the task to update the status
    const taskToUpdate = await prisma.task.findUnique({
      where: { id: task.id },
    });
    if (!taskToUpdate) {
      throw new Error(`Column for ${task.id} not found`);
    }

    // find the column to update
    const newColumnToUpdate = await prisma.column.findFirst({
      where: {
        boardId,
        name: newStatus,
      },
    });

    if (!newColumnToUpdate) {
      throw new Error(`Column with status ${newStatus} not found.`);
    }

    await prisma.task.update({
      where: { id: taskToUpdate?.id },
      data: {
        column: { connect: { id: newColumnToUpdate.id } },
        status: newStatus,
      },
    });
  } catch (error) {
    console.error("Error updating status:", error);
    throw error;
  }
}

export async function updateTask(
  taskId: number,
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = formDataToJson(data);
  const parsedData = schema.safeParse(formData);
  if (!parsedData.success) {
    throw new Error("Validation failed");
  }
  const { title, status, description, subtasks } = parsedData.data;
  try {
    // Check if task already exists
    const taskToUpdate = await prisma.task.findUnique({
      where: { id: taskId },
    });
    if (!taskToUpdate) {
      throw new Error(`Task with ID ${taskId} does not exist`);
    }

    // Check if the columnId exists

    const columnExists = await prisma.column.findFirst({
      where: { name: status },
    });

    if (!columnExists) {
      throw new Error(`Column with ID ${taskToUpdate.columnId} does not exist`);
    }

    const updateData: any = {
      title,
      status,
      description: description?.trim(),
      subtasks: subtasks
        ? {
            deleteMany: {},
            create: subtasks.map((subtask: any) => ({
              title: subtask.title,
              isCompleted: subtask.isCompleted,
            })),
          }
        : undefined,
      column: columnExists?.id
        ? { connect: { id: columnExists.id } }
        : undefined,
    };

    // Remove undefined fields to prevent Prisma errors
    Object.keys(updateData).forEach((key) => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });
    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: updateData,
    });
    return { message: "Task updated successfully", ...updatedTask };
  } catch (error) {
    console.error("Error updating task:", error);
    throw new Error("Failed to update task");
  }
}

export async function createBoard(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = formDataToJson(data);
  const parsed = boardSchema.safeParse(formData);

  if (!parsed.success) {
    return { message: "Invalid form data" };
  }
  try {
    await prisma.board.create({
      data: {
        name: formData.name,
        columns: { create: formData.columns || [] },
      },
    });
  } catch (error) {
    console.log("Failed to create board:", error);
  }

  return { message: "New Board created" };
}

export async function deleteBoard(boardId: number) {
  try {
    // find the board with the given id
    const board = await prisma.board.findUnique({
      where: { id: boardId },
      include: {
        columns: true,
      },
    });

    if (!board) {
      throw new Error(`Board with id ${boardId} for ${boardId} not found`);
    }
    // delete all the columns
    await prisma.column.deleteMany({
      where: {
        boardId,
      },
    });
    // delete the board
    await prisma.board.delete({
      where: {
        id: boardId,
      },
    });
    revalidatePath(`/board`);
  } catch (error) {
    console.log("Error deleting board", error);
  }
}
