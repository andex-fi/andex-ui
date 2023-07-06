import { Tab } from "@headlessui/react";
//import React from "react";
// import usdc from "../assets/usdc.png";
// import eth from "../assets/eth.png";
// import pax from "../assets/pax.png";
// import ltc from "../assets/ltc.png";
import Activities from "./ActivitiesTab";
import { useTokensCache } from "../state/TokensCacheService";
import { useMemo } from "react";
import { formattedBalance } from "../utils";
import TokenIcon from "./TokenIcon/TokenIcon";

// const assets = [
//   { name: "ETH", logo: eth, balanceInUsd: 1800, balance: 1.01 },
//   { name: "PAX", logo: pax, balanceInUsd: 1800, balance: 1.01 },
//   { name: "USDC", logo: usdc, balanceInUsd: 1800, balance: 1.01 },
//   { name: "LTC", logo: ltc, balanceInUsd: 1800, balance: 1.01 },
// ];

const Assets = () => {
  const tokensCache = useTokensCache();

  const assets = useMemo(
    () =>
      tokensCache.tokens.filter(
        (token) => token.balance && token.balance !== "0"
      ),
    [tokensCache.tokens]
  );

  return (
    <div className="flex flex-col gap-3">
      {assets.map((asset) => (
        <div className="flex gap-2 items-center">
          {asset.icon ? (
            <img className="w-10 h-10" src={asset?.icon} />
          ) : (
            <TokenIcon className="w-10 h-10" address={asset.root} />
          )}
          <div className="font-[600] flex-1">{asset.symbol}</div>
          <div className="flex flex-col text-[#7F8FA9] text-right">
            <div className="font-[600] text-[15px]">
              {formattedBalance(asset.balance, asset.decimals)}
            </div>
            {/* <div className="text-[10px]">{`${asset.balanceInUsd} USDT`}</div> */}
          </div>
        </div>
      ))}
    </div>
  );
};

const AccountTabs: React.FC = () => {
  return (
    <div>
      <Tab.Group>
        <Tab.List className="flex mb-2 space-x-4">
          {["Activity", "Token"].map((item) => (
            <Tab
              className={({ selected }) =>
                `${
                  selected ? "text-[#52058F] dark:text-white" : "text-[#6D87AC]"
                } font-[600]`
              }
            >
              {item}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          <div className="max-h-[300px] overflow-y-auto">
            <Tab.Panel>
              <Activities />
            </Tab.Panel>
            <Tab.Panel>
              <Assets />
            </Tab.Panel>
          </div>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default AccountTabs;
