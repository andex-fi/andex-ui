import DropdownComponent from "./Dropdown";

const SwapCard = () => {
  return (
    <div className="flex justify-center items-cemter h-full m-auto drop-shadow-2xl">
      <div className="absolute mt-48 w-[24rem] text-white md:w-[32rem]">
        <div className="h-52 p-2 px-4 rounded-t-3xl bg-purple ">
          <h2 className="m-6 text-xl">Swap</h2>
          <div className="m-6 flex justify-between mt-10">
            <div className="flex flex-col">
              <span className="text-5xl">0</span>
              <span className="text-grey text-md mt-2">$0.00</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm">
                <DropdownComponent />
              </span>
              <span className="text-grey text-md mt-2">Balance: 0</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full p-2 px-4 rounded-b-3xl bg-purple-darkest ">
          <div className="mx-7 flex justify-between mt-10">
            <div className="flex flex-col">
              <span className="text-5xl">0</span>
              <span className="text-grey text-md mt-2">$0.00</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm">
                <DropdownComponent />
              </span>
              <span className="text-grey text-md mt-2">Balance: 0</span>
            </div>
          </div>
          <button className="bg-purple-lightest m-6 p-4 rounded-xl font-bold">Connect Wallet</button>
        </div>
      </div>
    </div>
  );
};

export default SwapCard;
