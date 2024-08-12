"use client";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { Button, BoardTitle } from "..";
import { usePathname } from "next/navigation";
import { toggleTaskForm } from "@/lib/features/task/taskSlice";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const dispatch = useAppDispatch();
  const lighTheme = useAppSelector((state) => state.theme.lightTheme);
  const pathname = usePathname();
  const showSidebar = useAppSelector((state) => state.sidebar.hideSidebar);
  const boardName = useAppSelector((state) => state.board.name);
  const columns = useAppSelector((state) => state.board.boards?.columns);

  const showForm = () => {
    document.body.style.overflow = "hidden";
    dispatch(toggleTaskForm());
  };

  return (
    <header
      className={`${
        lighTheme
          ? "bg-white border-[#e4ebfa]"
          : "bg-[#2b2c37] border-[#3e3f4e]"
      } border-b fixed w-full top-0 z-40`}
    >
      <section className="px-4 md:px-6 flex items-center gap-x-4 h-16 w-full">
        <Link href="/" className="my-4 relative h-6 w-6 md:hidden">
          <Image
            src={"/" + "./assets/logo-mobile.svg"}
            alt="kanban-logo-mobile"
            fill
            sizes="100vw"
            // height={24}
            // width={24}
            style={{
              objectFit: "cover", // cover, contain, none
            }}
          />
        </Link>
        <BoardTitle />
        <div className="py-4 md:flex gap-x-4 items-center pr-6 hidden">
          <Link href="/" className="cursor-pointer">
            <Image
              src={`/${
                lighTheme ? "./assets/logo-dark.svg" : "./assets/logo-light.svg"
              }`}
              alt="kanban-logo"
              width={100}
              height={100}
              priority
            />
          </Link>
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
          <h1
            className={`${
              lighTheme ? "text-[#000112]" : "text-white"
            } font-bold text-lg`}
          >
            {pathname === "/" ? "Home" : boardName}
          </h1>
        </div>
        <div className="hidden md:block ml-auto">
          <Button
            onClick={showForm}
            style={`${
              pathname === "/" ? "opacity-10" : "opacity-100"
            } flex bg-[#635fc7] text-white px-6 py-2 rounded-3xl gap-x-1 hover:bg-[#A8A4FF]`}
          >
            <Image
              src={"/" + "./assets/icon-add-task-mobile.svg"}
              alt="plus-icon"
              width={5}
              height={20}
              className="self-center mt-1"
            />
            <p className="text-sm">Add New Task</p>
          </Button>
        </div>

        <Button
          onClick={showForm}
          disabled={!columns?.length}
          style={`${
            pathname === "/" ? "opacity-10" : "opacity-100"
          } bg-[#635fc7]  h-8 w-12 ml-auto flex items-center justify-center rounded-3xl md:hidden`}
        >
          <Image
            src={"/" + "./assets/icon-add-task-mobile.svg"}
            alt="add-icon"
            height={16}
            width={16}
          />
        </Button>

        <div className="header__ellipsis">
          <Image
            src={"/" + "./assets/icon-vertical-ellipsis.svg"}
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
