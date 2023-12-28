"use client";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "./lib/hooks";
import { toggleSidebar } from "./lib/features/sidebar/sidebarSlice";
import { Boards } from "@/components";

export default function Home() {
  const lightTheme = useAppSelector((state) => state.theme.lightTheme);
  const showSidebar = useAppSelector((state) => state.sidebar.hideSidebar);
  const dispatch = useAppDispatch();

  const handleSidebar = () => dispatch(toggleSidebar());
  return (
    <main
      className={`${
        lightTheme ? "bg-[#e4ebfa]" : "bg-[#20212c]"
      } min-h-screen ${
        showSidebar ? "translate-x-[18.75rem]" : "translate-x-0"
      } sidebar`}
    >
      <p>Task Manager</p>
      <Boards />
      {!showSidebar && (
        <div
          onClick={handleSidebar}
          className="bg-[#635fc7] h-[2.4rem] w-[56px] md:flex items-center justify-center fixed bottom-24 rounded-r-full cursor-pointer hidden"
        >
          <Image
            src="./assets/icon-show-sidebar.svg"
            height={16}
            width={16}
            alt="show sidebar"
          />
        </div>
      )}
    </main>
  );
}
