import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/theme/themeSlice";
import sidebarReducer from "./features/sidebar/sidebarSlice";
import boardReducer from "./features/board/boardSlice";
import taskReducer from "./features/task/taskSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      board: boardReducer,
      theme: themeReducer,
      sidebar: sidebarReducer,
      task: taskReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
