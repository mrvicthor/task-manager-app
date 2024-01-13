"use client";
import { useAppSelector } from "@/lib/hooks";
import { LogoToggle, ThemeToggle } from "..";
import { HideSidebar } from "./hideSidebar";

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  const lighTheme = useAppSelector((state) => state.theme.lightTheme);
  const showSidebar = useAppSelector((state) => state.sidebar.hideSidebar);
  return (
    <aside
      className={`${
        lighTheme
          ? "bg-[#ffffff] border-[#e4ebfa]"
          : "bg-[#2b2c37] border-[#3e3f4e]"
      } min-h-screen fixed w-[18.75rem] border-r ${
        showSidebar ? "translate-x-0" : "-translate-x-[18.75rem]"
      } sidebar z-50 top-0`}
    >
      <div className=" flex items-center">
        <LogoToggle />
      </div>
      <div className="mt-5">
        {children}
        <div
          className={`${
            lighTheme ? "bg-[#e4ebfa]" : "bg-[#20212c]"
          } fixed bottom-24 left-6  h-[2.4rem] w-[15.6875rem] rounded`}
        >
          <ThemeToggle />
        </div>
        <HideSidebar />
      </div>
    </aside>
  );
};
