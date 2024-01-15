const BoardDetails = ({ params }: { params: { boardId: string } }) => {
  return (
    <section className="mt-16">
      <p>board id goes here {params.boardId}</p>
    </section>
  );
};
export default BoardDetails;
