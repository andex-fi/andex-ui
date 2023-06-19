import { FC } from "react";
import { Actions } from "./actions";

interface tokenDetails {
  name: string;
  value: string | number;
}

export const Managetoken: FC = () => {
  const token: tokenDetails[] = [
    { name: "Network", value: "Mainnet" },
    {
      name: "Root",
      value: "0:a5c7faa181d88c7338d91fa8578cef02d7a118188844d84..",
    },
    { name: "Token Name", value: "Manny Token" },
    { name: "Token Symbol", value: "MANNY" },
    { name: "Decimal Places", value: 18 },
    { name: "Total Supply", value: 18 },
  ];
  return (
    <div
      className={`flex flex-col items-center min-h-[90vh] justify-center w-full font-montserrat bg-[#EBF1FF] dark:bg-purple-dark p-4 py-10 md:py-24`}
    >
      <div className="lg:w-[60%] w-full mb-8">
        <h3 className="text-[#13173E] dark:text-white font-bold  text-lg">
          Manage Token
        </h3>
      </div>

      <div className="bg-white dark:bg-purple-light rounded-xl lg:flex items-start gap-4 w-full lg:w-[60%] p-6">
        <div className="w-full lg:w-[50%]">
          <h4 className="text-[#13173E] dark:text-white font-bold">
            Description
          </h4>
          {token.map((item, key) => (
            <div
              key={key}
              className="bg-[#F4F5FA] dark:bg-purple-darkest rounded-lg mt-4 flex flex-col gap-2 p-2 overflow-hidden"
            >
              <h4 className="text-[#7F8FA9] dark:text-white text-sm">
                {item.name}
              </h4>
              <p className="text-[#13173E] dark:text-white font-bold text-sm">
                {item.value}
              </p>
            </div>
          ))}
        </div>
        <Actions />
      </div>
    </div>
  );
};
