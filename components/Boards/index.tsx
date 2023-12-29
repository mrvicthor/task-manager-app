// import prisma from "@/app/lib/prisma";
import { Board } from "@prisma/client";
const getBoards = async () => {
  const res = await fetch("http://localhost:3000/api/boards", {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  return res.json();
};

const Boards = async () => {
  const boards = await getBoards();

  return (
    <section>
      <ul>
        {boards.map((board: Board) => (
          <li key={board.id}>{board.name}</li>
        ))}
      </ul>
    </section>
  );
};

export default Boards;
