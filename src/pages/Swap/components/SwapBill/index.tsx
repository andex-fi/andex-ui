import * as React from "react";
import { WalletNativeCoin } from "@andex/sdk";
import { TokenCache } from "../../../../state/TokensCacheService";
import { formattedTokenAmount } from "../../../../utils";
import { Icon } from "../../../../components/Icon";

type Props = {
  fee?: string;
  isCrossExchangeAvailable: boolean;
  isCrossExchangeMode: boolean;
  leftToken?: TokenCache | WalletNativeCoin;
  minExpectedAmount?: string;
  priceImpact?: string;
  rightToken?: TokenCache | WalletNativeCoin;
  slippage?: string;
  tokens?: TokenCache[];
};

export const SwapBill: React.FC<Props> = ({
  fee,
  isCrossExchangeAvailable,
  isCrossExchangeMode,
  leftToken,
  minExpectedAmount,
  priceImpact,
  rightToken,
  slippage,
  tokens,
}) => {
  if (leftToken === undefined || rightToken === undefined) {
    return null;
  }

  return (
    <div className="list-bill">
      {isCrossExchangeMode &&
        isCrossExchangeAvailable &&
        tokens !== undefined &&
        tokens.length > 0 && (
          <div key="route" className="list-bill__row">
            <div className="list-bill__info">
              <span>Route</span>
              <span className="list-bill__icn">
                <Icon icon="info" />
              </span>
            </div>
            <div className="list-bill__val">
              <ul className="breadcrumb" style={{ margin: 0 }}>
                <li>
                  <span>{leftToken.symbol}</span>
                </li>
                {tokens?.map((token) => (
                  <li key={token.root}>
                    <span>{token.symbol}</span>
                  </li>
                ))}
                <li>
                  <span>{rightToken.symbol}</span>
                </li>
              </ul>
            </div>
          </div>
        )}

      {slippage !== undefined && minExpectedAmount !== undefined && (
        <div
          key="slippage"
          className="list-bill__row flex justify-between items-center"
        >
          <div className="list-bill__info">
            <span>Slippage tolerance</span>
            <span className="list-bill__icn">
              <Icon icon="info" />
            </span>
          </div>
          <div className="list-bill__val">{slippage}%</div>
        </div>
      )}

      {minExpectedAmount !== undefined && (
        <div
          key="minExpectedAmount"
          className="list-bill__row flex justify-between items-center"
        >
          <div className="list-bill__info">
            <span>Minimum Recieved</span>
            <span className="list-bill__icn">
              <Icon icon="info" />
            </span>
          </div>
          <div
            className="list-bill__val"
            dangerouslySetInnerHTML={{
              __html: `<span>${formattedTokenAmount(
                minExpectedAmount,
                rightToken.decimals,
                {
                  preserve: true,
                }
              )}</span> ${rightToken.symbol || ""}`,
            }}
          />
        </div>
      )}

      {priceImpact !== undefined && (
        <div key="priceImpact" className="flex justify-between items-center">
          <div>
            <span>Price Impact</span>
            <span className="list-bill__icn">
              <Icon icon="info" />
            </span>
          </div>
          <div
            className="list-bill__val"
            dangerouslySetInnerHTML={{
              __html: `<span>&lt; ${priceImpact || 0}%</span>`,
            }}
          />
        </div>
      )}

      {fee !== undefined && (
        <div key="fee" className="flex justify-between items-center">
          <div className="list-bill__info">
            <span>Liquidity Provider Fee</span>
            <span className="list-bill__icn">
              <Icon icon="info" />
            </span>
          </div>
          <div
            className="list-bill__val"
            dangerouslySetInnerHTML={{
              __html: `<span>${formattedTokenAmount(fee, leftToken.decimals, {
                preserve: true,
              })}</span> ${leftToken.symbol || ""}`,
            }}
          />
        </div>
      )}
    </div>
  );
}
