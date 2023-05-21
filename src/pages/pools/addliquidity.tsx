import React, { FC } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { Selecttoken } from "./selecttoken";
import { Button } from "../../components/Button";
import { Link } from "react-router-dom";

export const Addliquidity: FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen font-montserrat bg-[#E5E5E5]">
      <div className="w-full md:w-[30rem] bg-white rounded-lg p-4">
        <div className="w-full flex items-center justify-between">
          <Link to="/pools">
            <MdOutlineKeyboardArrowLeft />
          </Link>
          <h3 className="font-extrabold">Add Liquidity</h3>
          <FiSettings />
        </div>

        <div className="bg-[ #F4F5FA]">
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
        <Button btnStyles="bg-[#52058F] w-full flex items-center justify-center py-4 rounded-lg mt-4 text-white font-bold">
          Connect wallet
        </Button>
      </div>
    </div>
  );
};
