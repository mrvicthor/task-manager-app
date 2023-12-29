"use-client";
import Image from "next/image";
import { useAppSelector } from "@/lib/hooks";
const BoardTitle = () => {
  const boardName = useAppSelector((state) => state.board.name);
  return (
    <div className="md:hidden">
      <div className="flex items-center justify-center space-x-2">
        <h2 className="text-lg font-bold capitalize">{boardName}</h2>
        <div>
          <Image
            src="./assets/icon-chevron-down.svg"
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
