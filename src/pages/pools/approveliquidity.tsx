import React, { FC } from "react";
import { FiSettings } from "react-icons/fi";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Link } from "react-router-dom";
import { Selecttoken } from "./selecttoken";
import { Button } from "../../components/Button";

export const Approveliquidity: FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen font-montserrat bg-[#E5E5E5]">
      <div className="w-full md:w-[30rem] bg-white rounded-2xl p-6">
        <div className="w-full flex items-center justify-between">
          <Link to="/pools">
            <MdOutlineKeyboardArrowLeft />
          </Link>
          <h3 className="font-extrabold">Add Liquidity</h3>
          <FiSettings />
        </div>

        <div className="">
          <Selecttoken />
        </div>
        <div className="flex items-center justify-center  w-full mt-8">
          <div className="w-5 h-5 rounded-full bg-[#E5E5E5] flex items-center justify-center">
            <p className="text-[#3189EE] text-lg">+</p>
          </div>
        </div>
        <div>
          <Selecttoken />
        </div>

        <div className="mt-3">
          <h4 className="text-[#7F8FA9] text-sm font-bold">
            Prices and pool share
          </h4>
          <div className="mt-2 flex items-center justify-between w-full">
            <div>
              <h3 className="text-[#13173E] font-extrabold">960.7826</h3>
              <p className="text-[#7F8FA9] text-sm">BUSD per ETH</p>
            </div>
            <div>
              <h3 className="text-[#13173E] font-extrabold">0.001040818</h3>
              <p className="text-[#7F8FA9] text-sm">ETH per BUSD</p>
            </div>
            <div>
              <h3 className="text-[#13173E] font-extrabold">16%</h3>
              <p className="text-[#7F8FA9] text-sm">Share of pool</p>
            </div>
          </div>
        </div>
        <Button btnStyles="bg-[#52058F] text-white flex items-center justify-center w-full rounded-lg py-3 mt-4">
          Approve
        </Button>
      </div>
    </div>
  );
};
