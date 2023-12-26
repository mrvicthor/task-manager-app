"use client";
import { useAppSelector } from "@/app/lib/hooks";
import Image from "next/image";

const Sidebar = () => {
  const lighTheme = useAppSelector((state) => state.theme.lightTheme);
  return (
    <section
      className={`${
        lighTheme ? "bg-[#ffffff]" : "bg-[#3e3f4e]"
      } min-h-screen border-r border-[#e4ebfa]`}
    >
      <div className="px-8 pt-4 flex gap-x-4 items-center">
        <div>
          <Image
            src="./assets/logo-mobile.svg"
            alt="kanban-logo"
            width={20}
            height={20}
            priority
          />
        </div>
        <div>
          <p className="font-bold text-2xl">Kanban</p>
        </div>
      </div>
      <div className="mt-5">
        <h2 className="px-8 pt-4 uppercase text-xs text-[#828fa3] font-bold">
          all boards
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
      </div>
    </section>
  );
};

export default Sidebar;
