import Image from "next/image";

const Sidebar = () => {
  return (
    <section className="min-h-screen">
      <div className="px-8 pt-4 flex gap-x-4 items-center">
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
    </section>
  );
};

export default Sidebar;
