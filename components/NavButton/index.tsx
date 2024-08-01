"use client";
import Image from "next/image";
import { useAppDispatch } from "@/lib/hooks";
import { toggleBoardForm } from "@/lib/features/board/boardSlice";

const NavButton = () => {
  const dispatch = useAppDispatch();
  return (
    <li
      onClick={() => dispatch(toggleBoardForm())}
      className="flex items-center gap-x-4 px-8 cursor-pointer"
    >
      <div>
        <Image
          src={"/" + "./assets/icon-board-purple.svg"}
          alt="board-icon"
          height={16}
          width={16}
        />
      </div>
      <div className="flex gap-x-[2px]">
        <Image
          src={"/" + "./assets/icon-add-purple.svg"}
          alt="plus-icon"
          width={5}
          height={20}
          className="self-center mt-1"
        />
        <p className="text-sm text-[#635fc7]">Create New Board</p>
      </div>
    </li>
  );
};

export default NavButton;
