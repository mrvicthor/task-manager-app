"use client";
import { toggleSidebar } from "@/lib/features/sidebar/sidebarSlice";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import Image from "next/image";

export const Toggle = () => {
  const showSidebar = useAppSelector((state) => state.sidebar.hideSidebar);
  const dispatch = useAppDispatch();
  const handleSidebar = () => dispatch(toggleSidebar());
  return (
    <>
      {showSidebar ? null : (
        <div
          onClick={handleSidebar}
          className="bg-[#635fc7] h-[2.4rem] w-[56px] md:flex items-center justify-center fixed bottom-24 rounded-r-full cursor-pointer hidden z-20"
        >
          <Image
            src="./assets/icon-show-sidebar.svg"
            height={16}
            width={16}
            alt="show sidebar"
          />
        </div>
      )}
    </>
  );
};
