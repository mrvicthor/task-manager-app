"use server";
import { schema } from "@/lib/formSchema";
import prisma from "@/lib/prisma";
import { Subtask } from "@/lib/models";
import { revalidatePath } from "next/cache";
export type FormState = {
  message: string;
};

function formDataToJson(formData: FormData): Record<string, any> {
  const data: Record<string, any> = {};

  const parseValue = (value: string) => {
    const lower = value.toLowerCase();
    return lower === "true" ? true : lower === "false" ? false : value;
  };

  formData.forEach((value, key) => {
    const keys = key.split(".");
    const lastKey = keys.pop()!;
    let current = data;
    keys.forEach((k, index) => {
      current = current[k] ??= /^\d+$/.test(keys[index + 1]) ? [] : {};
    });
    current[lastKey] = Array.isArray(current[lastKey])
      ? [...current[lastKey], parseValue(value as string)]
      : parseValue(value as string);
  });

  return data;
}

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
  const updatedColumn = await prisma.column.update({
    where: {
      id: tasks.find((item) => item.status === formData.status)
        ?.columnId as number,
    },
    data: {
      tasks: { connect: { id: task.id } },
    },
  });
  // revalidatePath("/", "layout");
  revalidatePath(`/board/${columnId}`, "page");
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
    revalidatePath("/board/[boardId]", "page");
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
    // Retrieve the task object from the database
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
      include: {
        subtasks: true,
      },
    });

    // Find the index of the subtask to update
    const subtaskIndex = task?.subtasks.findIndex(
      (subtask) => subtask.id === subtaskId
    );
    if (subtaskIndex === -1) {
      throw new Error("Subtask not found");
    }
    if (task && subtaskIndex) {
      task.subtasks[subtaskIndex] = {
        ...task.subtasks[subtaskIndex],
        ...updatedSubtaskData,
      };
    }

    // Save the updated task object back to the database
    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        subtasks: {
          set: task?.subtasks,
        },
      },
    });
    return updatedTask;
  } catch (error) {
    console.error("Error updating subtask:", error);
    throw error;
  }
}
