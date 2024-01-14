"use client";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import { Board } from "@prisma/client";
import { setBoardSelected } from "@/lib/features/board/boardSlice";
import Link from "next/link";

interface NavProps {
  board: Board;
}

const NavList = ({ board }: NavProps) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  return (
    <li key={board.id} onClick={() => dispatch(setBoardSelected(board.name))}>
      <Link
        href={`/board/${board.id}`}
        className={`${
          pathname === `/board/${board.id.toString()}`
            ? "active text-white w-[240px] l:w-[276px]"
            : ""
        } flex items-center gap-x-4 px-8 cursor-pointer text-[#828fa3]`}
      >
        <div>
          <Image
            src={`/${
              pathname === board.name
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
      </Link>
    </li>
  );
};

export default NavList;
