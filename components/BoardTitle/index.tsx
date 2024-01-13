"use-client";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { toggleMobileBoard } from "@/lib/features/board/boardSlice";
const BoardTitle = () => {
  const boardName = useAppSelector((state) => state.board.name);
  const dispatch = useAppDispatch();
  const showMobileBoard = useAppSelector(
    (state) => state.board.showMobileBoard
  );

  const handleToggleMobileMenu = () => dispatch(toggleMobileBoard());
  return (
    <div className="md:hidden">
      <div className="flex items-center justify-center space-x-2">
        <h2 className="text-lg font-bold capitalize">{boardName}</h2>
        <div onClick={handleToggleMobileMenu}>
          <Image
            src={
              showMobileBoard
                ? "./assets/icon-chevron-up.svg"
                : "./assets/icon-chevron-down.svg"
            }
            alt="down-logo"
            height={12}
            width={12}
          />
        </div>
      </div>
    </div>
  );
};

export default BoardTitle;
