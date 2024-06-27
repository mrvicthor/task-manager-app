"use server";
import { schema } from "@/lib/formSchema";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";
import { formDataToJson } from "@/utils/formatDataToJson";
import { Subtask } from "@/lib/models";
import { revalidatePath, revalidateTag } from "next/cache";
import { Task } from "@/lib/models";
import { redirect } from "next/navigation";
export type FormState = {
  message: string;
};

export async function createTask(
  columnId: number,
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

  const tasks = await prisma.task.findMany();

  // Create a new task
  const task = await prisma.task.create({
    data: {
      title: formData.title,
      description: formData.description,
      subtasks: { create: formData.subtasks },
      status: formData.status,
      columnId: tasks.find((item) => item.status === formData.status)
        ?.columnId as number,
    },
  });

  // Optionally, update the column to include the new task
  await prisma.column.update({
    where: {
      id: tasks.find((item) => item.status === formData.status)
        ?.columnId as number,
    },
    data: {
      tasks: { connect: { id: task.id } },
    },
  });
  // revalidatePath("/board");
  revalidateTag("prisma-column");
  revalidatePath(`/board/${columnId}`);
  redirect(`/board/${columnId}`);
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
      await prisma.subtask.deleteMany({
        where: {
          taskId,
        },
      });
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
    const updatedTask = await prisma.subtask.update({
      where: {
        id: subtaskId,
      },
      data: {
        isCompleted: updatedSubtaskData.isCompleted,
      },
    });
    return updatedTask;
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
