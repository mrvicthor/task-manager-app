"use client";
import { useAppSelector } from "@/lib/hooks";
import { Player } from "@lottiefiles/react-lottie-player";

const Columns = () => {
  const lightTheme = useAppSelector((state) => state.theme.lightTheme);
  return (
    <section
      className={`${
        lightTheme ? "bg-[#F4F7FD] text-[#000112]" : "bg-[#20212c] text-white"
      }`}
    >
      <Player
        autoplay
        loop
        src="https://lottie.host/a65d390a-e530-47ff-91c0-d7290e8845a2/uidMOKoai4.json"
        style={{ height: "450px", width: "350px" }}
      ></Player>
      <h1 className="text-center capitalize font-bold text-2xl">
        welcome to the kanban task manager app
      </h1>
      <p className="text-center hidden md:block capitalize">
        <span className=" animate-ping text-lg">👈</span> open the sidebar to
        add board or navigate between boards
      </p>
      <p className="text-center md:hidden capitalize">
        <span className="animate-bounce text-lg">👆</span> click on the drop
        down to add board or navigate between boards
      </p>
    </section>
  );
};

export default Columns;
