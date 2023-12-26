import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../lib/features/theme/themeSlice";
import sidebarReducer from "../lib/features/sidebar/sidebarSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      theme: themeReducer,
      sidebar: sidebarReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
