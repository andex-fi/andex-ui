import * as React from "react";
import { observer } from "mobx-react-lite";

import { Button } from "../../../../components/Button";
import { Icon } from "../../../../components/Icon";
import { useSwapFormStore } from "../../stores/SwapFormStore";
import { SwapDirection } from "../../types";
import { formattedTokenAmount } from "../../../../utils";

// import "./index.scss";

function Price(): JSX.Element | null {
  const formStore = useSwapFormStore();

  const leftSymbol = React.useMemo(() => {
    if (
      formStore.nativeCoinSide === "leftToken" ||
      (!formStore.multipleSwap.isEnoughTokenBalance &&
        formStore.multipleSwap.isEnoughCoinBalance)
    ) {
      return formStore.coin.symbol;
    }
    return formStore.leftToken?.symbol;
  }, [
    formStore.leftToken?.symbol,
    formStore.nativeCoinSide,
    formStore.multipleSwap.isEnoughTokenBalance,
  ]);

  const rightSymbol = React.useMemo(() => {
    if (formStore.nativeCoinSide === "rightToken") {
      return formStore.coin.symbol;
    }
    return formStore.rightToken?.symbol;
  }, [formStore.rightToken?.symbol, formStore.nativeCoinSide]);

  if (formStore.leftToken === undefined || formStore.rightToken === undefined) {
    return null;
  }

  return (
    <div className="form-row swap-price">
      <div>
        {(() => {
          switch (true) {
            case formStore.isCrossExchangeOnly:
              return (
                <div className="btn btn-xs btn-secondary swap-price__exchange-mode-btn">
                  Cross-exchange only
                </div>
              );

            case formStore.isCrossExchangeMode:
              return (
                <Button
                  size="xs"
                  type="secondary"
                  className="swap-price__exchange-mode-btn"
                  disabled={formStore.isSwapping}
                  onClick={formStore.toggleSwapExchangeMode}
                >
                  Back to direct swap
                </Button>
              );

            // case formStore.isCrossExchangeAvailable &&
            //   formStore.route !== undefined:
            //   return (
            //     <Button
            //       size="xs"
            //       type="secondary"
            //       className="swap-price__exchange-mode-btn"
            //       disabled={formStore.isSwapping}
            //       onClick={formStore.toggleSwapExchangeMode}
            //     >
            //       {!formStore.isEnoughLiquidity
            //         ? "Cross-exchange available"
            //         : "Get a better price"}
            //     </Button>
            //   );

            default:
              return (
                <div className="btn btn-xs btn-secondary swap-price__exchange-mode-btn">
                  Optimal price
                </div>
              );
          }
        })()}
      </div>
      <div className="swap-price-details">
        {formStore.priceDirection === SwapDirection.RTL ? (
          <span
            key={SwapDirection.RTL}
            dangerouslySetInnerHTML={{
              __html: `${
                formStore.priceLeftToRight !== undefined
                  ? formattedTokenAmount(
                      formStore.priceLeftToRight,
                      formStore.leftToken.decimals
                    )
                  : "--"
              } ${leftSymbol}&nbsp;per&nbsp;1&nbsp;${rightSymbol}`,
            }}
          />
        ) : (
          <span
            key={SwapDirection.LTR}
            dangerouslySetInnerHTML={{
              __html: `${
                formStore.priceLeftToRight !== undefined
                  ? formattedTokenAmount(
                      formStore.priceLeftToRight,
                      formStore.leftToken.decimals
                    )
                  : "--"
              } ${leftSymbol}&nbsp;per&nbsp;1&nbsp;${rightSymbol}`,
            }}
          />
        )}
        <Button
          size="xs"
          className="swap-price__reverse-btn"
          onClick={formStore.togglePriceDirection}
        >
          <Icon icon="reverseHorizontal" />
        </Button>
      </div>
    </div>
  );
}

export const SwapPrice = observer(Price);
