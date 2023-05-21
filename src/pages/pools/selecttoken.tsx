import React, { FC } from "react";

export const Selecttoken: FC = () => {
  return (
    <div className="mt-8">
      <div className="flex item-center justify-between w-full">
        <input type="number" placeholder="0" className="text-5xl w-[50%]" />
        <select
          name="token"
          id="token"
          className="rounded-full text-2xl font-bold bg-[#F3F3F3] px-5 py-1"
        >
          <option value="" className="">
            select token
          </option>
          <option value="ETH">ETH</option>
          <option value="BUSD">BUSD</option>
          <option value="USDT">USDT</option>
        </select>
      </div>
      <div className="flex items-center justify-between w-full mt-2">
        <input
          type="text"
          placeholder="$0.00"
          className="text-[#7F8FA9] w-[50%]"
        />
        <p className="text-[#7F8FA9] font-bold text-sm">
          Balance: <span>0.00</span>
        </p>
      </div>
    </div>
  );
};
