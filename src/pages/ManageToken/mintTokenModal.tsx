import { FC } from "react";
import { Button } from "../../components/Button";

interface Props {
  setMintToken: React.Dispatch<React.SetStateAction<boolean>>;
}

interface tokenDetails {
  name: string;
  value: string | number;
}

const token: tokenDetails[] = [
  {
    name: "Token Address",
    value: "0:a5c7faa181d88c7338d91fa8578cef02d7a118188844d84..",
  },
  { name: "Amount to mint", value: 2.2098 },
  { name: "Target Address Balance", value: 2.2098 },
  { name: "Circulating Supply", value: 2.2098 },
];

export const MintTokenModal: FC<Props> = ({ setMintToken }) => {
  const handleCloseMintModal = (): void => {
    setMintToken(false);
    document.body.style.overflow = "unset";
  };

  return (
    <div
      className="fixed h-full w-full inset-0 flex justify-center items-center"
      style={{ background: "rgba(0, 0, 0, 0.2)", backdropFilter: "blur(9px)" }}
      onClick={handleCloseMintModal}
    >
      <div
        className="w-full lg:w-[30%] h-fit p-4 md:p-6 bg-white dark:bg-purple-light rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h4 className="text-[#13173E] dark:text-white font-bold">
          Mint tokens
        </h4>

        {token.map((item, index) => (
          <div
            key={index}
            className="border border-[#DFE8F9] p-4 rounded-lg mt-3 overflow-hidden bg-[#F4F5FA] dark:bg-purple-darkest"
          >
            <h4>{item.name}</h4>
            <p
              className={`${
                typeof item.value === "string" ? "text-sm" : "text-5xl"
              } font-bold`}
            >
              {item.value}
            </p>
          </div>
        ))}

        <div className="flex items-center justify-between gap-4 mt-4">
          <Button btnStyles="text-[#52058F] bg-[#F4F5FA] rounded-2xl w-48 py-4 font-bold border-2 border-[#DFE8F9]">
            Cancel
          </Button>
          <Button btnStyles="bg-[#52058F] text-white rounded-2xl w-48 py-4 font-bold">
            Enter all data
          </Button>
        </div>
      </div>
    </div>
  );
};
