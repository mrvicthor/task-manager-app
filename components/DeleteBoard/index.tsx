"use client";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { toast } from "react-toastify";
import { toggleDeleteModal } from "@/lib/features/board/boardSlice";
import { Button } from "..";
import { deleteBoard } from "@/app/actions";

const DeleteModal = () => {
  const dispatch = useAppDispatch();

  const showDelete = useAppSelector((state) => state.board.showDeleteModal);
  const lightTheme = useAppSelector((state) => state.theme.lightTheme);
  const boardToDelete = useAppSelector((state) => state.board.boards);

  const notify = () =>
    toast.success(
      `Board with id: ${boardToDelete?.id} was successfully deleted`
    );

  if (!showDelete) return null;
  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 bottom-0 z-[9999] size-full bg-[#000] opacity-50 cursor-pointer"
        onClick={() => dispatch(toggleDeleteModal())}
      />
      <section
        className={`${
          lightTheme ? "bg-[#ffffff]" : "bg-[#2b2c37]"
        } absolute mx-auto top-[50%] -translate-y-[50%] min-h-[284px] w-[90%] left-[50%] z-[10000] -translate-x-[50%] rounded-lg px-6 py-6 delete-modal space-y-4 md:w-[480px] md:min-h-[229px]`}
      >
        <p className="text-[#ea5555] text-lg font-semibold">
          Delete this task?
        </p>
        <p className="text-[#828FA3]">
          Are you sure you want to delete &quot;{boardToDelete?.name}&quot;
          board? This action will remove all columns and tasks and cannot be
          reversed.
        </p>
        <div className="flex flex-col gap-4 md:flex-row">
          <Button
            style="bg-[#ea5555] text-white rounded-full py-2 md:w-[200px]"
            onClick={() => {
              deleteBoard(boardToDelete?.id as number);
              notify();
              dispatch(toggleDeleteModal());
              window.location.reload();
            }}
          >
            Delete
          </Button>
          <Button
            style="bg-[#e4ebfa] py-2 rounded-full text-[#635fc7] md:w-[200px]"
            onClick={() => dispatch(toggleDeleteModal())}
          >
            Cancel
          </Button>
        </div>
      </section>
    </>
  );
};

export default DeleteModal;
