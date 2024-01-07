"use client";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { toggleSidebar } from "@/lib/features/sidebar/sidebarSlice";
import Image from "next/image";
import { Wrapper } from "./wrapper";
import { ThemeToggle } from "..";

const Sidebar = () => {
  const lighTheme = useAppSelector((state) => state.theme.lightTheme);
  const dispatch = useAppDispatch();

  const handleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <Wrapper>
      <div className="px-8 pt-6 flex items-center">
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
      <div className="mt-5">
        <h2 className="px-8 pt-4 uppercase text-xs text-[#828fa3] font-bold">
          all boards (8)
        </h2>
        <ul className="mt-5 flex flex-col space-y-[1.8125rem]">
          <li className="flex items-center gap-x-4 px-8">
            <div>
              <Image
                src="./assets/icon-board.svg"
                alt="board-icon"
                height={16}
                width={16}
              />
            </div>
            <div>
              <p className="font-bold capitalize text-[#828fa3] text-[15px]">
                platform launch
              </p>
            </div>
          </li>
          <li className="flex items-center gap-x-4 px-8">
            <div>
              <Image
                src="./assets/icon-board.svg"
                alt="board-icon"
                height={16}
                width={16}
              />
            </div>
            <div>
              <p className="font-bold capitalize text-[#828fa3] text-[15px]">
                platform launch
              </p>
            </div>
          </li>{" "}
          <li className="flex items-center gap-x-4 px-8">
            <div>
              <Image
                src="./assets/icon-board.svg"
                alt="board-icon"
                height={16}
                width={16}
              />
            </div>
            <div>
              <p className="font-bold capitalize text-[#828fa3] text-[15px]">
                platform launch
              </p>
            </div>
          </li>
          <li className="flex items-center gap-x-4 px-8">
            <div>
              <Image
                src="./assets/icon-board.svg"
                alt="board-icon"
                height={16}
                width={16}
              />
            </div>
            <div className="flex gap-x-[2px]">
              <Image
                src="./assets/icon-add-purple.svg"
                alt="plus-icon"
                width={5}
                height={20}
                className="self-center mt-1"
              />
              <p className="text-sm text-[#635fc7]">Create New Board</p>
            </div>
          </li>
        </ul>
        <ThemeToggle />
        <div
          onClick={handleSidebar}
          className="flex left-6 items-center space-x-4 bottom-14 fixed cursor-pointer"
        >
          <div>
            <Image
              src="./assets/icon-hide-sidebar.svg"
              alt="hide-icon"
              height={12}
              width={12}
            />
          </div>
          <div>
            <p className="capitalize text-[#828fa3] text-[15px]">
              hide sidebar
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Sidebar;
