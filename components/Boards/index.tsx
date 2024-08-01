import Image from "next/image";
import { Board } from "@prisma/client";
import { NavList, NavButton } from "..";
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
        ))}
        <NavButton />
      </ul>
    </section>
  );
};

export default Boards;
