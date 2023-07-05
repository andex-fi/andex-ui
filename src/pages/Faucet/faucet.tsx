import { Button } from "@andex/uikit";
import { FC, useState } from "react";
import AndexFaucet from "../../assets/andexfaucet.svg";
import WrappedEther from "../../assets/wrappedetherfaucet.png";
import DaiFaucet from "../../assets/daitokenfaucet.png";
import UsdcFaucet from "../../assets/usdcfaucet.png";
import { ConfirmClaim } from "./confirmClaim";

const Faucet: FC = () => {
  const [claimModal, setClaimModal] = useState<boolean>(false);

  const handleFaucetClaimModal = (): void => {
    setClaimModal(true);
    document.body.style.overflow = "hidden";
  };
  return (
    <div className="w-full h-screen flex items-center justify-center px-4">
      <div className="bg-white dark:bg-purple-darkest w-full md:w-[30rem] lg:w-[40rem] rounded-lg py-4 border-2 border-[#DFE8F9] font-montserrat">
        <div className="flex items-center justify-between py-2 px-4">
          <div className="flex items-center gap-2">
            <img src={AndexFaucet} alt="AndexFaucet" />
            <h3 className="font-extrabold">Andex Token</h3>
          </div>
          <Button onClick={handleFaucetClaimModal}>Claim</Button>
        </div>
        <br className="text-[#DFE8F9] h-2" />
        <div className="flex items-center justify-between py-2 px-4">
          <div className="flex items-center gap-2">
            <img src={WrappedEther} alt="WrappedEther" />
            <h3 className="font-extrabold">Wrapped Ether</h3>
          </div>
          <Button>Claim</Button>
        </div>
        <br className="text-[#DFE8F9]" />
        <div className="flex items-center justify-between py-2 px-4">
          <div className="flex items-center gap-2">
            <img src={DaiFaucet} alt="DaiFaucet" />
            <h3 className="font-extrabold">DAI Token</h3>
          </div>
          <Button>Claim</Button>
        </div>
        <br className="text-[#DFE8F9]" />
        <div className="flex items-center justify-between py-2 px-4">
          <div className="flex items-center gap-2">
            <img src={UsdcFaucet} alt="UsdcFaucet" />
            <h3 className="font-extrabold">USDC Token</h3>
          </div>
          <Button>Claim</Button>
        </div>
      </div>
      {claimModal && <ConfirmClaim setClaimModal={setClaimModal} />}
    </div>
  );
};

export default Faucet;
