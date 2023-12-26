"use client";
import { useRef } from "react";
import { useAppSelector, useAppDispatch, useAppStore } from "@/app/lib/hooks";
import { toggleTheme } from "@/app/lib/features/theme/themeSlice";
import { Button } from "..";
import Image from "next/image";
const Header = () => {
  const store = useAppStore();
  const theme = useAppSelector((state) => state.theme.lightTheme);
  console.log("theme", theme);
  return (
    <header className="bg-white relative">
      <section className="py-4 px-4 flex items-center gap-x-4">
        <div className=" flex gap-x-4 items-center pr-6">
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
        <div className="bg-[#e4ebfa] w-[1px] h-[4rem] absolute left-[164px]" />
        <div>
          <h1 className="font-bold text-lg">Platform Launch</h1>
        </div>
        <div className="ml-auto">
          <Button />
        </div>
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
