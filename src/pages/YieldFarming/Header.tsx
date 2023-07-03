import React from "react";

const HeaderComponent = () => {
  return (
    <>
      <header className="items-center w-full md:flex md:space-between md:w-auto">
        <div className="flex flex-col w-full md:w-[50%]">
          <span className="text-xs text-grey-light dark:text-white font-medium">
            Total Value Locked
          </span>
          <span className="text-4xl text-purple-text dark:text-white font-black mt-1">
            $15,632,634.12
          </span>
        </div>

        <div className="w-full mt-4 flex items-center space-x-16 md:mt-0 md:w-[50%]">
          <div className="flex flex-col w-full md:w-[50%]">
            <span className="text-xs text-grey-light dark:text-white font-medium">
              Your Balance
            </span>
            <span className="text-xl text-purple-text dark:text-white font-black mt-1 md:text-3xl">
              $15,632,634.12
            </span>
          </div>
          <div className="flex flex-col justify-end w-full md:w-[40%]">
            <span className="text-xs text-grey-light dark:text-white font-medium">
              Your Net APY
            </span>
            <span className="text-xl text-purple-text dark:text-white font-black mt-1 md:text-3xl">
              $15,632,634.12
            </span>
          </div>
        </div>
      </header>

      <div className="flex items-center mt-12 space-x-4">
        <form className="md:w-[80%]">
          <label
            htmlFor="search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="search"
              className="block p-2 pl-8 text-sm text-gray-900 bg-[#DFE4EE] dark:bg-[#482168] border border-grey-light rounded-3xl w-full bg-gray-50 outline-none"
              placeholder="Search by token, farms, Networks, APY’s etc ..."
            />
          </div>
        </form>

        <select
          id="farms"
          className="px-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-[20%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option defaultValue="All Farm">All Farms</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
      </div>
    </>
  );
};

export default HeaderComponent;
