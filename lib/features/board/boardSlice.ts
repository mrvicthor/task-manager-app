import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface BoardState {
  name: string;
  showBoard: boolean;
  showMobileBoard: boolean;
  draggingTask: null | string;
}

const initialState: BoardState = {
  name: "",
  draggingTask: null,
  showBoard: false,
  showMobileBoard: false,
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
    setDraggingTask: (state, action: PayloadAction<string | null>) => {
      state.draggingTask = action.payload;
    },
  },
});

export const {
  toggleBoard,
  setBoardSelected,
  toggleMobileBoard,
  setDraggingTask,
} = BoardSlice.actions;
export default BoardSlice.reducer;
