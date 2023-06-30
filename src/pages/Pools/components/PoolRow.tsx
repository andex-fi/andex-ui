/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import TokenIcon from "../../../components/TokenIcon";
import { TokenCache } from "../../../state/TokensCacheService";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { Button } from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import { formattedTokenAmount, isGoodBignumber } from "../../../utils";
import { LiquidityPoolUtils } from "../../../constants";
import BigNumber from "bignumber.js";
import { Oval } from "react-loader-spinner";

interface Props {
  leftToken?: TokenCache;
  rightToken?: TokenCache;
  pool: string;
  user?: string;
  userLpBalance?: string;
  rightBalance?: string;
  leftBalance?: string;
}

const PoolRow: React.FC<Props> = ({
  leftToken,
  rightToken,
  pool,
  user,
}) => {
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();
  const [rightBalance, setRightBalance] = useState("0");
  const [leftBalance, setLeftBalance] = useState("0");
  const [userLpBalance, setUserLpBalance] = useState("0");
  const [isloading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    try {
      const poolData = await LiquidityPoolUtils.get(pool, user);
      setUserLpBalance(
        formattedTokenAmount(poolData.lp.userBalance, poolData.lp.decimals)
      );
      setLeftBalance(
        new BigNumber(new BigNumber(poolData.lp.userBalance || 0))
          .times(poolData.left.balance || 0)
          .div(
            isGoodBignumber(poolData.lp.balance ?? 0)
              ? poolData.lp.balance ?? 0
              : 1
          )
          .dp(0, BigNumber.ROUND_DOWN)
          .shiftedBy(-(poolData.left.decimals ?? 0))
          .toFixed()
      );
      setRightBalance(
        new BigNumber(new BigNumber(poolData.lp.userBalance || 0))
          .times(poolData.right.balance || 0)
          .div(
            isGoodBignumber(poolData.lp.balance ?? 0)
              ? poolData.lp.balance ?? 0
              : 1
          )
          .dp(0, BigNumber.ROUND_DOWN)
          .shiftedBy(-(poolData.right.decimals ?? 0))
          .toFixed()
      );
    } catch (error) {
      console.log("Error while fecthing pool data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div
      //   key={index}
      className="bg-[#F4F5FA] dark:bg-purple-light p-4 w-full my-4 rounded-lg"
    >
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <div className="flex">
            <TokenIcon
              size="medium"
              icon={leftToken?.icon}
              address={leftToken?.root.toString()}
            ></TokenIcon>
            <TokenIcon
              size="medium"
              className="-ml-2 "
              icon={rightToken?.icon}
              address={rightToken?.root.toString()}
            ></TokenIcon>
          </div>
          <div>
            {leftToken?.symbol}/{rightToken?.symbol}
          </div>
        </div>
        <button onClick={() => setOpen((value) => !value)}>
          {isOpen ? (
            <ChevronUpIcon width={"25px"} />
          ) : (
            <ChevronDownIcon width={"25px"} />
          )}
        </button>
      </div>
      {isOpen && (
        <div className="mt-10">
          {isloading ? (
            <Oval
              width={"25px"}
              color="#19102d"
              secondaryColor="rgba(255, 255, 255)"
            />
          ) : (
            <>
              <div>Pool Balance: {userLpBalance}</div>
              <div>
                {" "}
                {`${leftToken?.symbol}: ${formattedTokenAmount(leftBalance)}`}
              </div>
              <div>{`${rightToken?.symbol}: ${formattedTokenAmount(
                rightBalance
              )}`}</div>
            </>
          )}
          <div className="flex justify-around gap-2 mt-3">
            <Button
              onClick={() =>
                navigate(`/add/${leftToken?.root}/${rightToken?.root}`)
              }
              btnStyles="bg-[#9645D7] px-3 py-2 rounded-lg text-white text-sm col-span-2 col-end-7 flex items-center justify-center gap-2"
            >
              + Add Liquidity
            </Button>
            <Button
              onClick={() =>
                navigate(
                  `/remove/${leftToken?.root}/${rightToken?.root}`
                )
              }
              btnStyles="bg-[#9645D7] px-3 py-2 rounded-lg text-white text-sm col-span-2 col-end-7 flex items-center justify-center gap-2"
            >
              - Remove Liquidity
            </Button>
            <a
              href={`https://devnet.venomscan.com/accounts/${leftToken?.root}`}
              target="_blank"
              rel="noreferrer noopener"
              className="bg-[#9645D7] px-3 py-2 rounded-lg text-white text-sm col-span-2 col-end-7 flex items-center justify-center gap-2"
            >
              {`${leftToken?.symbol} Token Contract`}
            </a>
            <a
              href={`https://devnet.venomscan.com/accounts/${rightToken?.root}`}
              target="_blank"
              rel="noreferrer noopener"
              className="bg-[#9645D7] px-3 py-2 rounded-lg text-white text-sm col-span-2 col-end-7 flex items-center justify-center gap-2"
            >
              {`${rightToken?.symbol} Token Contract`}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default PoolRow;
