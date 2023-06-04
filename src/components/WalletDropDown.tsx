import { Menu } from "@headlessui/react";
import jazzicon from "@metamask/jazzicon";
import { useEffect, useRef, ButtonHTMLAttributes } from "react";
import { useAccountContext } from "../hooks/useAccountContext";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
// import { MdOutlineSettings } from "react-icons/md";

import copy from "../assets/Copy_light.png";
import settings from "../assets/Setting_line_light.png";
import out from "../assets/Out_light.png";
import power from "../assets/On_button_light.png";
import AccountTabs from "./AccountTabs";
// import { useNavigate } from "react-router-dom";

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
  const { address } = useAccountContext();
  useEffect(() => {
    if (address && ref.current) {
      ref.current.innerHTML = "";
      ref.current.appendChild(
        jazzicon(width, parseInt(address.slice(2, 10), 16))
      );
    }
  }, [address]);
  return (
    <div
      className={`w-[${width}px] h-[${width}px] rounded-[${width * 1.5}px]`}
      ref={ref as any}
    ></div>
  );
};

function WalletDropDown() {
  const { address, balance, disconnect } = useAccountContext();
  return (
    <div>
      <Menu as="div" className="relative text-left w-auto inline-block">
        {({ open }) => (
          <>
            <Menu.Button className="items-center flex-row w-auto rounded-3xl bg-[#983BF6] gap-1 p-1 text-sm font-semibold text-white flex">
              <div className="flex items-center gap-2">
                <Identicon width={30} />
                <div>{`${address?.slice(0, 6)}...${address?.slice(-5)}`}</div>
                {open ? (
                  <ChevronUpIcon className="block w-5 h-5 text-white" />
                ) : (
                  <ChevronDownIcon className="block w-5 h-5 text-white" />
                )}
              </div>
            </Menu.Button>
            <Menu.Items className="absolute z-10 p-6 right-0 mt-6 w-[380px] origin-top-right divide-y divide-gray-100 rounded-xl bg-white dark:bg-purple-light shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="flex flex-col gap-3 ">
                <Menu.Item>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1 text-[16px] font-[600] items-center">
                      <Identicon width={24} />
                      <div>{`${address?.slice(0, 6)}...${address?.slice(
                        -5
                      )}`}</div>
                    </div>
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
                  <div className="font-[600] text-[25px]">{`${(
                    balance /
                    10 ** 9
                  ).toFixed(2)} VENOM`}</div>
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
