import Image from "next/image";
import Link from "next/link";
import { Board } from "@prisma/client";
import { NavList } from "..";
import prisma from "@/lib/prisma";

const Boards = async () => {
  const boards = await prisma.board.findMany();

  return (
    <section>
      <h2 className="px-8 pt-4 uppercase text-xs text-[#828fa3]">
        all boards ({boards.length})
      </h2>
      <ul className="mt-5 flex flex-col space-y-[1.8125rem] font-bold">
        {boards.map((board: Board) => (
          <NavList key={board.id} board={board} />
          // <li key={board.id}>
          //   <Link
          //     href={`/${board.name}`}
          //     className={`${
          //       pathname === `/${board.name}` ? "active" : ""
          //     } flex items-center gap-x-4 px-8 cursor-pointer`}
          //   >
          //     <div>
          //       <Image
          //         src="./assets/icon-board.svg"
          //         alt="board-icon"
          //         height={16}
          //         width={16}
          //       />
          //     </div>
          //     <div>
          //       <p className="font-bold capitalize text-[#828fa3] text-[15px]">
          //         {board.name}
          //       </p>
          //     </div>
          //   </Link>
          // </li>
        ))}
        <li className="flex items-center gap-x-4 px-8 cursor-pointer">
          <div>
            <Image
              src="./assets/icon-board-purple.svg"
              alt="board-icon"
              height={16}
              width={16}
            />
          </div>
          <div className="flex gap-x-[2px]">
            <Image
              src="./assets/icon-add-purple.svg"
              alt="plus-icon"
              width={5}
              height={20}
              className="self-center mt-1"
            />
            <p className="text-sm text-[#635fc7]">Create New Board</p>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default Boards;
