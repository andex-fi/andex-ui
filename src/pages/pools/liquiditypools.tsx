import React, { FC, useState } from "react";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useAccountContext } from "../../hooks/accountContext";

export const Liquiditypools: FC = () => {
  const [positions, setPositions] = useState<boolean>(false);
  const { address, connect } = useAccountContext();
  const handleConnectWallet = (): void => {
    connect();
  };

  const navigate = useNavigate();

  const handleAddPosition = (): void => {
    navigate("/addliquidity");
  };

  return (
    <div className="flex items-center justify-center w-full h-screen font-montserrat bg-[#E5E5E5]">
      {address ? (
        <div className="w-full md:w-[30rem] bg-white rounded-lg p-4">
          <div className="grid grid-cols-6">
            <h1 className="col-span-2 font-bold text-sm">Pools Overview</h1>

            <Button
              btnStyles="bg-[#9645D7] px-2 py-1 rounded-2xl text-white text-sm col-span-2 col-end-7 flex items-center justify-center gap-2"
              onClick={handleAddPosition}
            >
              <span>+</span>
              <p>New Position</p>
            </Button>
          </div>

          {positions ? (
            <div>More positions</div>
          ) : (
            <div className="flex items-center justify-center w-full h-48">
              <p className="font-bold">No positions found</p>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full md:w-[30rem] bg-white rounded-lg p-4">
          <div className="grid grid-cols-6">
            <h1 className="col-span-2 font-bold text-sm">Pools Overview</h1>
            {/* <Button btnStyles="bg-[#9645D7] px-2 py-1 rounded-2xl text-white text-sm col-span-2 col-end-7 flex items-center justify-center gap-2 cursor-not-allowed opacity-50">
              <span>+</span>
              <p>New Position</p>
            </Button> */}
          </div>

          <Button
            btnStyles="w-full px-2 py-4 flex items-center justify-center bg-[#52058F] text-white text-sm rounded-lg mt-6 font-bold"
            onClick={handleConnectWallet}
          >
            <p>Connect Wallet</p>
          </Button>
        </div>
      )}
    </div>
  );
};
