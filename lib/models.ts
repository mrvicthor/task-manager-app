export type Board = {
  id?: number;
  name: string;
  columns: Column[];
};

export type Column = {
  id?: number;
  boardId: number;
  name: string;
  tasks: Task[];
};

export type Task = {
  id: number;
  title: string;
  description: string | null;
  status: string;
  columnId: number;
  subtasks?: Subtask[];
};

export type Subtask = {
  id?: number;
  title: string;
  isCompleted: boolean;
};
