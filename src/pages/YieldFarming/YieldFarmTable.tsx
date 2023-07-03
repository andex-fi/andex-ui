const YieldFarmTableComponent = () => {
  return (
    <div className="relative overflow-x-auto h-[40.5vh] bg-white border border-grey-lightest rounded-lg w-full min-h-screen-xl mt-6 md:mt-8 dark:bg-purple">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="list__header text-md text-grey dark:text-gray-400">
          <tr className="border-b border-grey-lightest">
            <th scope="col" className="list__cell list__cell--left px-6 py-3">
              Farm
            </th>
            <th scope="col" className="list__cell list__cell--center px-6 py-3">
              APY
            </th>
            <th scope="col" className="list__cell list__cell--center px-6 py-3">
              Total Deposits
            </th>
            <th scope="col" className="list__cell list__cell--center px-6 py-3">
              My Deposits
            </th>
            <th scope="col" className="list__cell list__cell--center px-6 py-3">
              Available to Deposit
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="font-black text-lg border-b border-grey-lightest">
            <th
              scope="row"
              className="uppercase px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
            >
              Venom/usd
            </th>
            <td className="px-6 py-4">16.02%</td>
            <td className="px-6 py-4">$613.7m</td>
            <td className="px-6 py-4">$613.7m</td>
            <td className="px-6 py-4">$613.7m</td>
          </tr>
          <tr className="font-black text-lg border-b border-grey-lightest">
            <th
              scope="row"
              className="uppercase px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
            >
              Venom/usd
            </th>
            <td className="px-6 py-4">16.02%</td>
            <td className="px-6 py-4">$613.7m</td>
            <td className="px-6 py-4">$613.7m</td>
            <td className="px-6 py-4">$613.7m</td>
          </tr>
          <tr className="font-black text-lg border-b border-grey-lightest">
            <th
              scope="row"
              className="uppercase px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
            >
              Venom/usd
            </th>
            <td className="px-6 py-4">16.02%</td>
            <td className="px-6 py-4">$613.7m</td>
            <td className="px-6 py-4">$613.7m</td>
            <td className="px-6 py-4">$613.7m</td>
          </tr>
          <tr className="font-black text-lg border-b border-grey-lightest">
            <th
              scope="row"
              className="uppercase px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
            >
              Venom/usd
            </th>
            <td className="px-6 py-4">16.02%</td>
            <td className="px-6 py-4">$613.7m</td>
            <td className="px-6 py-4">$613.7m</td>
            <td className="px-6 py-4">$613.7m</td>
          </tr>
          <tr className="font-black text-lg border-b border-grey-lightest">
            <th
              scope="row"
              className="uppercase px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
            >
              Venom/usd
            </th>
            <td className="px-6 py-4">16.02%</td>
            <td className="px-6 py-4">$613.7m</td>
            <td className="px-6 py-4">$613.7m</td>
            <td className="px-6 py-4">$613.7m</td>
          </tr>
        </tbody>
      </table>

      {/* <Button children={undefined} /> */}

    </div>
  );
};

export default YieldFarmTableComponent;
