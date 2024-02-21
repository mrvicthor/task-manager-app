import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Column, Task } from "@prisma/client";
import { Board } from "@/lib/models";

export interface BoardState {
  name: string;
  showBoard: boolean;
  showMobileBoard: boolean;
  columns: Column[];
  tasks: Task[];
  boards: Board[];
}

const initialState: BoardState = {
  name: "",
  boards: [],
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
    setBoard: (state, action: PayloadAction<Board[]>) => {
      state.boards = action.payload;
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
  setBoard,
} = BoardSlice.actions;
export default BoardSlice.reducer;
