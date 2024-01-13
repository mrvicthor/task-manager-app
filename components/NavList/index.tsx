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
        boardName === `${board.name}`
          ? "active text-white w-[240px] l:w-[276px]"
          : "text-[#828fa3]"
      } flex items-center gap-x-4 px-8 cursor-pointer`}
      onClick={() => dispatch(setBoardSelected(board.name))}
    >
      <div>
        <Image
          src={`${
            boardName === board.name
              ? "./assets/icon-board-white.svg"
              : "./assets/icon-board.svg"
          }`}
          alt="board-icon"
          height={16}
          width={16}
        />
      </div>
      <div>
        <p className="font-bold capitalize text-[15px]">{board.name}</p>
      </div>
    </li>
  );
};

export default NavList;
