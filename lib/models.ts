interface Columns {
  id: number;
  name: string;
  boardId: number;
}
export interface Board {
  id: number;
  name: string;
  columns: Columns[];
}

// Define the Column model
export interface Column {
  id: number;
  boardId: number;
  name: string;
  tasks: Task[];
}

// Define the Task model
export interface Task {
  id: number;
  columnId: number;
  title: string;
  description: string | null;
  status: string;
  // subtasks: Subtask[];
}

// Define the Subtask model
export interface Subtask {
  id: number;
  title: string;
  isCompleted: boolean;
  taskId: number;
}

type TaskStatus = "Todo" | "Doing" | "Done";

export interface TaskProps {
  id: number;
  columnId: number;
  title: string;
  description: string | null;
  status: TaskStatus;
  subtasks: Subtask[];
}
