import React from "react";
import { useAddLiquidityFormStoreContext } from "../../../contexts/AddLiquidityFormStoreContext";
// import { Approveliquidity } from "./approveliquidity";
import { Link, useParams } from "react-router-dom";
import { URLTokensParams } from "../../../routes";
import { useAddLiquidityForm } from "../hooks/useAddLiquidityForm";
// import BigNumber from "bignumber.js";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { Observer } from "mobx-react-lite";
import { AddLiquiditySubmitButton } from "./AddLiquiditySubmitButton";
// import { error } from "console";
import { reaction } from "mobx";
import { error } from "../../../utils";
import { TokenSelector } from "../../../components/TokenSelector";
import { useField } from "../../../hooks";
// import Navbar from "../../../components/Navbar";

function AddLiquidity() {
  const { leftTokenRoot, rightTokenRoot } = useParams<URLTokensParams>();

  const formStore = useAddLiquidityFormStoreContext();
  const form = useAddLiquidityForm();

  const rightField = useField({
    decimals: formStore.rightToken?.decimals,
    value: formStore.rightAmount,
    onChange: form.onChangeRightAmount,
  });
  const leftField = useField({
    decimals: formStore.leftToken?.decimals,
    value: formStore.leftAmount,
    onChange: form.onChangeLeftAmount,
  });

  // const maximizeLeftAmount = React.useCallback(async () => {
  //   await formStore.changeLeftAmount(
  //     new BigNumber(formStore.leftBalance)
  //       .shiftedBy(-(formStore.leftDecimals ?? 0))
  //       .toFixed()
  //   );
  // }, []);

  // const maximizeRightAmount = React.useCallback(async () => {
  //   await formStore.changeRightAmount(
  //     new BigNumber(formStore.rightBalance)
  //       .shiftedBy(-(formStore.rightDecimals ?? 0))
  //       .toFixed()
  //   );
  // }, []);

  // const onLeftImportConfirm = React.useCallback(
  //   (value: string) => {
  //     form.onLeftImportConfirm(value, rightTokenRoot);
  //   },
  //   [leftTokenRoot, rightTokenRoot]
  // );

  // const onRightImportConfirm = React.useCallback(
  //   (value: string) => {
  //     if (leftTokenRoot) {
  //       form.onRightImportConfirm(leftTokenRoot, value);
  //     }
  //   },
  //   [leftTokenRoot, rightTokenRoot]
  // );

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
  }, [form, formStore, leftTokenRoot, rightTokenRoot]);

  return (
    <div className="flex items-center justify-center w-full h-screen font-montserrat bg-[#EBF1FF] dark:bg-purple-dark p-4">
      <div className="w-full md:w-[30rem] bg-white dark:bg-purple-light rounded-2xl p-6">
        <div className="w-full flex items-center justify-between">
          <Link to="/pools">
            <MdOutlineKeyboardArrowLeft />
          </Link>
          <h3 className="font-extrabold">Add Liquidity</h3>
          <FiSettings />
        </div>

        <Observer>
          {() => (
            <div className="mt-8 flex  justify-between items-center">
              <input
                pattern="^[0-9]*[.]?[0-9]*$"
                value={formStore.leftAmount}
                placeholder="0.0"
                type="text"
                inputMode="decimal"
                onChange={leftField.onChange}
                className="text-5xl w-[80%] dark:bg-purple-light dark:text-white dark:opacity-80"
              />
              <TokenSelector
                root={formStore.leftToken?.root}
                onSelect={form.onSelectLeftToken}
                showIcon
              />
            </div>
          )}
        </Observer>
        <div className="flex items-center justify-center  w-full mt-8">
          <div className="w-5 h-5 rounded-full bg-[#E5E5E5] dark:bg-purple-dark flex items-center justify-center">
            <p className="text-[#3189EE] text-lg">+</p>
          </div>
        </div>

        <Observer>
          {() => (
            <div className="mt-8 flex justify-between items-center">
              <input
                pattern="^[0-9]*[.]?[0-9]*$"
                placeholder="0.0"
                value={formStore.rightAmount}
                type="text"
                onChange={rightField.onChange}
                inputMode="decimal"
                className="text-5xl w-[80%] dark:bg-purple-light dark:text-white dark:opacity-80"
              />
              <TokenSelector
                root={formStore.rightToken?.root}
                onSelect={form.onSelectRightToken}
                showIcon
              />
            </div>
          )}
        </Observer>

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
                      {formStore.currentShareLeft}
                    </h3>
                    <p className="text-[#7F8FA9] dark:text-white dark:opacity-80 text-sm">
                      {`${formStore.leftToken?.symbol} per ${formStore.rightToken?.symbol}`}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-[#13173E] dark:text-white font-extrabold">
                      {formStore.currentShareRight}
                    </h3>
                    <p className="text-[#7F8FA9] dark:text-white dark:opacity-80 text-sm">
                      {`${formStore.rightToken?.symbol} per ${formStore.leftToken?.symbol} `}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-[#13173E] dark:text-white font-extrabold">
                      {formStore.currentSharePercent}
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
