import Image from "next/image";
const Button = () => {
  return (
    <button className=" flex bg-[#635fc7] text-white px-6 py-2 rounded-3xl gap-x-1">
      <Image
        src="./assets/icon-add-task-mobile.svg"
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
