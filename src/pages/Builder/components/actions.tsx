import { FC } from "react"
import { MintButton } from "./MintButton"
import { BurnButton } from "./BurnButton"
import { TransferButton } from "./TransferButton"

export const Actions: FC = () => {
    return (
        <div className="mt-6 lg:mt-0 w-full lg:w-[50%]">
            <h2 className="text-[#13173E] dark:text-white font-bold">
                Actions
            </h2>
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
                    <MintButton key="mint-button" />
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
                    <BurnButton key="burn-button" />
                </div>
            </div>
            <div className="mt-8 border-2 border-[red] rounded-2xl p-3">
                <h3>
                    Approach with caution
                </h3>
                <div className="w-full flex items-start justify-between gap-2 mt-4">
                    <div>
                        <h4 className="text-[#13173E] dark:text-white text-xs font-bold">
                            Transfer ownership
                        </h4>
                        <p className="text-[#7F8FA9] dark:text-white text-xs mt-1">
                            Set a new token owner
                        </p>
                    </div>
                    <TransferButton key="transfer-button" />
                </div>
            </div>
        </div>
    );
};