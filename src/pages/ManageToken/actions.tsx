import { FC, useState } from "react";
import { Button } from "../../components/Button";
import { MintTokenModal } from "./mintTokenModal";

export const Actions: FC = () => {
  const [mintToken, setMintToken] = useState<boolean>(false);

  const handleMintToken = (): void => {
    setMintToken(true);
    document.body.style.overflow = "hidden";
  };

  return (
    <div className="mt-6 lg:mt-0 w-full lg:w-[50%]">
      <h4 className="text-[#13173E] dark:text-white font-bold">Actions</h4>
      <div className="bg-[#F4F5FA] dark:bg-purple-darkest p-3 mt-4 rounded-lg">
        <h3 className="text-[#13173E] dark:text-white font-bold text-sm">
          Manage circulating supply
        </h3>
        <div className="w-full flex items-start justify-between gap-2 mt-4">
          <div>
            <h4 className="text-[#13173E] dark:text-white text-xs font-bold">
              Mint
            </h4>
            <p className="text-[#7F8FA9] dark:text-white text-xs mt-1">
              Issue additional tokens to a specific address
            </p>
          </div>
          <Button
            btnStyles="flex items-center justify-center text-white rounded-3xl w-20 py-1 bg-[#9645D7]"
            onClick={handleMintToken}
          >
            Mint
          </Button>
        </div>
        <div className="w-full flex items-start justify-between gap-2 mt-4">
          <div>
            <h4 className="text-[#13173E] dark:text-white text-xs font-bold">
              Burn
            </h4>
            <p className="text-[#7F8FA9] dark:text-white text-xs mt-1">
              Burn tokens at a specific address
            </p>
          </div>
          <Button btnStyles="flex items-center justify-center text-white rounded-3xl w-20 py-1 bg-[#9645D7] ">
            Burn
          </Button>
        </div>
      </div>

      <div className="mt-8 border-2 border-[red] rounded-2xl p-3">
        <h3>Approach with caution</h3>
        <div className="w-full flex items-start justify-between gap-2 mt-4">
          <div>
            <h4 className="text-[#13173E] dark:text-white text-xs font-bold">
              Transfer ownership
            </h4>
            <p className="text-[#7F8FA9] dark:text-white text-xs mt-1">
              Set a new token owner
            </p>
          </div>
          <Button btnStyles="flex items-center justify-center text-white rounded-3xl w-24 py-1 bg-[#FA2B39] ">
            Transfer
          </Button>
        </div>
      </div>
      {mintToken && <MintTokenModal setMintToken={setMintToken} />}
    </div>
  );
};
