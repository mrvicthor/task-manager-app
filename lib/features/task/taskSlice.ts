import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Task, Subtask } from "@/lib/models";
export interface CreateTaskState {
  showForm: boolean;
  showDeleteTask: boolean;
  showTaskDetails: boolean;
  task: Task | null;
  subtask: Subtask[] | null;
}

const initialState: CreateTaskState = {
  showForm: false,
  showDeleteTask: false,
  showTaskDetails: false,
  task: null,
  subtask: null,
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
    setShowTaskDetails: (state) => {
      state.showTaskDetails = !state.showTaskDetails;
    },
    setTask: (state, action: PayloadAction<Task>) => {
      state.task = action.payload;
    },
    setSubtask: (state, action: PayloadAction<Subtask[]>) => {
      state.subtask = action.payload;
    },
  },
});

export const {
  toggleTaskForm,
  setShowDeleteTask,
  setTask,
  setShowTaskDetails,
  setSubtask,
} = CreateTaskSlice.actions;
export default CreateTaskSlice.reducer;
