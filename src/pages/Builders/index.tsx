const BuildersPage = () => {
  return (
    <div className="max-w-screen-xl m-auto p-8 h-[85vh] md:p-16">
      <div className="items-center w-full md:flex md:justify-between md:w-auto">
        <div className="w-full md:w-[30%]">
          <h1 className="text-4xl font-black">Builder</h1>
        </div>

        <div className="w-full mt-4 flex items-center md:mt-0 md:w-[70%]">
          <div className="md:w-[70%]">
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="">
              <input
                type="text"
                id="table-search"
                className="block p-3 pl-8 text-sm text-gray-900 bg-[#DFE4EE] rounded-3xl w-full bg-gray-50 outline-black font-bold"
                placeholder="Filtering..."
              />
            </div>
          </div>
          <button className="bg-purple w-auto p-3 text-white rounded-full flex justify-center items-center mx-3 md:w-[30%] md:mx-0 md:ml-4 dark:bg-purple-lightest">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v12m6-6H6"
              />
            </svg>
            Create new token
          </button>
        </div>
      </div>

      <div className="relative overflow-x-auto h-96 bg-white border border-grey-lightest rounded-t-xl w-full min-h-screen-xl mt-6 md:mt-8">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="list__header text-md text-grey dark:text-gray-400">
            <tr className="border-b border-grey-lightest">
              <th scope="col" className="list__cell list__cell--left px-6 py-3">
                Name
              </th>
              <th
                scope="col"
                className="list__cell list__cell--center px-6 py-3"
              >
                Symbol
              </th>
              <th
                scope="col"
                className="list__cell list__cell--center px-6 py-3"
              >
                Decimals
              </th>
              <th
                scope="col"
                className="list__cell list__cell--center px-6 py-3"
              >
                Total Supply
              </th>
              <th
                scope="col"
                className="list__cell list__cell--center px-6 py-3"
              >
                Root
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-black text-lg">
              <th
                scope="row"
                className="px-6 py-4 text-gray-900 whitespace-nowrap "
              >
                Everbeans
              </th>
              <td className="px-6 py-4">EVB</td>
              <td className="px-6 py-4">0</td>
              <td className="px-6 py-4">0</td>
              <td className="px-6 py-4">Oxfecs...654ad</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BuildersPage;
