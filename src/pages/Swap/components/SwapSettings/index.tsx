import * as React from "react";
import { observer } from "mobx-react-lite";

// import { Button } from "../../../../components/Button";
// import { Icon } from "../../../../components/Icon";
import { useSwapFormStore } from "../../stores/SwapFormStore";
import { useSwapSettings } from "../../hooks/useSwapSettings";
import { MdOutlineSettings } from "react-icons/md";
import { Menu } from "@headlessui/react";

// import "./index.scss";

function Settings(): JSX.Element {
  const formStore = useSwapFormStore();
  const settings = useSwapSettings();

  return (
    <div className="swap-settings relative z-20 ">
      <Menu>
        <Menu.Button>
          <MdOutlineSettings className="text-2xl" />
        </Menu.Button>
        <Menu.Items>
          <div
            // ref={settings.popupRef}
            className="absolute drop-shadow-xl flex flex-col gap-2 bg-[#FFFFFF] dark:bg-purple-darkest p-5 rounded-lg"
          >
            <h3 className="text-lg font-bold">Transaction Settings</h3>
            <div className="swap-settings__info">
              <div className="">Slippage tolerance</div>
            </div>
            <div className="relative">
              <div className="absolute left-2 top-1">%</div>
              <input
                className="pl-6 py-1 bg-[#F4F5FA] dark:bg-purple rounded"
                inputMode="decimal"
                type="text"
                value={formStore.slippage}
                onBlur={settings.onBlur}
                onChange={settings.onChange}
              />
            </div>
            <div className="flex gap-2">
              <label
                className={`bg-[#F4F5FA] dark:bg-purple p-2 py-1 rounded-lg ${
                  formStore.slippage === "0.1"
                    ? "border-purple dark:border-[#F4F5FA]"
                    : "border-[#F4F5FA] dark:border-purple"
                } border-2`}
              >
                <input
                  type="radio"
                  className="hidden"
                  name="percent"
                  value="0.1"
                  checked={formStore.slippage === "0.1"}
                  onChange={settings.onChange}
                />
                <span className="swap-settings__radio-txt">0.1%</span>
              </label>
              <label
                className={`bg-[#F4F5FA] dark:bg-purple p-2 py-1 rounded-lg ${
                  formStore.slippage === "0.5"
                    ? "border-purple dark:border-[#F4F5FA]"
                    : "border-[#F4F5FA] dark:border-purple"
                } border-2`}
              >
                <input
                  type="radio"
                  name="percent"
                  className="hidden"
                  value="0.5"
                  checked={formStore.slippage === "0.5"}
                  onChange={settings.onChange}
                />
                <span className="swap-settings__radio-txt">0.5%</span>
              </label>
              <label
                className={`bg-[#F4F5FA] dark:bg-purple p-2 py-1 rounded-lg ${
                  formStore.slippage === "1.0"
                    ? "border-purple dark:border-[#F4F5FA]"
                    : "border-[#F4F5FA] dark:border-purple"
                } border-2`}
              >
                <input
                  type="radio"
                  name="percent"
                  className="hidden"
                  value="1.0"
                  checked={formStore.slippage === "1.0"}
                  onChange={settings.onChange}
                />
                <span className="swap-settings__radio-txt">1.0%</span>
              </label>
            </div>
          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
}

export const SwapSettings = observer(Settings);
