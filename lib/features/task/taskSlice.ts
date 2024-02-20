import { createSlice } from "@reduxjs/toolkit";

export interface CreateTaskState {
  showForm: boolean;
}

const initialState: CreateTaskState = {
  showForm: false,
};

export const CreateTaskSlice = createSlice({
  name: "createTask",
  initialState,
  reducers: {
    toggleTaskForm: (state) => {
      state.showForm = !state.showForm;
    },
  },
});

export const { toggleTaskForm } = CreateTaskSlice.actions;
export default CreateTaskSlice.reducer;
