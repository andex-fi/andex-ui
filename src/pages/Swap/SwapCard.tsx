import { FC } from "react";
import { useAccountContext } from "../../hooks/useAccountContext";
import DropdownComponent from "./Dropdown";
import { ArrowsUpDownIcon } from "@heroicons/react/20/solid";
import { FiSettings } from "react-icons/fi";

const SwapCard: FC = () => {
  const { connect, address } = useAccountContext();

  // const [tokenOne] = React.useState("ETH");
  // const [tokenTwo] = useState<number | string>("ANDC");

  // const [tokenOneAmount, setTokenOneAmount] = useState();
  // const [tokenTwoAmount, setTokenTwoAmount] = useState();

  // const switchTokens = () => {
  //   // setPrices(null);
  //   // setTokenOneAmount(null);
  //   // setTokenTwoAmount(null);
  //   const one = tokenOne;
  //   const two = tokenTwo;
  //   // setTokenOne(two);
  //   // setTokenTwo(one);
  //   // fetchPrices(two.address, one.address);
  // }

  return (
    <div className="flex justify-center items-center h-full m-auto px-4 md:p-20 drop-shadow-2xl ">
      <div className="w-full text-black dark:text-white md:w-[32rem]">
        <div className="h-52 p-2 px-4 rounded-t-3xl bg-[#F4F5FA] dark:bg-purple">
          <div className="flex items-center justify-between pr-8">
            <h2 className="m-6 text-xl">Swap</h2>
            <FiSettings className="cursor-pointer" />
          </div>
          <div className="m-6 flex justify-between mt-6">
            <div className="flex flex-col">
              <span className="text-5xl">0</span>
              <span className="text-grey text-md mt-2">$0.00</span>
            </div>
            <div className="flex flex-col place-items-end">
              <span className="text-sm">
                <DropdownComponent />
              </span>
              <span className="text-grey text-md mt-2">Balance: 0</span>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center">
          <ArrowsUpDownIcon className="w-[2rem] z-10 -m-4 p-1 bg-white drop-shadow-xl text-[#3a93ed] dark:text-white text-blue dark:bg-purple-light rounded rounded-full" />{" "}
        </div>
        <div className="flex flex-col relative w-full p-2 px-4 rounded-b-3xl bg-[#FFFFFF] dark:bg-purple-darkest">
          {/* <div className="flex flex-row justify-center"><ArrowsUpDownIcon className="w-[2rem]  p-1 bg-purple-light rounded rounded-full" /></div> */}
          <div className="mx-7 flex justify-between mt-10">
            <div className="flex flex-col">
              <span className="text-5xl">0</span>
              <span className="text-grey text-md mt-2">$0.00</span>
            </div>
            <div className="flex flex-col place-items-end">
              <span className="text-sm">
                <DropdownComponent />
              </span>
              <span className="text-grey text-md mt-2">Balance: 0</span>
            </div>
          </div>
          {address ? (
            <button className="bg-purple-light text-white dark:bg-purple-lightest m-6 p-4 rounded-xl font-bold">
              Swap
            </button>
          ) : (
            <button
              onClick={() => {
                connect();
              }}
              className="bg-purple-light text-white dark:bg-purple-lightest dark:text-white m-6 p-4 rounded-xl font-bold"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SwapCard;
