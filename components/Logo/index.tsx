import { useAppSelector } from "@/lib/hooks";
import Image from "next/image";
const LogoToggle = () => {
  const lighTheme = useAppSelector((state) => state.theme.lightTheme);
  return (
    <div className="px-8 pt-6 flex items-center">
      <div>
        <Image
          src={`${
            lighTheme ? "./assets/logo-dark.svg" : "./assets/logo-light.svg"
          }`}
          alt="kanban-logo"
          width={100}
          height={100}
          priority
        />
      </div>
    </div>
  );
};

export default LogoToggle;
