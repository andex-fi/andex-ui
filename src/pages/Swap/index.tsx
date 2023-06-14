import * as React from "react";
import classNames from "classnames";
import { Observer } from "mobx-react-lite";
// import { useIntl } from "react-intl";

// import { Icon } from '@/components/common/Icon'
import {
  ConversionSubmitButton,
  ConversionTransactionReceipt,
  //   CrossExchangeSubmitButton,
  MultiSwapConfirmationPopup,
  SwapBill,
  SwapConfirmationPopup,
  SwapField,
  SwapNotation,
  SwapPrice,
  SwapSettings,
  SwapSubmitButton,
  SwapTransactionReceipt,
} from "./components";
import { useSwapForm } from "./hooks/useSwapForm";
import { useSwapFormStore } from "./stores/SwapFormStore";
import { SwapDirection } from "./types";
// import { TokensList } from '../Launch/components'
import { TokenImportPopup } from "../../components/TokenImportPopup";

// import "./index.scss";
import { TokensList } from "../../components/TokensList";
import { ArrowsUpDownIcon } from "@heroicons/react/20/solid";

export function Swap(): JSX.Element {
  //   const intl = useIntl();
  const formStore = useSwapFormStore();
  const tokensCache = formStore.useTokensCache;
  const wallet = formStore.useWallet;
  const form = useSwapForm();

  return (
    <div className="flex justify-center items-center h-full m-auto px-4 md:p-20 drop-shadow-2xl ">
      <div className="swap-container">
        <SwapNotation />
        <div className="w-full text-black dark:text-white md:w-[32rem]">
          <div className="h-53 p-2 px-4 rounded-t-3xl bg-[#F4F5FA] dark:bg-purple">
            <header className="flex items-center justify-between pr-8">
              <Observer>{() => <h2 className="m-6 text-xl">Swap</h2>}</Observer>

              <SwapSettings />
            </header>

            <div>
              <Observer>
                {() => (
                  <SwapField
                    key="leftField"
                    balance={formStore.formattedLeftBalance}
                    disabled={formStore.isLoading || formStore.isSwapping}
                    id="leftField"
                    isMultiple={formStore.isMultipleSwapMode}
                    isValid={
                      formStore.isLoading ||
                      formStore.isSwapping ||
                      formStore.isLeftAmountValid
                    }
                    nativeCoin={
                      formStore.isMultipleSwapMode ||
                      formStore.nativeCoinSide === "leftToken"
                        ? formStore.coin
                        : undefined
                    }
                    readOnly={formStore.isPreparing || formStore.isSwapping}
                    showMaximizeButton={formStore.leftBalanceNumber.gt(0)}
                    token={formStore.leftToken}
                    value={formStore.leftAmount}
                    onChange={form.onChangeLeftAmount}
                    onMaximize={formStore.maximizeLeftAmount}
                    onToggleTokensList={form.showTokensList("leftToken")}
                  />
                )}
              </Observer>
            </div>
          </div>
          <Observer>
            {() => (
              <div
                className={classNames("flex flex-row justify-center", {
                  disabled:
                    formStore.isPreparing ||
                    formStore.isLoading ||
                    formStore.isSwapping,
                })}
                onClick={
                  formStore.isConversionMode
                    ? form.toggleConversionDirection
                    : form.toggleSwapDirection
                }
              >
                <ArrowsUpDownIcon className="w-[2rem] z-10 -m-4 p-1 bg-white drop-shadow-xl text-[#3a93ed] dark:text-white text-blue dark:bg-purple-light rounded rounded-full" />
              </div>
            )}
          </Observer>
          <div className="flex flex-col relative w-full p-2 px-4 rounded-b-3xl bg-[#FFFFFF] dark:bg-purple-darkest">
            <Observer>
              {() => (
                <SwapField
                  key="rightField"
                  balance={formStore.formattedRightBalance}
                  disabled={formStore.isLoading || formStore.isSwapping}
                  id="rightField"
                  isValid={
                    formStore.isCalculating ||
                    formStore.isLoading ||
                    formStore.isSwapping ||
                    formStore.isRightAmountValid
                  }
                  nativeCoin={
                    formStore.nativeCoinSide === "rightToken"
                      ? formStore.coin
                      : undefined
                  }
                  readOnly={formStore.isPreparing || formStore.isSwapping}
                  token={formStore.rightToken}
                  value={formStore.rightAmount}
                  onChange={form.onChangeRightAmount}
                  onToggleTokensList={form.showTokensList("rightToken")}
                />
              )}
            </Observer>

            <Observer>
              {() => (
                <>
                  {wallet.isConnected &&
                    !formStore.isPreparing &&
                    !formStore.isConversionMode && <SwapPrice key="price" />}
                </>
              )}
            </Observer>

            <Observer>
              {() => {
                switch (true) {
                  case formStore.isConversionMode:
                    return (
                      <ConversionSubmitButton key="conversionSubmitButton" />
                    );

                  // case formStore.isCrossExchangeMode:
                  //   return (
                  //     <CrossExchangeSubmitButton key="crossExchangeSubmitButton" />
                  //   );

                  default:
                    return <SwapSubmitButton key="submitButton" />;
                }
              }}
            </Observer>
          </div>
          <Observer>
            {() => (
              <>
                {!formStore.isConversionMode &&
                  formStore.rightAmount &&
                  formStore.leftAmount && (
                    <div className="mt-10 bg-[#F4F5FA] rounded-3xl p-5 dark:bg-purple drop-shadow-2xl ">
                      <SwapBill
                        key="bill"
                        fee={formStore.swap.fee}
                        isCrossExchangeAvailable={false}
                        isCrossExchangeMode={formStore.isCrossExchangeMode}
                        leftToken={
                          formStore.nativeCoinSide === "leftToken"
                            ? formStore.coin
                            : formStore.leftToken
                        }
                        minExpectedAmount={formStore.swap.minExpectedAmount}
                        priceImpact={formStore.swap.priceImpact}
                        rightToken={
                          formStore.nativeCoinSide === "rightToken"
                            ? formStore.coin
                            : formStore.rightToken
                        }
                        slippage={formStore.swap.slippage}
                        // tokens={formStore.route?.tokens}
                      />
                    </div>
                  )}
              </>
            )}
          </Observer>
        </div>
      </div>

      <SwapTransactionReceipt key="swap-transaction-receipt" />

      <ConversionTransactionReceipt key="conversion-transaction-receipt" />

      <Observer>
        {() => (
          <>
            {formStore.isConfirmationAwait && (
              <>
                {formStore.isMultipleSwapMode ? (
                  <MultiSwapConfirmationPopup key="multiSwapConfirmationPopup" />
                ) : (
                  <SwapConfirmationPopup
                    isOpen={
                      formStore.isConfirmationAwait &&
                      !formStore.isMultipleSwapMode
                    }
                    key="confirmationPopup"
                  />
                )}
              </>
            )}
          </>
        )}
      </Observer>

      {form.isTokenListShown && form.tokenSide === "leftToken" && (
        <TokensList
          key="leftTokensList"
          allowMultiple
          isOpen={form.isTokenListShown && form.tokenSide === "leftToken"}
          currentToken={formStore.leftToken}
          currentTokenSide="leftToken"
          isMultiple={formStore.isMultipleSwapMode}
          combinedTokenRoot={formStore.multipleSwapTokenRoot}
          nativeCoin={formStore.coin}
          nativeCoinSide={formStore.nativeCoinSide}
          onDismiss={form.hideTokensList}
          onSelectMultipleSwap={form.onSelectMultipleSwap}
          onSelectNativeCoin={form.onSelectLeftNativeCoin}
          onSelectToken={form.onSelectLeftToken}
        />
      )}

      {form.isTokenListShown && form.tokenSide === "rightToken" && (
        <TokensList
          key="rightTokensList"
          allowMultiple={false}
          currentToken={formStore.rightToken}
          isOpen={form.isTokenListShown && form.tokenSide === "rightToken"}
          currentTokenSide="rightToken"
          isMultiple={formStore.isMultipleSwapMode}
          combinedTokenRoot={formStore.multipleSwapTokenRoot}
          nativeCoin={formStore.coin}
          nativeCoinSide={formStore.nativeCoinSide}
          onDismiss={form.hideTokensList}
          onSelectNativeCoin={form.onSelectRightNativeCoin}
          onSelectToken={form.onSelectRightToken}
        />
      )}

      <Observer>
        {() => (
          <>
            {
              <TokenImportPopup
                isOpen={tokensCache.isImporting}
                key="tokenImport"
              />
            }
          </>
        )}
      </Observer>
    </div>
  );
}
