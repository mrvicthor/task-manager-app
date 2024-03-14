import { z } from "zod";

const Subtask = z.object({
  title: z.string(),
  isCompleted: z.boolean().default(false),
});

export const schema = z.object({
  title: z.string().trim().min(3, { message: "title is required" }),
  description: z.optional(z.string()),
  subtasks: z.optional(z.array(Subtask)),
  status: z.enum(["Todo", "Doing", "Done"]).default("Todo"),
});
