import { z } from "zod";

const Subtask = z.object({
  title: z.string(),
  isCompleted: z.boolean().default(false),
});

const Column = z.object({
  id: z.optional(z.number()),
  name: z.string(),
});

export const schema = z.object({
  title: z.string().trim().min(3, { message: "title is required" }),
  description: z.optional(z.string()),
  subtasks: z.optional(z.array(Subtask)),
  status: z.enum(["Todo", "Doing", "Done"]).default("Done"),
});

export const boardSchema = z.object({
  name: z.string().trim().min(3, { message: "boardName is required" }),
  columns: z.optional(z.array(Column)),
});
