"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../lib/store";
import { toggleTheme } from "../lib/features/theme/themeSlice";
import {
  toggleBoard,
  setBoardSelected,
} from "../lib/features/board/boardSlice";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
    storeRef.current.dispatch(toggleTheme());
    storeRef.current.dispatch(setBoardSelected("Platform Launch"));
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}
