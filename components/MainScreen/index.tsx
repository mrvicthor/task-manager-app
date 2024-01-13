"use client";
import { useAppSelector } from "@/lib/hooks";
import { MobileMenu } from "..";

interface MainScreenProps {
  children: React.ReactNode;
}
export const MainScreen = ({ children }: MainScreenProps) => {
  const lightTheme = useAppSelector((state) => state.theme.lightTheme);
  const showSidebar = useAppSelector((state) => state.sidebar.hideSidebar);
  const showMobileMenu = useAppSelector((state) => state.board.showMobileBoard);
  return (
    <main
      className={`${
        lightTheme ? "bg-[#e4ebfa]" : "bg-[#20212c]"
      } min-h-screen ${
        showSidebar ? "translate-x-[18.75rem]" : "translate-x-0"
      } sidebar mt-16`}
    >
      {children}
      {showMobileMenu ? (
        <>
          <div
            id="overlay"
            className="fixed bg-[#000] opacity-50 h-full w-screen left-0 right-0 bottom-0 top-0 z-20 cursor-pointer"
          >
            <section
              className={`${
                lightTheme ? "bg-white" : "bg-[#2B2C37]"
              } absolute top-[16px] left-[50%] -translate-x-[50%] z-50 border border-red-500`}
            >
              <MobileMenu />
            </section>
          </div>
        </>
      ) : null}
    </main>
  );
};
