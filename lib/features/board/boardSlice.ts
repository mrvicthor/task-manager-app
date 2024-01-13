import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface BoardState {
  name: string;
  showBoard: boolean;
  showMobileBoard: boolean;
}

const initialState: BoardState = {
  name: "",
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
  },
});

export const { toggleBoard, setBoardSelected, toggleMobileBoard } =
  BoardSlice.actions;
export default BoardSlice.reducer;
