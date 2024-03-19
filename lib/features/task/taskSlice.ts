import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Task } from "@/lib/models";
export interface CreateTaskState {
  showForm: boolean;
  showDeleteTask: boolean;
  task: Task | null;
}

const initialState: CreateTaskState = {
  showForm: false,
  showDeleteTask: false,
  task: null,
};

export const CreateTaskSlice = createSlice({
  name: "createTask",
  initialState,
  reducers: {
    toggleTaskForm: (state) => {
      state.showForm = !state.showForm;
    },
    setShowDeleteTask: (state) => {
      state.showDeleteTask = !state.showDeleteTask;
    },
    setTask: (state, action: PayloadAction<Task>) => {
      state.task = action.payload;
    },
  },
});

export const { toggleTaskForm, setShowDeleteTask, setTask } =
  CreateTaskSlice.actions;
export default CreateTaskSlice.reducer;
