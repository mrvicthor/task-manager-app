import Image from "next/image";
import { useAppDispatch } from "@/lib/hooks";
import { toggleSidebar } from "@/lib/features/sidebar/sidebarSlice";
export const HideSidebar = () => {
  const dispatch = useAppDispatch();
  const handleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div
      onClick={handleSidebar}
      className="flex left-6 items-center space-x-4 bottom-14 fixed cursor-pointer"
    >
      <div>
        <Image
          src={"/" + "./assets/icon-hide-sidebar.svg"}
          alt="hide-icon"
          height={12}
          width={12}
        />
      </div>
      <div>
        <p className="capitalize text-[#828fa3] text-[15px]">hide sidebar</p>
      </div>
    </div>
  );
};
