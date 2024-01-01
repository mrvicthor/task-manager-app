import React from "react";
import { Board } from "@prisma/client";
import prisma from "@/lib/prisma";

const Boards = async () => {
  const boards = await prisma.board.findMany();

  return (
    <section>
      <ul>
        {boards.map((board: Board) => (
          <li key={board.id}>{board.name}s</li>
        ))}
      </ul>
    </section>
  );
};

export default Boards;
