import getData from "@/lib/tasks";
import ListContainer from "./_components/ListContainer";

const BoardDetails = async ({ params }: { params: { boardId: string } }) => {
  const { board, sortedColumns, subtasks } = await getData(
    Number(params.boardId)
  );

  return (
    <ListContainer board={board} columns={sortedColumns} subtasks={subtasks} />
  );
};

export default BoardDetails;
