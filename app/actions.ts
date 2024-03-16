"use server";
import { schema } from "@/lib/formSchema";
import prisma from "@/lib/prisma";
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
  boardId: number,
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = formDataToJson(data);
  const parsed = schema.safeParse(formData);
  console.log(formData, "test");
  if (!parsed.success) {
    return {
      message: "Invalid form data",
    };
  }
  try {
    const task = await prisma.task.create({
      data: {
        title: formData.title,
        description: formData.description,
        subtasks: formData.subtasks,
        status: formData.status,
        columnId: boardId,
      },
    });
  } catch (error) {}
  return { message: "New task created" };
}
