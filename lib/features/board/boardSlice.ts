import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Column, Task } from "@prisma/client";

export interface BoardState {
  name: string;
  showBoard: boolean;
  showMobileBoard: boolean;
  columns: Column[];
  tasks: Task[];
}

const initialState: BoardState = {
  name: "",
  showBoard: false,
  showMobileBoard: false,
  columns: [],
  tasks: [],
};

export const BoardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    toggleBoard: (state) => {
      state.showBoard = !state.showBoard;
    },
    setBoardSelected: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    toggleMobileBoard: (state) => {
      state.showMobileBoard = !state.showMobileBoard;
    },
    setColumns: (state, action: PayloadAction<Column[]>) => {
      state.columns = action.payload;
    },
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
  },
});

export const {
  toggleBoard,
  setBoardSelected,
  toggleMobileBoard,
  setColumns,
  setTasks,
} = BoardSlice.actions;
export default BoardSlice.reducer;
