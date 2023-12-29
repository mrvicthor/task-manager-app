import Image from "next/image";
import { useAppSelector, useAppDispatch } from "../lib/hooks";
// import { toggleSidebar } from "../lib/features/sidebar/sidebarSlice";
import { Boards, Toggle, MainScreen } from "@/components";

export default function Home() {
  // const dispatch = useAppDispatch();

  // const handleSidebar = () => dispatch(toggleSidebar());
  return (
    <MainScreen>
      <Boards />
      <Toggle />
    </MainScreen>
  );
}
