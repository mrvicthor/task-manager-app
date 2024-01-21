"use client";
import { useAppSelector } from "@/lib/hooks";

const NewColumnClient = () => {
  const lightTheme = useAppSelector((state) => state.theme.lightTheme);
  return (
    <section
      className={`${
        lightTheme ? "bg-white is-light" : "bg-[#2B2C37] is-dark"
      }  min-w-[280px] max-w-[280px] h-[50.875rem] new-column mt-[39px] flex items-center justify-center text-[#828FA3]`}
    >
      <p className="text-2xl mb-16"> + New Column</p>
    </section>
  );
};

export default NewColumnClient;
