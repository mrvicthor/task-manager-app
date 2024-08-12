"use client";
import {
  toggleModal,
  toggleDeleteModal,
} from "@/lib/features/board/boardSlice";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";

type ModalProps = {
  boardId: number;
};
const ModalBoard = ({ boardId }: ModalProps) => {
  const dispatch = useAppDispatch();
  const lightTheme = useAppSelector((state) => state.theme.lightTheme);

  const toggleBoardModal = () => {
    console.log("toggleBoardModal");
    dispatch(toggleModal());
    dispatch(toggleDeleteModal());
  };
  return (
    <section
      className={`${
        lightTheme ? "bg-[#ffffff]" : "bg-[#20212c]"
      } absolute flex flex-col -top-[4px] gap-5 rounded-lg right-[1.5rem] z-[1000000] w-[12rem] h-[5.875rem] p-4`}
    >
      <p aria-roledescription="button" className="capitalize text-sm w-[50%]">
        edit board
      </p>
      <p
        aria-roledescription="button"
        className="capitalize text-sm text-red-500 w-[70%]"
        onClick={toggleBoardModal}
      >
        delete board
      </p>
    </section>
  );
};

export default ModalBoard;
