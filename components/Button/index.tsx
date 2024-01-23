import Image from "next/image";
import { usePathname } from "next/navigation";
const Button = () => {
  const pathname = usePathname();
  return (
    <button
      className={`${
        pathname === "/" ? "opacity-10" : "opacity-100"
      } flex bg-[#635fc7] text-white px-6 py-2 rounded-3xl gap-x-1 hover:bg-[#A8A4FF]`}
      disabled={pathname === "/"}
    >
      <Image
        src={"/" + "./assets/icon-add-task-mobile.svg"}
        alt="plus-icon"
        width={5}
        height={20}
        className="self-center mt-1"
      />
      <p className="text-sm">Add New Task</p>
    </button>
  );
};

export default Button;
