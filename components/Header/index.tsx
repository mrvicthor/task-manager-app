import { Button } from "..";
import Image from "next/image";
const Header = () => {
  return (
    <header className="bg-white">
      <section className="py-4 px-4 flex items-center gap-x-4">
        <div className=" flex gap-x-4 items-center pr-6 border-r border-r-[#e4ebfa]">
          <div>
            <Image
              src="./assets/logo-mobile.svg"
              alt="kanban-logo"
              width={20}
              height={20}
              priority
            />
          </div>
          <div>
            <p className="font-bold text-2xl">Kanban</p>
          </div>
        </div>
        <div>
          <h1 className="font-bold text-lg">Platform Launch</h1>
        </div>
        <div className="ml-auto">
          <Button />
        </div>
        <div>
          <Image
            src="./assets/icon-vertical-ellipsis.svg"
            alt="vertical-ellipsis"
            height={20}
            width={4}
          />
        </div>
      </section>
    </header>
  );
};

export default Header;
