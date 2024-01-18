"use client";
import { useAppSelector } from "@/lib/hooks";

interface MainScreenProps {
  children: React.ReactNode;
}
export const MainScreen = ({ children }: MainScreenProps) => {
  const lightTheme = useAppSelector((state) => state.theme.lightTheme);
  const showSidebar = useAppSelector((state) => state.sidebar.hideSidebar);

  return (
    <main
      className={`${lightTheme ? "bg-[#e4ebfa]" : "bg-[#20212c]"} ${
        showSidebar ? "md:translate-x-[18.75rem]" : "translate-x-0"
      } sidebar mt-16`}
    >
      {children}
    </main>
  );
};
