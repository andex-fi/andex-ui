import * as React from "react";
import * as ReactDOM from "react-dom";
import { observer } from "mobx-react-lite";
import { IconButton, CloseIcon } from "@andex/uikit";
import AccountExplorerLink from "../../../../components/AccountExplorerLink";
import TransactionExplorerLink from "../../../../components/TransactionExplorerLink";
// import { UserAvatar } from '@/components/common/UserAvatar'
import { useSwapFormStore } from "../../stores/SwapFormStore";
import { formattedTokenAmount } from "../../../../utils";

function SwapReceipt(): JSX.Element | null {
  const formStore = useSwapFormStore();

  if (formStore.transaction == null) {
    return null;
  }

  const actions = (
    <div key="actions" className="popup-actions">
      {formStore.transaction.isCrossExchangeCanceled &&
        formStore.transaction.spentRoot !== undefined && (
          <AccountExplorerLink
            key="crossPair"
            address={formStore.transaction.spentRoot}
            className="btn btn-secondary"
          >
            Token root contract
          </AccountExplorerLink>
        )}

      {!formStore.transaction.isCrossExchangeCanceled &&
        formStore.transaction.receivedRoot !== undefined && (
          <AccountExplorerLink
            key="directPair"
            address={formStore.transaction.receivedRoot}
            className="btn btn-secondary"
          >
            Token root contract
          </AccountExplorerLink>
        )}
      {formStore.transaction.hash !== undefined && (
        <TransactionExplorerLink
          id={formStore.transaction.hash}
          className="btn btn-secondary"
        >
          Transaction result
        </TransactionExplorerLink>
      )}
    </div>
  );
  const receivedToken = (
    <div key="receivedToken" className="popup-main nb np">
      {formStore.transaction.isCrossExchangeCanceled ? (
        <div key="crossExchangeIcon" className="popup-main__ava">
          {formStore.transaction.spentIcon !== undefined ? (
            <img
              alt={formStore.transaction.spentSymbol}
              src={formStore.transaction.spentIcon}
            />
          ) : (
            formStore.transaction.spentRoot !== undefined && (
              <div>Avatar</div>
              //   <UserAvatar address={formStore.transaction.spentRoot} />
            )
          )}
        </div>
      ) : (
        <div key="directIcon" className="popup-main__ava">
          {formStore.transaction.receivedIcon !== undefined ? (
            <img
              alt={formStore.transaction.receivedSymbol}
              src={formStore.transaction.receivedIcon}
            />
          ) : (
            formStore.transaction.receivedRoot !== undefined && (
              <div>Avatar</div>
              //   <UserAvatar address={formStore.transaction.receivedRoot} />
            )
          )}
        </div>
      )}

      <div
        className="popup-main__name"
        dangerouslySetInnerHTML={{
          __html: `+ <span>${formattedTokenAmount(
            formStore.transaction.amount,
            formStore.transaction.isCrossExchangeCanceled
              ? formStore.transaction.spentDecimals
              : formStore.transaction.receivedDecimals,
            { preserve: true }
          )}</span> ${
            formStore.transaction.isCrossExchangeCanceled
              ? formStore.transaction.spentSymbol
              : formStore.transaction.receivedSymbol
          }`,
        }}
      />
    </div>
  );

  return ReactDOM.createPortal(
    <div className="popup">
      <div className="popup-overlay" />
      <div className="popup__wrap">
        <IconButton
          onClick={formStore.cleanTransactionResult}
        >
          <CloseIcon />
        </IconButton>
        <h2 className="popup-title">
          {formStore.transaction.success
            ? "Swap has been completed successfully"
            : "Swap Canceled"}
        </h2>
        {formStore.transaction.success ? (
          <>
            {receivedToken}
            {actions}
          </>
        ) : (
          <>
            <div
              key="failureText"
              className="popup-txt"
              dangerouslySetInnerHTML={{
                __html: formStore.transaction.isCrossExchangeCanceled
                  ? `Due to the slippage is more than ${formStore.transaction.slippage}% of the ${formStore.transaction.spentSymbol}/${formStore.transaction.receivedSymbol} pair, you stayed with {leftSymbol} token.`
                  : "<p>The Swap was canceled. Your balance hasn’t changed.</p>",
              }}
            />
            {formStore.transaction.isCrossExchangeCanceled && receivedToken}
            {actions}
          </>
        )}
      </div>
    </div>,
    document.body
  );
}

export const SwapTransactionReceipt = observer(SwapReceipt);
