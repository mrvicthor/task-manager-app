import { useAppSelector } from "@/lib/hooks";

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  const lighTheme = useAppSelector((state) => state.theme.lightTheme);
  const showSidebar = useAppSelector((state) => state.sidebar.hideSidebar);
  return (
    <aside
      className={`${
        lighTheme
          ? "bg-[#ffffff] border-[#e4ebfa]"
          : "bg-[#2b2c37] border-[#3e3f4e]"
      } min-h-screen fixed w-[18.75rem] border-r ${
        showSidebar ? "translate-x-0" : "-translate-x-[18.75rem]"
      } sidebar z-50 top-0`}
    >
      {children}
    </aside>
  );
};