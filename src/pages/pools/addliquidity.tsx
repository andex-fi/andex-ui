import React, { FC } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { FiSettings } from "react-icons/fi";

export const Addliquidity: FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen font-montserrat bg-[#E5E5E5]">
      <div className="w-full md:w-[30rem] bg-white rounded-lg p-4">
        <div className="w-full flex items-center justify-between">
          <MdOutlineKeyboardArrowLeft />
          <h3>Add Liquidity</h3>
          <FiSettings />
        </div>
      </div>
    </div>
  );
};
