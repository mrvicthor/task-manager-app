"use client";

import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import UseBoardForm from "../UseBoardForm";
import { toggleBoardForm, toggleEdit } from "@/lib/features/board/boardSlice";
import { Board } from "@/lib/models";

const EditBoard = () => {
  const dispatch = useAppDispatch();
  const lightTheme = useAppSelector((state) => state.theme.lightTheme);
  const formIsVisible = useAppSelector((state) => state.board.isEditingBoard);
  const board = useAppSelector((state) => state.board.boards) as Board;
  const hideFormToggle = () => {
    document.body.style.overflow = "auto";
    dispatch(toggleBoardForm());
    dispatch(toggleEdit());
  };
  return (
    <>
      {formIsVisible ? (
        <>
          <div
            onClick={hideFormToggle}
            className="fixed top-0 left-0 right-0 bottom-0 z-[9999] size-full bg-[#000] opacity-50 cursor-pointer"
          />
          <div
            className={`${
              lightTheme ? "bg-[#ffffff]" : "bg-[#2b2c37]"
            } absolute mx-auto top-[20px] min-h-[343px] w-[90%] left-[16px] right-[16px] z-[10000] rounded-lg px-6 py-6 md:w-[480px] md:top-[80px]`}
          >
            <h3 className="capitalize">edit board</h3>
            <UseBoardForm board={board} />
          </div>
        </>
      ) : null}
    </>
  );
};

export default EditBoard;
