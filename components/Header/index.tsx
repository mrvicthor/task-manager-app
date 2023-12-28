"use client";
import { useAppSelector } from "@/app/lib/hooks";
import { Button, BoardTitle } from "..";
import Image from "next/image";
const Header = () => {
  const lighTheme = useAppSelector((state) => state.theme.lightTheme);
  const showSidebar = useAppSelector((state) => state.sidebar.hideSidebar);
  return (
    <header
      className={`${
        lighTheme
          ? "bg-white border-[#e4ebfa]"
          : "bg-[#2b2c37] border-[#3e3f4e]"
      } border-b`}
    >
      <section className=" px-4 flex items-center gap-x-4">
        <div className="py-4 md:hidden">
          <Image
            src="./assets/logo-mobile.svg"
            alt="kanban-logo-mobile"
            height={24}
            width={24}
          />
        </div>
        <BoardTitle />
        <div className="py-4 md:flex gap-x-4 items-center pr-6 hidden">
          <div>
            <Image
              src={`${
                lighTheme ? "./assets/logo-dark.svg" : "./assets/logo-light.svg"
              }`}
              alt="kanban-logo"
              width={100}
              height={100}
              priority
            />
          </div>
        </div>
        <div
          className={`${
            lighTheme ? "bg-[#e4ebfa]" : "bg-[#3e3f4e]"
          } w-[1px] h-[4rem] hidden md:block`}
        />
        <div
          className={`${
            showSidebar ? "translate-x-[144px]" : "translate-x-0"
          } sidebar hidden md:block`}
        >
          <h1 className="font-bold text-lg">Platform Launch</h1>
        </div>
        <div className="hidden md:block ml-auto">
          <Button />
        </div>

        <button className="bg-[#635fc7] opacity-30 h-8 w-12 ml-auto flex items-center justify-center rounded-3xl md:hidden">
          <Image
            src="./assets/icon-add-task-mobile.svg"
            alt="add-icon"
            height={16}
            width={16}
          />
        </button>

        <div>
          <Image
            src="./assets/icon-vertical-ellipsis.svg"
            alt="vertical-ellipsis"
            height={20}
            width={4}
          />
        </div>
      </section>
    </header>
  );
};

export default Header;
