"use client";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { ThemeToggle } from "..";
import { toggleMobileBoard } from "@/lib/features/board/boardSlice";

interface MobileMenuProps {
  children: React.ReactNode;
}

export const MobileClientComponent = ({ children }: MobileMenuProps) => {
  const dispatch = useAppDispatch();
  const lightTheme = useAppSelector((state) => state.theme.lightTheme);
  const showMobileMenu = useAppSelector((state) => state.board.showMobileBoard);
  const handleToggleMobileMenu = () => {
    document.body.style.overflow = "auto";
    dispatch(toggleMobileBoard());
  };
  return (
    <section>
      {showMobileMenu ? (
        <>
          <div
            onClick={handleToggleMobileMenu}
            id="overlay"
            className="md:hidden fixed bg-[#000] opacity-50 h-full w-screen left-0 right-0 bottom-0 top-0 z-20 cursor-pointer"
          />
          <section
            className={`${
              lightTheme ? "bg-white" : "bg-[#2B2C37]"
            } md:hidden absolute top-[16px] left-[50%] -translate-x-[50%] z-50 min-w-[264px] pb-4 mobile-menu`}
          >
            {children}
            <div
              className={`${
                lightTheme ? "bg-[#F4F7FD]" : "bg-[#20212c]"
              } h-[2.4rem] w-[14.6875rem] l:w-[15.6875rem] rounded mt-8 ml-4`}
            >
              <ThemeToggle />
            </div>
          </section>
        </>
      ) : null}
    </section>
  );
};
