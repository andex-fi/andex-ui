import React from "react";
import { useAddLiquidityFormStoreContext } from "../../../contexts/AddLiquidityFormStoreContext";
// import { Approveliquidity } from "./approveliquidity";
import { Link, useParams } from "react-router-dom";
import { URLTokensParams } from "../../../routes";
import { useAddLiquidityForm } from "../hooks/useAddLiquidityForm";
import BigNumber from "bignumber.js";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { Selecttoken } from "../../pools/selecttoken";
import { Observer } from "mobx-react-lite";
import { AddLiquiditySubmitButton } from "./AddLiquiditySubmitButton";
// import { error } from "console";
import { reaction } from "mobx";
import { error } from "../../../utils";
import { TokenSelector } from "../../../components/TokenSelector";

function AddLiquidity() {
  const { leftTokenRoot, rightTokenRoot } = useParams<URLTokensParams>();

  const formStore = useAddLiquidityFormStoreContext();
  const form = useAddLiquidityForm();
  console.log(formStore);

  const maximizeLeftAmount = React.useCallback(async () => {
    await formStore.changeLeftAmount(
      new BigNumber(formStore.leftBalance)
        .shiftedBy(-(formStore.leftDecimals ?? 0))
        .toFixed()
    );
  }, []);

  const maximizeRightAmount = React.useCallback(async () => {
    await formStore.changeRightAmount(
      new BigNumber(formStore.rightBalance)
        .shiftedBy(-(formStore.rightDecimals ?? 0))
        .toFixed()
    );
  }, []);

  const onLeftImportConfirm = React.useCallback(
    (value: string) => {
      form.onLeftImportConfirm(value, rightTokenRoot);
    },
    [leftTokenRoot, rightTokenRoot]
  );

  const onRightImportConfirm = React.useCallback(
    (value: string) => {
      if (leftTokenRoot) {
        form.onRightImportConfirm(leftTokenRoot, value);
      }
    },
    [leftTokenRoot, rightTokenRoot]
  );

  React.useEffect(() => {
    const tokensListDisposer = reaction(
      () => formStore.tokensCache.isReady,
      async (isReady) => {
        formStore.setState("isPreparing", true);
        if (isReady) {
          try {
            await form.resolveStateFromUrl(leftTokenRoot, rightTokenRoot);
            await formStore.init();
          } catch (e) {
            error("Add Liquidity Form Store initializing error", e);
          } finally {
            formStore.setState("isPreparing", false);
          }
        }
      },
      { fireImmediately: true }
    );

    return () => {
      tokensListDisposer();
      formStore.dispose().catch((reason) => error(reason));
    };
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-screen font-montserrat bg-[#EBF1FF] dark:bg-purple-dark">
      <div className="w-full md:w-[30rem] bg-white dark:bg-purple-light rounded-2xl p-6">
        <div className="w-full flex items-center justify-between">
          <Link to="/pools">
            <MdOutlineKeyboardArrowLeft />
          </Link>
          <h3 className="font-extrabold">Add Liquidity</h3>
          <FiSettings />
        </div>

        <div className="">
          <TokenSelector />
        </div>
        <div className="flex items-center justify-center  w-full mt-8">
          <div className="w-5 h-5 rounded-full bg-[#E5E5E5] dark:bg-purple-dark flex items-center justify-center">
            <p className="text-[#3189EE] text-lg">+</p>
          </div>
        </div>
        <div>
          <TokenSelector />
        </div>

        <Observer>
          {() =>
            formStore.rightToken && formStore.leftAmount ? (
              <div className="mt-3">
                <h4 className="text-[#7F8FA9] text-sm font-bold">
                  Prices and pool share
                </h4>
                <div className="mt-2 flex items-center justify-between w-full">
                  <div>
                    <h3 className="text-[#13173E] dark:text-white font-extrabold">
                      960.7826
                    </h3>
                    <p className="text-[#7F8FA9] dark:text-white dark:opacity-80 text-sm">
                      BUSD per ETH
                    </p>
                  </div>
                  <div>
                    <h3 className="text-[#13173E] dark:text-white font-extrabold">
                      0.001040818
                    </h3>
                    <p className="text-[#7F8FA9] dark:text-white dark:opacity-80 text-sm">
                      ETH per BUSD
                    </p>
                  </div>
                  <div>
                    <h3 className="text-[#13173E] dark:text-white font-extrabold">
                      16%
                    </h3>
                    <p className="text-[#7F8FA9] dark:text-white dark:opacity-80 text-sm">
                      Share of pool
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
            )
          }
        </Observer>

        <AddLiquiditySubmitButton />
      </div>
    </div>
  );
}

export default AddLiquidity;
