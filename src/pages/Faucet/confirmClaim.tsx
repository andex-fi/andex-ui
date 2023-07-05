import { FC, useState } from "react";
import { Button } from "../../components/Button";

interface Props {
  setClaimModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ConfirmClaim: FC<Props> = ({ setClaimModal }) => {
  const [receipt, setReceipt] = useState<boolean>(false);
  const handleCloseModal = (): void => {
    setClaimModal(false);
    document.body.style.overflow = "unset";
  };

  const handleReceipt = (): void => {
    setReceipt(true);
  };
  return (
    <div
      className="fixed h-full w-full inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm flex justify-center items-center font-montserrat z-30 px-4"
      onClick={handleCloseModal}
    >
      <div
        className="bg-white dark:bg-purple-darkest w-full md:w-[30rem] rounded-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-bold">Confirm claim</h3>
        <div className="flex items-center justify-center bg-[#F4F5FA] dark:bg-purple py-3 rounded-lg my-6">
          <p className="font-bold">You will receive</p>
        </div>

        <div className="w-full text-center my-8">
          <h2 className="text-[#7F8FA9] font-bold lg:text-5xl">1000 ANDX</h2>
          <p className="text-[#7F8FA9]">
            You can only claim Token once in 24 hours.
          </p>
          6{" "}
        </div>
        <Button
          btnStyles="w-full flex items-center justify-center bg-purple dark:bg-purple-lightest py-3 rounded-lg text-white mt-4"
          onClick={handleReceipt}
        >
          Claim
        </Button>
      </div>

      {receipt && (
        <div
          className="bg-white dark:bg-purple-darkest w-full md:w-[30rem] rounded-lg p-6 absolute"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="font-bold">Transaction receipt</h3>
          <div className="flex items-center justify-center bg-[#F4F5FA] dark:bg-purple py-3 rounded-lg my-6">
            <p className="font-bold">Faucet claim successful</p>
          </div>

          <div className="w-full my-8">
            <p className="text-[#7F8FA9]">
              You have successfully claimed tokens from the faucet.
            </p>
            <p className="text-[#7F8FA9]">
              Check your venom wallets to find the tokens.
            </p>
            <p className="text-[#7F8FA9]">
              You can view results of the transaction in{" "}
              <span>
                <a href="#">explorer</a>
              </span>
            </p>
          </div>
          <Button
            btnStyles="w-full flex items-center justify-center bg-purple dark:bg-purple-lightest py-3 rounded-lg text-white mt-4"
            onClick={handleCloseModal}
          >
            Close
          </Button>
        </div>
      )}
    </div>
  );
};
