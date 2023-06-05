import { FC } from "react";
import Dropdown from "../../assets/dropdown.png";

export const Selecttoken: FC = () => {
  return (
    <div className="mt-8 dark:bg-purple-light">
      <div className="flex item-center justify-between w-full">
        <input
          type="number"
          placeholder="0"
          className="text-5xl w-[50%] dark:bg-purple-light dark:text-white dark:opacity-80"
        />
        <div
          className="w-[50%] h-14 bg-[#F3F3F3] dark:bg-purple-dark flex items-center justify-start rounded-full"
          style={{
            boxShadow: "0px 4px 8px rgba(50, 14, 79, 0.15)",
          }}
        >
          <select
            name="token"
            id="token"
            className="rounded-full dark:bg-purple-dark text-md lg:text-2xl font-bold  px-5 py-1 outline-none"
            style={{
              background: `url(${Dropdown}) 99% no-repeat`,
              appearance: "none",
            }}
          >
            <option value="" className="dark:bg-purple-dark">
              select token
            </option>
            <option value="ETH" className="dark:bg-purple-dark">
              ETH
            </option>
            <option value="BUSD" className="dark:bg-purple-dark">
              BUSD
            </option>
            <option value="USDT" className="dark:bg-purple-dark">
              USDT
            </option>
          </select>
        </div>
      </div>
      <div className="flex items-center justify-between w-full mt-2">
        <input
          type="text"
          placeholder="$0.00"
          className="text-[#7F8FA9] dark:bg-purple-light dark:text-white dark:opacity-80 w-[50%]"
        />
        <p className="text-[#7F8FA9] font-bold text-sm">
          Balance: <span>0.00</span>
        </p>
      </div>
    </div>
  );
};
