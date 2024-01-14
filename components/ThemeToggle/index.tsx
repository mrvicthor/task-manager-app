"use client";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { toggleTheme } from "@/lib/features/theme/themeSlice";
import { motion } from "framer-motion";
const ThemeToggle = () => {
  const dispatch = useAppDispatch();
  const lighTheme = useAppSelector((state) => state.theme.lightTheme);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };

  return (
    <div className="h-full w-full flex items-center justify-center space-x-4">
      <div>
        <Image
          src={"/" + "./assets/icon-light-theme.svg"}
          height={12}
          width={12}
          alt="sun-icon"
        />
      </div>
      <div
        onClick={handleToggle}
        className={`${
          lighTheme ? "justify-start" : "justify-end"
        } w-[2.5rem] h-[1.25rem] bg-[#635fc7] rounded-full flex items-center px-1 cursor-pointer`}
      >
        <motion.div
          className="bg-[#ffffff] h-4 w-4 rounded-full"
          transition={spring}
          layout
        />
      </div>
      <div>
        <Image
          src={"/" + "./assets/icon-dark-theme.svg"}
          height={12}
          width={12}
          alt="moon-icon"
        />
      </div>
    </div>
  );
};

export default ThemeToggle;
