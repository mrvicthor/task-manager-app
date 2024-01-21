export type Board = {
  id?: number;
  name: string;
  columns: Column[];
};

export type Column = {
  id?: number;
  name: string;
  tasks: Task[];
};

export type Task = {
  id?: number;
  title: string;
  description?: string;
  status: string;
  subtasks?: Subtask[];
};

export type Subtask = {
  id?: number;
  title: string;
  isCompleted: boolean;
};
