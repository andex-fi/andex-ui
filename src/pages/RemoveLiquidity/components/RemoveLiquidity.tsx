import { FC } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { TokenSelector } from "./TokenSelector";
import { Button } from "../../../components/Button";
import { Link } from "react-router-dom";
import { useAccountContext } from "../../../hooks/useAccountContext";

export const RemoveLiquidity: FC = () => {
  const { address, connect } = useAccountContext();
  return (
    <div className="flex items-center justify-center w-full h-screen font-montserrat bg-[#EBF1FF] dark:bg-purple-dark p-4 py-10 ">
      <div className="w-full md:w-[40rem] bg-white dark:bg-purple-light rounded-2xl p-6">
        <div className="w-full flex items-center justify-between">
          <Link to="/pools">
            <MdOutlineKeyboardArrowLeft />
          </Link>
          <h3 className="font-extrabold">Remove Liquidity</h3>
          <FiSettings />
        </div>
        <div className="flex ml-4 gap-20">
            <div className="">
                <TokenSelector />
            </div>
            <div className="">
                <TokenSelector />
            </div>
        </div>
        {address ? (
          <Button btnStyles="bg-[#52058F] dark:bg-purple-lightest w-full flex items-center justify-center py-4 rounded-lg mt-4 text-white font-bold">
           Remove Liquidity
          </Button>
        ) : (
          <Button
            onClick={() => {
              connect();
            }}
            btnStyles="bg-[#52058F] dark:bg-purple-lightest w-full flex items-center justify-center py-4 rounded-lg mt-4 text-white font-bold"
          >
            Connect wallet
          </Button>
        )}
      </div>
    </div>
  );
};
