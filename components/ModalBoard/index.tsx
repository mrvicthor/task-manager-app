"use client";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";

const ModalBoard = () => {
  const lightTheme = useAppSelector((state) => state.theme.lightTheme);
  return (
    <section
      className={`${
        lightTheme ? "bg-[#ffffff]" : "bg-[#20212c]"
      } absolute flex flex-col -top-[4px] gap-5 rounded-lg right-[1.5rem] z-[1000000] w-[12rem] h-[5.875rem] p-4`}
    >
      <p aria-roledescription="button" className="capitalize text-sm w-[50%]">
        edit board
      </p>
      <p
        aria-roledescription="button"
        className="capitalize text-sm text-red-500 w-[70%]"
      >
        delete board
      </p>
    </section>
  );
};

export default ModalBoard;
