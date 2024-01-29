"use client";
import { usePathname } from "next/navigation";
import { SvgComponent } from "..";
import { Board } from "@prisma/client";
import Link from "next/link";
import { useAppSelector } from "@/lib/hooks";

interface NavProps {
  board: Board;
}

const NavList = ({ board }: NavProps) => {
  const pathname = usePathname();
  const lightTheme = useAppSelector((state) => state.theme.lightTheme);

  return (
    <li key={board.id}>
      <Link
        href={`/board/${board.id}`}
        className={`${
          pathname === `/board/${board.id.toString()}`
            ? "active text-white w-[240px] lg:w-[276px]"
            : `${
                lightTheme ? "navlist" : "navlist-dark"
              } hover:text-[#635FC7] py-[14px]`
        } flex items-center gap-x-4 px-8 cursor-pointer text-[#828fa3] hover:w-[240px] lg:hover:w-[276px]`}
      >
        <div>
          <SvgComponent
            color="text-[#828fa3] hover:text-[#635fc7]"
            pathString="M0 2.889A2.889 2.889 0 012.889 0H13.11A2.889 2.889 0 0116 2.889V13.11A2.888 2.888 0 0113.111 16H2.89A2.889 2.889 0 010 13.111V2.89zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333zm8.445-1.333V1.333h-6.89A1.556 1.556 0 001.334 2.89v4.22h8.445zm4.889-1.333H11.11v4.444h3.556V5.778zm0 5.778H11.11v3.11h2a1.556 1.556 0 001.556-1.555v-1.555zm0-7.112V2.89a1.555 1.555 0 00-1.556-1.556h-2v3.111h3.556z"
          />
        </div>
        <div>
          <p className="font-bold capitalize text-[15px]">{board.name}</p>
        </div>
      </Link>
    </li>
  );
};

export default NavList;
