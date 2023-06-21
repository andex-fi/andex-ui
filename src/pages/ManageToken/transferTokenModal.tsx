import { FC } from "react";
import { Button } from "../../components/Button";
import { CiWarning } from "react-icons/ci";

interface Props {
  setTransferToken: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TransferTokenModal: FC<Props> = ({ setTransferToken }) => {
  const handleCloseTokenModal = (): void => {
    setTransferToken(false);
    document.body.style.overflow = "unset";
  };

  return (
    <div
      className="fixed h-full w-full inset-0 flex justify-center items-center p-4"
      style={{ background: "rgba(0, 0, 0, 0.2)", backdropFilter: "blur(9px)" }}
      onClick={handleCloseTokenModal}
    >
      <div
        className="w-full lg:w-[35%] h-[50vh] p-4 md:p-6 bg-white dark:bg-purple-light rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h4 className="text-[#13173E] dark:text-white font-bold">
          Transfer token ownership
        </h4>

        <div className="mt-3 border-[1px] border-[#FA2B39] rounded-lg p-4 text-[#FA2B39]">
          <div className="flex items-center gap-2 font-bold">
            <CiWarning />
            <h4>Warning</h4>
          </div>
          <h5 className="text-sm font-bold my-1">This is irreversible</h5>
          <p className="text-sm">
            Please double check the target address before confirming{" "}
          </p>
          <p className="text-sm">the transaction</p>
        </div>

        <div className="w-full h-16 border-[1px] border-[#DFE8F9] p-2 mt-4 rounded-lg dark:bg-purple-light">
          <input
            type="text"
            placeholder="New owner address"
            className="w-full h-full dark:bg-purple-light"
          />
        </div>

        <div className="flex items-center justify-between gap-4 mt-4">
          <Button
            btnStyles="text-[#52058F] bg-[#F4F5FA] rounded-2xl w-56 py-4 font-bold border-2 border-[#DFE8F9]"
            onClick={handleCloseTokenModal}
          >
            Cancel
          </Button>
          <Button btnStyles="bg-[#52058F] text-white rounded-2xl w-56 py-4 font-bold dark:bg-purple-darkest">
            Enter all data
          </Button>
        </div>
      </div>
    </div>
  );
};
