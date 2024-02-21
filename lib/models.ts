export interface Board {
  id: number;
  name: string;
  columns: Column[];
}

// Define the Column model
export interface Column {
  id: number;
  name: string;
  tasks: Task[];
}

// Define the Task model
export interface Task {
  id: number;
  title: string;
  description?: string;
  status: string;
  subtasks: Subtask[];
}

// Define the Subtask model
export interface Subtask {
  id: number;
  title: string;
  isCompleted: boolean;
}
