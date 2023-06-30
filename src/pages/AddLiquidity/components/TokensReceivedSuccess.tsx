import BigNumber from "bignumber.js";

import AccountExplorerLink from "../../../components/AccountExplorerLink";
import TokenIcon from "../../../components/TokenIcon";
import TransactionExplorerLink from "../../../components/TransactionExplorerLink";
import {
  abbrNumber,
  formattedTokenAmount,
  isMobile,
  stopEventPropagate,
} from "../../../utils";
import classNames from "classnames";

type Props = {
  address: string;
  amount: string;
  decimals?: number;
  icon?: string;
  symbol?: string;
  txHash: string;
};

export const TokensReceivedSuccess: React.FC<Props> = ({address, amount, decimals, icon, symbol, txHash}) => {

  const [formattedAmount, formattedAmountAbbr] = abbrNumber(
    new BigNumber(amount).shiftedBy(-(decimals ?? 0)).toFixed()
  );

  return (
    <>
      <div className="notification-body">
        <div className="notification_token-badge">
          <TokenIcon address={address} icon={icon} size="small" />
          <div className="notification_token-badge__title">
            {`+ ${formattedTokenAmount(
              formattedAmount,
              undefined
            )}${formattedAmountAbbr} ${symbol ?? ""}`}
          </div>
        </div>
      </div>
      <div
        className={classNames("notification-actions", {
          "notification-actions--large": isMobile(navigator.userAgent),
        })}
      >
        <TransactionExplorerLink
          className={
            isMobile(navigator.userAgent) ? "btn btn-link" : "btn btn-secondary"
          }
          id={txHash}
          onClick={stopEventPropagate}
        >
          {"Transaction details'"}
        </TransactionExplorerLink>
        <AccountExplorerLink
          address={address}
          className={
            !isMobile(navigator.userAgent)
              ? "btn btn-secondary"
              : "btn btn-link"
          }
          onClick={stopEventPropagate}
        >
          {"Token contract"}
        </AccountExplorerLink>
      </div>
    </>
  );
}
