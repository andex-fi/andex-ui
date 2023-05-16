import React, { FC } from "react";

export const Liquiditypools: FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen font-montserrat bg-[#E5E5E5]">
      <div className="w-full md:w-[30rem] bg-white rounded-lg p-4">
        <div className="grid grid-cols-6">
          <h1 className="col-span-2 font-bold text-sm">Position Overview</h1>
          <button className="bg-[#9645D7] px-2 py-1 rounded-xl text-white text-sm col-span-2 col-end-7 flex items-center justify-center gap-2">
            <span>+</span>
            New Position
          </button>
        </div>

        <button className="w-full px-2 py-4 flex items-center justify-center bg-[#52058F] text-white text-sm rounded-lg mt-6 font-bold">
          Connect wallet
        </button>
      </div>
    </div>
  );
};
