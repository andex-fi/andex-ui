/* eslint-disable react-hooks/rules-of-hooks */
import { DateTime } from "luxon";
import { Address } from "@andex/provider";

import { useRpc } from "../../../hooks";
import { Farm, UserPendingReward } from "../store/farm";
import { FarmAbi } from "../../../constants/abi/farming.abi";
import { TokenWallet } from "./token-wallet";

import { error } from "../../../utils";

const rpc = useRpc();

export function parseDate(value: string | undefined): Date | undefined {
  if (!value) {
    return undefined;
  }
  const parsedDate = DateTime.fromFormat(value, "yyyy.MM.dd HH:mm");
  if (parsedDate.isValid) {
    return parsedDate.toJSDate();
  }
  return undefined;
}

export async function resolveToken(
  address: string | undefined
): Promise<{ symbol: string; decimals: number } | undefined> {
  try {
    const rootAddress = new Address(address || "");
    const { state } = await rpc.getFullContractState({ address: rootAddress });

    if (state === undefined) {
      return undefined;
    }
    if (!state.isDeployed) {
      return undefined;
    }

    const symbol = await TokenWallet.getSymbol(rootAddress, state);
    const decimals = await TokenWallet.getDecimals(rootAddress, state);

    return { symbol, decimals };
  } catch (e) {
    return undefined;
  }
}

export async function executeAction(
  poolAddress: string,
  accountAddress: string,
  userWalletAddress: string,
  action: () => Promise<any>,
  handler: "Claim" | "Withdraw" | "Deposit"
): Promise<string> {
  const poolContract = new rpc.Contract(FarmAbi.Pool, new Address(poolAddress));
  let resolve: () => void | undefined;
  const promise = new Promise<void>((r) => {
    resolve = () => r();
  });
  const subscription = (
    await rpc.subscribe("transactionsFound", {
      address: new Address(poolAddress),
    })
  ).on("data", (txs) => {
    txs.transactions.forEach((tx) => {
      poolContract
        .decodeTransactionEvents({
          transaction: tx,
        })
        .then((events) => {
          events.forEach((event) => {
            if (event.event === handler) {
              if (event.data.user.toString() === accountAddress) {
                resolve();
              }
            }
          });
        });
    });
  });

  try {
    await action();
  } catch (e) {
    await subscription.unsubscribe();
    throw e;
  }

  await promise;
  await subscription.unsubscribe();
  // eslint-disable-next-line no-return-await
  return await TokenWallet.balance({ wallet: new Address(userWalletAddress) });
}

export enum FarmingStatus {
  WAITING = 0,
  ACTIVE = 1,
  ENDED = 2,
}

export function getFarmingStatus(
  startTime: number,
  endTime?: number
): FarmingStatus {
  const currentTime = new Date().getTime();
  let status: FarmingStatus = FarmingStatus.ACTIVE;

  if (currentTime < startTime) {
    status = FarmingStatus.WAITING;
  } else if (endTime && currentTime >= startTime && currentTime < endTime) {
    status = FarmingStatus.ACTIVE;
  } else if (endTime && currentTime >= endTime) {
    status = FarmingStatus.ENDED;
  } else if (!endTime && currentTime > startTime) {
    status = FarmingStatus.ACTIVE;
  }

  return status;
}

export async function getUserPendingReward(
  poolAddress: Address,
  userDataAddress: Address,
  farmEndSeconds: string
): Promise<UserPendingReward | undefined> {
  const poolRewardData = await Farm.poolCalculateRewardData(poolAddress);
  try {
    return await Farm.userPendingReward(
      userDataAddress,
      poolRewardData._accRewardPerShare,
      poolRewardData._lastRewardTime,
      farmEndSeconds
    );
  } catch (e) {
    error(e);
    return undefined;
  }
}

export async function getUserAmount(userDataAddress: Address): Promise<string> {
  try {
    const { amount } = await Farm.userDataAmountAndRewardDebt(userDataAddress);
    return amount;
  } catch (e) {
    error(e);
    return "0";
  }
}
