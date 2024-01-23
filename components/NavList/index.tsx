"use client";
import { usePathname } from "next/navigation";
import { SvgComponent } from "..";
import { Board } from "@prisma/client";
import Link from "next/link";

interface NavProps {
  board: Board;
}

const NavList = ({ board }: NavProps) => {
  const pathname = usePathname();

  return (
    <li key={board.id}>
      <Link
        href={`/board/${board.id}`}
        className={`${
          pathname === `/board/${board.id.toString()}`
            ? "active text-white w-[240px] lg:w-[276px]"
            : "navlist hover:text-[#635FC7] "
        } flex items-center gap-x-4 px-8 cursor-pointer text-[#828fa3] hover:w-[240px] lg:hover:w-[276px]`}
      >
        <div>
          <SvgComponent color="text-[#828fa3] hover:text-[#635fc7]" />
        </div>
        <div>
          <p className="font-bold capitalize text-[15px]">{board.name}</p>
        </div>
      </Link>
    </li>
  );
};

export default NavList;
