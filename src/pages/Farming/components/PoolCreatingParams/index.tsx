import * as React from "react";
import { DateTime } from "luxon";
import { observer } from "mobx-react-lite";
import BigNumber from "bignumber.js";

import { AccountExplorerLink } from "../../../../components/AccountExplorerLink";
import { useCreateFarmPoolStore } from "../../store/CreateFarmPoolStore";
import { formattedAmount } from "../../../../utils";

function CreatingParams(): JSX.Element {
  const creatingPool = useCreateFarmPoolStore();

  const startValid =
    creatingPool.farmStart.date != null && creatingPool.farmStart.isValid;

  return (
    <>
      {((creatingPool.farmToken.root != null &&
        creatingPool.farmToken.isValid) ||
        creatingPool.rewardTokens.some(({ isValid }) => isValid) ||
        startValid) && (
        <div className="form-rows">
          <div className="form-row">
            <div>Farm pool params</div>
          </div>

          {creatingPool.farmToken.root != null &&
            creatingPool.farmToken.isValid && (
              <div key="farmToken" className="form-row">
                <div>Farm token</div>
                <div>
                  <AccountExplorerLink address={creatingPool.farmToken.root}>
                    {creatingPool.farmToken.symbol}
                  </AccountExplorerLink>
                </div>
              </div>
            )}

          {startValid && (
            <React.Fragment key="farmStart">
              <div className="form-row">
                <div>Start (Local Time)</div>
                <div>
                  {DateTime.fromJSDate(
                    creatingPool.farmStart.date as Date
                  ).toFormat("MMM dd, yyyy, HH:mm")}
                </div>
              </div>

              <div className="form-row">
                <div>Start (UTC)</div>
                <div>
                  {DateTime.fromJSDate(creatingPool.farmStart.date as Date)
                    .toUTC(undefined, {
                      keepLocalTime: false,
                    })
                    .toFormat("MMM dd, yyyy, HH:mm")}
                </div>
              </div>
            </React.Fragment>
          )}

          {creatingPool.rewardTokens.map((token, idx) => (
            <React.Fragment key={idx}>
              {token.isValid && (
                <div key={`rewardToken-${idx}`}>
                  <div className="form-row">
                    <div>{`Reward token ${idx + 1}`}</div>
                    <div>
                      {token.root !== undefined && (
                        <AccountExplorerLink address={token.root}>
                          {token.symbol}
                        </AccountExplorerLink>
                      )}
                    </div>
                  </div>
                  <div className="form-row">
                    <div>{`Month reward ${idx + 1}`}</div>
                    <div>
                      {formattedAmount(
                        new BigNumber(token.farmSpeed || 0)
                          .times(86400)
                          .times(30)
                          .toFixed()
                      )}
                    </div>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </>
  );
}

export const PoolCreatingParams = observer(CreatingParams);
