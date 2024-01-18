"use client";
import { useAppSelector } from "@/lib/hooks";
interface TaskClientProps {
  children: React.ReactNode;
}
const TaskClient = ({ children }: TaskClientProps) => {
  const lightTheme = useAppSelector((state) => state.theme.lightTheme);
  return (
    <section
      className={`${
        lightTheme ? "bg-white" : "bg-[#2B2C37]"
      } min-h-[5.5rem] task-item flex px-4 py-4`}
    >
      {children}
    </section>
  );
};

export default TaskClient;
