/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Observer } from "mobx-react-lite";
import { reaction } from "mobx";

import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import TokenSelector from "../../../components/TokenSelector";
import Warning from "../../../components/Warning";
import { Link, useParams } from "react-router-dom";
import { URLTokensParams } from "../../../routes";
import { useImportLiquidityForm } from "../hooks/useImportLiquidityForm";
import { useImportLiquidityFormStoreContext } from "../../../contexts";
import {
  error,
  formattedTokenAmount,
  isGoodBignumber,
  //   makeArray,
  stripHtmlTags,
  //   uniqueId,
} from "../../../utils";
import { useFavoritePools } from "../../../state/FavoritePairs";
import { Oval } from "react-loader-spinner";
import { Button } from "../../../components/Button";
import { NotifyType, notify } from "../../../components/Notification";
// import { useFavoritesPoolsStorage } from "../../pools/hooks/useFavoritesPoolsStorage";
// import { RemoveLiquiditySubmitButton } from "./RemoveLiquiditySubmitButton";

export function ImportLiquidity(): JSX.Element {
  // const { address, connect } = useAccountContext();
  const { leftTokenRoot, rightTokenRoot } = useParams<URLTokensParams>();

  const formStore = useImportLiquidityFormStoreContext();
  const form = useImportLiquidityForm();
  const storage = useFavoritePools();

  //   const onMaximize = () => {
  //     formStore.setData(
  //       "amount",
  //       new BigNumber(formStore.pool?.lp.userBalance ?? 0)
  //         .shiftedBy(-(formStore.pool?.lp.decimals ?? 0))
  //         .toFixed()
  //     );
  //   };

  useEffect(() => {
    const tokensListDisposer = reaction(
      () => formStore.tokensCache.isReady,
      async (isReady) => {
        formStore.setState("isPreparing", true);
        if (isReady) {
          try {
            await form.resolveStateFromUrl(leftTokenRoot, rightTokenRoot);
            await formStore.init();
          } catch (e) {
            error("Remove Liquidity Form Store initializing error", e);
          } finally {
            formStore.setState("isPreparing", false);
          }
        }
      },
      { fireImmediately: true }
    );

    return () => {
      tokensListDisposer();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formStore.dispose().catch((reason: any) => error(reason));
    };
  }, []);

  return (
    <div className="flex items-center justify-center w-full overflow-y-auto font-montserrat p-4 py-10">
      <div className="w-full md:w-[40rem] bg-white dark:bg-purple-light rounded-2xl p-6">
        <div className="w-full flex items-center justify-between mb-4">
          <Link to="/pools">
            <MdOutlineKeyboardArrowLeft />
          </Link>
          <h3 className="font-extrabold">Import Liquidity</h3>
          <FiSettings />
        </div>

        <Observer>
          {() => {
            const isSyncingPool =
              formStore.isSyncingPool === undefined || formStore.isSyncingPool;
            const tokensSelected =
              formStore.leftToken?.root !== undefined &&
              formStore.rightToken?.root !== undefined;

            return (
              <div className="flex flex-col gap-5">
                <div className="flex gap-10">
                  {/* <div className="w-1/2"> */}
                  <TokenSelector
                    root={formStore.leftToken?.root}
                    showIcon
                    size="medium"
                    onSelect={form.onSelectLeftToken}
                  />
                  {/* </div>
                  <div className="w-1/2"> */}
                  <TokenSelector
                    disabled={isSyncingPool}
                    root={formStore.rightToken?.root}
                    showIcon
                    size="medium"
                    onSelect={form.onSelectRightToken}
                  />
                  {/* </div>  */}
                </div>

                {formStore.wallet.isReady &&
                  formStore.pool !== undefined &&
                  !isGoodBignumber(formStore.pool?.lp.userBalance ?? 0) &&
                  formStore.isSyncingPool === false &&
                  tokensSelected && (
                    <Warning
                      title="No liquidity in this pool"
                      text={`It seems you don’t have any liquidity locked in this pool. Make sure you have ${stripHtmlTags(
                        formStore.pool.lp.symbol ?? ""
                      )} token at your wallet balance. If you use LP tokens for farming, make sure to withdraw them from the farm first`}
                    />
                  )}

                {formStore.wallet.isReady &&
                  formStore.pool === undefined &&
                  formStore.isSyncingPool === false &&
                  tokensSelected && (
                    <Warning
                      title="Pool doesn't exist"
                      text="You need to create pool, before you can to continue."
                    />
                  )}

                {isSyncingPool && tokensSelected ? (
                  <>
                    <div>
                      <Oval
                        height={20}
                        width={20}
                        strokeWidth={5}
                        strokeWidthSecondary={5}
                        color={"rgba(255, 255, 255)"}
                        secondaryColor="#52058F"
                      />
                    </div>
                  </>
                ) : (
                  formStore.wallet.isReady &&
                  formStore.pool !== undefined &&
                  formStore.leftToken !== undefined &&
                  formStore.rightToken !== undefined &&
                  isGoodBignumber(formStore.pool?.lp.userBalance ?? 0) &&
                  formStore.isSyncingPool === false && (
                    <>
                      <div>
                        <div
                          className="liquidity-remove-form__hint"
                          dangerouslySetInnerHTML={{
                            __html: formStore.isAmountValid
                              ? `Available balance: ${formattedTokenAmount(
                                  formStore.pool.lp.userBalance,
                                  formStore.pool.lp.decimals,
                                  { preserve: true, roundOn: false }
                                )}`
                              : `Available balance: ${formattedTokenAmount(
                                  formStore.pool.lp.userBalance,
                                  formStore.pool.lp.decimals,
                                  { preserve: true, roundOn: false }
                                )}. Requested amount is too big`,
                          }}
                        />
                      </div>
                    </>
                  )
                )}
              </div>
            );
          }}
        </Observer>
        <Observer>
          {() =>
            formStore.wallet.isReady &&
            formStore.pool !== undefined &&
            formStore.isSyncingPool === false &&
            formStore.leftToken?.root !== undefined &&
            formStore.rightToken?.root !== undefined ? (
              <Button
                block
                className="form-submit"
                onClick={() => {
                  if (formStore?.pool?.address !== undefined) {
                    storage.add(formStore.pool.address.toString());
                    notify(
                      <div className="notification-body">
                        Liquidity Pool Imported
                      </div>,
                      undefined,
                      { type: NotifyType.SUCCESS }
                    );
                  }
                }}
                size="lg"
                type="primary"
                btnStyles="bg-[#52058F] dark:bg-purple-lightest text-white flex items-center justify-center w-full rounded-lg py-3 mt-4"
              >
                Import
              </Button>
            ) : (
              //   <RemoveLiquiditySubmitButton />

              <div></div>
            )
          }
        </Observer>
      </div>
    </div>
  );
}
