"use-client";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { toggleMobileBoard } from "@/lib/features/board/boardSlice";
import { usePathname } from "next/navigation";

const BoardTitle = () => {
  const boardName = useAppSelector((state) => state.board.name);
  const lightTheme = useAppSelector((state) => state.theme.lightTheme);
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const showMobileBoard = useAppSelector(
    (state) => state.board.showMobileBoard
  );

  const handleToggleMobileMenu = () => {
    document.body.style.overflow = "hidden";
    dispatch(toggleMobileBoard());
  };

  return (
    <div className="md:hidden" onClick={handleToggleMobileMenu}>
      <div className="flex items-center justify-center space-x-2">
        <h2
          className={`${
            lightTheme ? "text-[#000112]" : "text-white"
          } text-lg font-bold capitalize`}
        >
          {pathname === "/" ? "Home" : boardName}
        </h2>
        <div>
          <Image
            src={`/${
              showMobileBoard
                ? "./assets/icon-chevron-up.svg"
                : "./assets/icon-chevron-down.svg"
            }`}
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
