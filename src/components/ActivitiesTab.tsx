import usdc from "../assets/usdc.png";
import eth from "../assets/eth.png";
import arrow from "../assets/arrow.png";
import { MdOutlineCheck, MdOutlineClose } from "react-icons/md";

const activities: Record<string, Array<any>> = {
  "Today": [
    {
      tokenIn: "USDC",
      tokenOut: "ETH",
      amountIn: 1800,
      amountOut: 1,
      action: "Swapping",
      tokenInLogo: usdc,
      status: "pending",
      time: "19:00",
      tokenOutLogo: eth,
    },
    {
      tokenIn: "ETH",
      tokenOut: "USDC",
      amountIn: 1,
      amountOut: 1800,
      action: "Swapped",
      tokenInLogo: eth,
      status: "success",
      time: "19:00",
      tokenOutLogo: usdc,
    },
    {
      tokenIn: "ETH",
      tokenOut: "USDC",
      amountIn: 1,
      amountOut: 1800,
      action: "Swapped",
      tokenInLogo: eth,
      status: "success",
      time: "19:00",
      tokenOutLogo: usdc,
    },
  ],
  "25 May": [
    {
      tokenIn: "USDC",
      tokenOut: "ETH",
      amountIn: 1800,
      amountOut: 1,
      action: "Failed",
      tokenInLogo: usdc,
      status: "failed",
      time: "19:00",
      tokenOutLogo: eth,
    },
    {
      tokenIn: "ETH",
      tokenOut: "USDC",
      amountIn: 1,
      amountOut: 1800,
      action: "Swapped",
      tokenInLogo: eth,
      status: "success",
      time: "19:00",
      tokenOutLogo: usdc,
    },
    {
      tokenIn: "ETH",
      tokenOut: "USDC",
      amountIn: 1,
      amountOut: 1800,
      action: "Swapped",
      tokenInLogo: eth,
      status: "success",
      time: "19:00",
      tokenOutLogo: usdc,
    },
  ],
};

const ActivityIcon = ({
  tokenInLogo,
  tokenOutLogo,
  status,
}: {
  tokenInLogo: string;
  tokenOutLogo: string;
  status: string;
}) => {
  return (
    <div className="w-10 h-10 flex relative rounded-full">
      <img src={tokenInLogo} className="w-10 h-10 rounded-full" />
      <div className="top-0 left-0 absolute w-5  overflow-hidden">
        <img
          src={tokenOutLogo}
          //   width={"50px"}
          style={{ maxWidth: "100px" }}
          className="block w-10  h-10 rounded-full"
        />
      </div>
      {status === "success" && (
        <div className="absolute bottom-0 p-[2px] rounded-full text-white text-[10px] font-[900] right-0 bg-[#4CBF6C]">
          <MdOutlineCheck />
        </div>
      )}
      {status === "failed" && (
        <div className="absolute bottom-0 p-[2px] rounded-full text-white text-[10px] font-[900] right-0 bg-[#FD4158]">
          <MdOutlineClose />
        </div>
      )}
    </div>
  );
};

const Activities = () => {
  return (
    <div className="flex flex-col gap-2 pr-5">
      {Object.keys(activities).map((value: string) => (
        <div>
          <h4 className="color-[#7F8FA9] text-[12px] mb-1">{value}</h4>
          <div className="flex flex-col gap-1">
            
            {activities[value]?.map((data) => (
              <div className="flex gap-2 text-[13px] justify-between">
                <ActivityIcon
                  tokenOutLogo={data?.tokenOutLogo}
                  tokenInLogo={data?.tokenInLogo}
                  status={data?.status}
                />
                <div className="flex-1">
                  <div className="font-[600]">{data?.action}</div>
                  <div className="flex items-center gap-1">
                    <div>{`${data.amountOut} ${data.tokenOut}`}</div>
                    <img src={arrow} className="w-3 h-2" />
                    <div>{`${data.amountIn} ${data.tokenIn}`}</div>
                  </div>
                </div>
                <div>{data?.time}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
export default Activities;
