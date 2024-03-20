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
      className={`${lightTheme ? "bg-[#F4F7FD]" : "bg-[#20212c]"} ${
        showSidebar ? "md:translate-x-[18.75rem]" : "translate-x-0"
      } sidebar h-[100vh] w-full mt-16`}
    >
      {children}
    </main>
  );
};
