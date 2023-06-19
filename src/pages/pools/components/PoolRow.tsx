import React, { useState } from "react";
import { TokenIcon } from "../../../components/TokenIcon";
import { TokenCache } from "../../../state/TokensCacheService";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { Button } from "../../../components/Button";
import { useNavigate } from "react-router-dom";

interface Props {
  leftToken?: TokenCache;
  rightToken?: TokenCache;
}

function PoolRow({ leftToken, rightToken }: Props) {
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div
      //   key={index}
      className="bg-[#F4F5FA] dark:bg-purple-light text-black p-4 w-full my-4 rounded-lg"
    >
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <div className="flex">
            <TokenIcon
              size="medium"
              address={leftToken?.root.toString()}
            ></TokenIcon>
            <TokenIcon
              size="medium"
              className="-ml-2 "
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
          <div className="flex justify-around">
            <Button
              onClick={() =>
                navigate(`/addliquidity/${leftToken?.root}/${rightToken?.root}`)
              }
              btnStyles="bg-[#9645D7] px-3 py-2 rounded-lg text-white text-sm col-span-2 col-end-7 flex items-center justify-center gap-2"
            >
              + Add Liquidity
            </Button>
            <Button
              onClick={() =>
                navigate(
                  `/removeliquidity/${leftToken?.root}/${rightToken?.root}`
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
