/* eslint-disable @typescript-eslint/no-explicit-any */
import { Menu } from "@headlessui/react";
import jazzicon from "@metamask/jazzicon";
import { useEffect, useRef, ButtonHTMLAttributes } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";

import copy from "../assets/Copy_light.png";
import settings from "../assets/Setting_line_light.png";
import out from "../assets/Out_light.png";
import power from "../assets/On_button_light.png";
import AccountTabs from "./AccountTabs";
import { useWallet } from "../hooks";
import { Observer } from "mobx-react-lite";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
}

const IconButtons = ({ icon, className, ...props }: IconButtonProps) => {
  return (
    <button className={`bg-[#F4F5FA] rounded-full p-2 ${className}`} {...props}>
      <img src={icon} />
    </button>
  );
};

const Identicon = ({ width }: { width: number }) => {
  const ref = useRef<HTMLDivElement>();
  const { address } = useWallet();
  useEffect(() => {
    if (address && ref.current) {
      ref.current.innerHTML = "";
      ref.current.appendChild(
        jazzicon(width, parseInt(address.slice(2, 10), 16))
      );
    }
  }, [address, width]);
  return (
    <div
      className={`w-[${width}px] h-[${width}px] rounded-[${width * 1.5}px]`}
      ref={ref as any}
    ></div>
  );
};

const WalletDropDown: React.FC = () => {
  const { address, balance, disconnect } = useWallet();
  return (
    <div>
      <Menu as="div" className="relative text-left w-auto inline-block">
        {({ open }) => (
          <>
            <Menu.Button
              className="items-center flex-row w-auto rounded-3xl border border-[#6D87AC] dark:border-[#A086C0] bg-[#EBF1FF]  dark:bg-[#34184B]  text-sm font-semibold text-[#13173E] dark:text-white flex"
              style={{ border: "1px solid #6D87AC" }}
            >
              <div className="flex items-center gap-2 pl-1.5 pt-0.5 pr-1.5">
                <div className="mt-1">
                  {" "}
                  <Identicon width={30} />{" "}
                </div>
                <Observer>
                  {() => (
                    <div>{`${address?.slice(0, 6)}...${address?.slice(
                      -5
                    )}`}</div>
                  )}
                </Observer>
                {open ? (
                  <ChevronUpIcon className="block w-5 h-5 text-[#6D87AC] dark:text-white" />
                ) : (
                  <ChevronDownIcon className="block w-5 h-5 text-[#6D87AC] dark:text-white" />
                )}
              </div>
            </Menu.Button>
            <Menu.Items className="absolute z-10 p-6 right-0 mt-6 w-[380px] origin-top-right divide-y divide-gray-100 rounded-xl bg-white dark:bg-purple-light shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="flex flex-col gap-3 ">
                <Menu.Item>
                  <div className="flex justify-between items-center">
                    <Observer>
                      {() => (
                        <div className="flex gap-2 text-[16px] font-[600] items-center">
                          <div className="mt-1">
                            <Identicon width={24} />
                          </div>
                          <div>{`${address?.slice(0, 6)}...${address?.slice(
                            -5
                          )}`}</div>
                        </div>
                      )}
                    </Observer>
                    <div className="flex gap-1">
                      <IconButtons icon={settings} />
                      <IconButtons icon={copy} />
                      <IconButtons
                        onClick={() => {
                          window.open(
                            `https://devnet.venomscan.com/accounts/${address}`,
                            "_blank"
                          );
                        }}
                        icon={out}
                      />
                      <IconButtons
                        onClick={() => {
                          disconnect();
                        }}
                        icon={power}
                      />
                    </div>
                  </div>
                </Menu.Item>
                <Menu.Item>
                  <Observer>
                    {() => (
                      <div className="font-[600] text-[25px]">{`${(
                        Number(balance) /
                        10 ** 9
                      ).toFixed(2)} VENOM`}</div>
                    )}
                  </Observer>
                </Menu.Item>
                <Menu.Item>
                  <AccountTabs />
                </Menu.Item>
              </div>
            </Menu.Items>
          </>
        )}
      </Menu>
    </div>
  );
}

export default WalletDropDown;
