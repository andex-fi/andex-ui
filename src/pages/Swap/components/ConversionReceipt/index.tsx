import * as React from "react";
import * as ReactDOM from "react-dom";
import { observer } from "mobx-react-lite";

import AccountExplorerLink from "../../../../components/AccountExplorerLink";
import { Button } from "../../../../components/Button";
import TokenIcon from "../../../../components/TokenIcon";
import TransactionExplorerLink from "../../../../components/TransactionExplorerLink";
import { useSwapFormStore } from "../../stores/SwapFormStore";
import { formattedTokenAmount } from "../../../../utils";

function ConversionReceipt(): JSX.Element | null {
  const formStore = useSwapFormStore();

  if (formStore.conversion.txHash === undefined) {
    return null;
  }

  const onClose = () => {
    formStore.conversion.setData({
      wrappedAmount: undefined,
      txHash: undefined,
      unwrappedAmount: undefined,
    });
  };

  return ReactDOM.createPortal(
    <div className="popup">
      <div className="popup-overlay" />
      <div className="popup__wrap">
        <Button
          type="icon"
          className="popup-close"
          onClick={onClose}
          btnStyles=""
        >
          {/* <Icon icon="close" /> */}
          close
        </Button>
        <h2 className="popup-title">
          {formStore.isWrapMode ? "Wrap receipt" : "Unwrap receipt"}
        </h2>
        <div className="popup-main nb np">
          <div className="popup-main__ava">
            {formStore.isWrapMode ? (
              <TokenIcon
                address={formStore.conversion.token?.root}
                icon={formStore.conversion.token?.icon}
              />
            ) : (
              <TokenIcon icon={formStore.conversion.coin?.icon} />
            )}
          </div>

          <div
            className="popup-main__name"
            dangerouslySetInnerHTML={{
              __html: `+ <span>${formattedTokenAmount(
                formStore.isWrapMode
                  ? formStore.conversion.wrappedAmount
                  : formStore.conversion.unwrappedAmount,
                formStore.isWrapMode
                  ? formStore.conversion.token?.decimals
                  : formStore.conversion.coin?.decimals,
                { preserve: true }
              )}</span> ${
                formStore.isWrapMode
                  ? formStore.conversion.token?.symbol
                  : formStore.conversion.coin?.symbol
              }`,
            }}
          />
        </div>
        <div className="popup-actions">
          {formStore.isWrapMode &&
            formStore.conversion.token?.root !== undefined && (
              <AccountExplorerLink
                key="directPair"
                address={formStore.conversion.token?.root}
                className="btn btn-secondary"
              >
                {"Token root contract"}
              </AccountExplorerLink>
            )}
          <TransactionExplorerLink
            id={formStore.conversion.txHash}
            className="btn btn-secondary"
          >
            {"Transaction result"}
          </TransactionExplorerLink>
        </div>
      </div>
    </div>,
    document.body
  );
}

export const ConversionTransactionReceipt = observer(ConversionReceipt);
