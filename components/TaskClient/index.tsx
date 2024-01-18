"use client";
import { useAppSelector } from "@/lib/hooks";
interface TaskClientProps {
  children: React.ReactNode;
}
const TaskClient = ({ children }: TaskClientProps) => {
  const lightTheme = useAppSelector((state) => state.theme.lightTheme);
  return (
    <section
      className={`${lightTheme ? "bg-white" : "bg-[#2B2C37]"} h-[5.5rem]`}
    >
      {children}
    </section>
  );
};

export default TaskClient;
