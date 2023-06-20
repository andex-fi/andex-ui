import React, { useState } from "react";
import { TokenIcon } from "../../../components/TokenIcon";
// import { TokenCache } from "../../../state/TokensCacheService";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { Button } from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import { LiquidityPoolTokenData } from "../../../constants";
import { formattedTokenAmount } from "../../../utils";

interface Props {
  leftToken?: LiquidityPoolTokenData;
  rightToken?: LiquidityPoolTokenData;
  userLpBalance?: string;
  rightBalance?: string;
  leftBalance?: string;
}

function PoolRow({
  leftToken,
  rightToken,
  userLpBalance,
  rightBalance,
  leftBalance,
}: Props) {
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();
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
              address={leftToken?.address.toString()}
            ></TokenIcon>
            <TokenIcon
              size="medium"
              className="-ml-2 "
              address={rightToken?.address.toString()}
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
          <div>Pool Balance: {userLpBalance}</div>
          <div>
            {" "}
            {`${leftToken?.symbol}: ${formattedTokenAmount(leftBalance)}`}
          </div>
          <div>{`${rightToken?.symbol}: ${formattedTokenAmount(
            rightBalance
          )}`}</div>
          <div className="flex justify-around gap-2 mt-3">
            <Button
              onClick={() =>
                navigate(
                  `/addliquidity/${leftToken?.address}/${rightToken?.address}`
                )
              }
              btnStyles="bg-[#9645D7] px-3 py-2 rounded-lg text-white text-sm col-span-2 col-end-7 flex items-center justify-center gap-2"
            >
              + Add Liquidity
            </Button>
            <Button
              onClick={() =>
                navigate(
                  `/removeliquidity/${leftToken?.address}/${rightToken?.address}`
                )
              }
              btnStyles="bg-[#9645D7] px-3 py-2 rounded-lg text-white text-sm col-span-2 col-end-7 flex items-center justify-center gap-2"
            >
              - Remove Liquidity
            </Button>
            <a
              href={`https://devnet.venomscan.com/accounts/${leftToken?.address}`}
              target="_blank"
              rel="noreferrer noopener"
              className="bg-[#9645D7] px-3 py-2 rounded-lg text-white text-sm col-span-2 col-end-7 flex items-center justify-center gap-2"
            >
              {`${leftToken?.symbol} Token Contract`}
            </a>
            <a
              href={`https://devnet.venomscan.com/accounts/${rightToken?.address}`}
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
