import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface BoardState {
  name: string;
  showBoard: boolean;
}

const initialState: BoardState = {
  name: "",
  showBoard: false,
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
  },
});

export const { toggleBoard, setBoardSelected } = BoardSlice.actions;
export default BoardSlice.reducer;
