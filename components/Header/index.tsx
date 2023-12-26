"use client";
import { useRef } from "react";
import { useAppSelector, useAppDispatch, useAppStore } from "@/app/lib/hooks";
import { toggleTheme } from "@/app/lib/features/theme/themeSlice";
import { Button } from "..";
import Image from "next/image";
const Header = () => {
  const store = useAppStore();
  const lighTheme = useAppSelector((state) => state.theme.lightTheme);
  return (
    <header
      className={`${
        lighTheme
          ? "bg-white border-[#e4ebfa]"
          : "bg-[#2b2c37] border-[#3e3f4e]"
      } border-b`}
    >
      <section className=" px-4 flex items-center gap-x-4">
        <div className="py-4 flex gap-x-4 items-center pr-6">
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
          } w-[1px] h-[4rem]`}
        />
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
