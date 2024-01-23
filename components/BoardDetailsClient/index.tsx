"use client";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { setBoardSelected } from "@/lib/features/board/boardSlice";
import { Board } from "@prisma/client";

interface DetailsProps {
  children: React.ReactNode;
  board: Board | null;
}

const BoardDetailsClient = ({ children, board }: DetailsProps) => {
  const lightTheme = useAppSelector((state) => state.theme.lightTheme);
  const showSidebar = useAppSelector((state) => state.sidebar.hideSidebar);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (board) {
      dispatch(setBoardSelected(board?.name));
    }
  }, [board, dispatch]);

  return (
    <section
      className={`${
        lightTheme ? "bg-[#F4F7FD] text-[#000112]" : "bg-[#20212c] text-white"
      }  ${
        showSidebar ? "md:translate-x-[18.75rem]" : "translate-x-0"
      } sidebar h-[100vh] min-w-[1440px] mt-16 overflow-x-auto`}
    >
      {children}
    </section>
  );
};

export default BoardDetailsClient;
