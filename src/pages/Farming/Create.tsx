/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty */
import * as React from "react";
import BigNumber from "bignumber.js";
import { reaction } from "mobx";
import { Observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import { Button } from "../../components/Button";
import { Icon } from "../../components/Icon";
import { PoolCreatingParams } from "./components/PoolCreatingParams";
import { PoolField } from "./components/PoolField";
import { useCreateFarmPoolStore } from "./store/CreateFarmPoolStore";
import { useFavoriteFarmings } from "../../state/FavoritePairs";
// import { useWallet } from "../../state/WalletService";
import Page from "../Page";
import { useWallet } from "../../hooks";

// import "./index.scss";

const Create = () => {
  const navigate = useNavigate();
  const wallet = useWallet();
  const creatingPool = useCreateFarmPoolStore();
  const favoriteFarmings = useFavoriteFarmings();

  const onChangeFarmToken = (address: string | undefined) => {
    creatingPool.changeData("farmToken", { root: address });
  };

  const onChangeDate =
    (key: "farmStart") => (dateString: string | undefined) => {
      creatingPool.changeData(key, { value: dateString });
    };

  const onChangeRewardTokenRoot =
    (idx: number) => (value: string | undefined) => {
      creatingPool.updateRewardToken(idx, {
        decimals: undefined,
        isValid: undefined,
        root: value,
        symbol: undefined,
      });
    };

  const onChangeRewardTokenRewardAmount =
    (idx: number) => (value: string | undefined) => {
      const rewardTotalAmount = new BigNumber(value || "0");
      creatingPool.updateRewardToken(idx, {
        farmSpeed: value,
        isRewardTotalValid:
          !rewardTotalAmount.isNaN() &&
          rewardTotalAmount.isPositive() &&
          rewardTotalAmount.isFinite(),
      });
    };

  const onChangeVesting =
    (key: "vestingRatio" | "vestingPeriod") => (value: string | undefined) => {
      creatingPool.changeData("farmVesting", {
        ...creatingPool.farmVesting,
        [key]: value,
      });
    };

  const create = async () => {
    try {
      await creatingPool.create();
      if (creatingPool.createdFarmPoolAddress !== undefined) {
        favoriteFarmings.toggle(creatingPool.createdFarmPoolAddress.toString());
        navigate(`/farming/${creatingPool.createdFarmPoolAddress.toString()}`);
      } else {
        navigate("/farming");
        // setTimeout(() => {
        //   console.log("error");

        // }, 60 * 1000);
      }
    } catch (e) {}
  };

  React.useEffect(() => {
    (async () => {
      await creatingPool.init();
    })();
    const logoutDisposer = reaction(
      () => wallet.address,
      (address) => {
        if (!address) {
          navigate("/farming");
        }
      }
    );
    return () => {
      logoutDisposer?.();
      (async () => {
        await creatingPool.dispose();
      })();
    };
  }, []);

  return (
    <Page>
      <div className="card">
        <div className="card__wrap">
          <header className="card__header">
            <h2 className="card-title">Create farm pool</h2>
          </header>

          <div className="form form-create-farm-pool">
            <Observer>
              {() => (
                <PoolField
                  autoFocus
                  hint={
                    creatingPool.farmToken.symbol != null
                      ? creatingPool.farmToken.symbol
                      : "Address"
                  }
                  isValid={creatingPool.farmToken.isValid}
                  label="Farm token root"
                  placeholder="0:000000..."
                  readOnly={creatingPool.isCreating}
                  value={creatingPool.farmToken.root || ""}
                  onChange={onChangeFarmToken}
                />
              )}
            </Observer>

            <Observer>
              {() => (
                <PoolField
                  hint="YYYY.MM.DD HH:MM"
                  label="Farm start"
                  isValid={creatingPool.farmStart.isValid}
                  placeholder="YYYY.MM.DD HH:MM"
                  readOnly={creatingPool.isCreating}
                  value={creatingPool.farmStart.value || ""}
                  onChange={onChangeDate("farmStart")}
                />
              )}
            </Observer>

            <Observer>
              {() => (
                <PoolField
                  hint="Ratio, percent"
                  inputMode="decimal"
                  isValid={creatingPool.isVestingValid}
                  label="Vesting ratio"
                  placeholder="50"
                  readOnly={creatingPool.isCreating}
                  value={creatingPool.farmVesting.vestingRatio || ""}
                  onChange={onChangeVesting("vestingRatio")}
                />
              )}
            </Observer>

            <Observer>
              {() => (
                <PoolField
                  hint="Period, seconds"
                  inputMode="decimal"
                  isValid={creatingPool.isVestingValid}
                  label="Vesting period"
                  placeholder="86400"
                  readOnly={creatingPool.isCreating}
                  value={creatingPool.farmVesting.vestingPeriod || ""}
                  onChange={onChangeVesting("vestingPeriod")}
                />
              )}
            </Observer>

            <Observer>
              {() => (
                <>
                  {creatingPool.rewardTokens.map((token, idx) => (
                    <React.Fragment key={idx}>
                      <PoolField
                        hint={token.symbol != null ? token.symbol : "Address"}
                        isValid={token.isValid}
                        label="Reward token root"
                        placeholder="0:000000..."
                        readOnly={creatingPool.isCreating}
                        value={token.root || ""}
                        onChange={onChangeRewardTokenRoot(idx)}
                      />

                      <PoolField
                        hint={
                          token.symbol != null
                            ? `${token.symbol} per second`
                            : "Reward"
                        }
                        inputMode="decimal"
                        isValid={token.isRewardTotalValid}
                        label="Reward per second"
                        placeholder="0.0"
                        readOnly={creatingPool.isCreating}
                        value={token.farmSpeed || ""}
                        onChange={onChangeRewardTokenRewardAmount(idx)}
                      />
                    </React.Fragment>
                  ))}
                </>
              )}
            </Observer>

            <div className="form-create-farm-pool__actions">
              <a onClick={creatingPool.addRewardToken}>Add reward token</a>
            </div>

            <PoolCreatingParams />

            <Observer>
              {() => (
                <Button
                  block
                  className="form-submit"
                  aria-disabled={
                    creatingPool.isCreating || !creatingPool.isValid
                  }
                  disabled={creatingPool.isCreating || !creatingPool.isValid}
                  size="lg"
                  type="primary"
                  onClick={create}
                >
                  {creatingPool.isCreating ? (
                    <div className="popup-main__loader">
                      <Icon icon="loader" />
                    </div>
                  ) : (
                    "Create pool"
                  )}
                </Button>
              )}
            </Observer>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Create;
