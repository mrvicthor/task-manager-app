"use client";
import { useAppSelector } from "@/lib/hooks";

interface DetailsProps {
  children: React.ReactNode;
}

const BoardDetailsClient = ({ children }: DetailsProps) => {
  const lightTheme = useAppSelector((state) => state.theme.lightTheme);
  const showSidebar = useAppSelector((state) => state.sidebar.hideSidebar);

  return (
    <section
      className={`${
        lightTheme ? "bg-[#e4ebfa] text-[#000112]" : "bg-[#20212c] text-white"
      }  ${
        showSidebar ? "md:translate-x-[18.75rem]" : "translate-x-0"
      } sidebar h-[100vh] w-full mt-16 overflow-x-auto`}
    >
      {children}
    </section>
  );
};

export default BoardDetailsClient;
