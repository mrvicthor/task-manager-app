"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import { Board } from "@prisma/client";
import { setBoardSelected } from "@/lib/features/board/boardSlice";

interface NavProps {
  board: Board;
}

const NavList = ({ board }: NavProps) => {
  const dispatch = useAppDispatch();
  const boardName = useAppSelector((state) => state.board.name);

  return (
    <li
      key={board.id}
      className={`${
        boardName === `${board.name}` ? "active" : ""
      } flex items-center gap-x-4 px-8 cursor-pointer`}
      onClick={() => dispatch(setBoardSelected(board.name))}
    >
      <div>
        <Image
          src="./assets/icon-board.svg"
          alt="board-icon"
          height={16}
          width={16}
        />
      </div>
      <div>
        <p className="font-bold capitalize text-[#828fa3] text-[15px]">
          {board.name}
        </p>
      </div>
    </li>
  );
};

export default NavList;
