const CreateBoard = () => {
  return (
    <>
      {formIsVisible ? (
        <>
          <div
            onClick={hideFormToggle}
            className="fixed top-0 left-0 right-0 bottom-0 z-[9999] size-full bg-[#000] opacity-50 cursor-pointer"
          />
          <div
            className={`${
              lightTheme ? "bg-[#ffffff]" : "bg-[#2b2c37]"
            } absolute mx-auto top-[20px] min-h-[343px] w-[90%] left-[16px] right-[16px] z-[10000] rounded-lg px-6 py-6 md:w-[480px] md:top-[80px]`}
          >
            <h3 className="capitalize">add new board</h3>
          </div>
        </>
      ) : null}
    </>
  );
};
