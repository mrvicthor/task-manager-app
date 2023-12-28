// import prisma from "@/app/lib/prisma";
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
  //   const boards = await prisma.board.findMany();
  console.log(boards, "testing board");
  return (
    <section>
      <ul>
        <li>Board</li>
      </ul>
    </section>
  );
};

export default Boards;
