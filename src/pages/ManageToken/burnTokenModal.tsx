import { FC } from "react";
import { Button } from "../../components/Button";

interface Props {
  setBurnToken: React.Dispatch<React.SetStateAction<boolean>>;
}

interface tokenDetails {
  name: string;
  value: string | number;
}

const token: tokenDetails[] = [
  {
    name: "Target Address",
    value: "0:a5c7faa181d88c7338d91fa8578cef02d7a118188844d84..",
  },
  { name: "Amount to burn", value: 2.2098 },
  {
    name: "Call back address",
    value: "0:a5c7faa181d88c7338d91fa8578cef02d7a118188844d84..",
  },
  { name: "Call back payload", value: 0 },
  { name: "Target Address Balance", value: 2203 },
  { name: "Circulating Supply", value: 2203 },
];

export const BurnTokenModal: FC<Props> = ({ setBurnToken }) => {
  const handleCloseBurnModal = (): void => {
    setBurnToken(false);
    document.body.style.overflow = "unset";
  };

  return (
    <div
      className="fixed h-full w-full inset-0 flex justify-center items-center p-4"
      style={{ background: "rgba(0, 0, 0, 0.2)", backdropFilter: "blur(9px)" }}
      onClick={handleCloseBurnModal}
    >
      <div
        className="w-full lg:w-[30%] h-[80vh] p-4 md:p-6 bg-white rounded-lg overflow-y-scroll"
        onClick={(e) => e.stopPropagation()}
      >
        <h4 className="text-[#13173E] font-bold">Burn tokens</h4>

        {token.map((item, index) => (
          <div
            key={index}
            className="border border-[#DFE8F9] p-4 rounded-lg mt-3 overflow-hidden bg-[#F4F5FA]"
          >
            <h4>{item.name}</h4>
            <p
              className={`${
                typeof item.value === "string"
                  ? "text-sm"
                  : "text-3xl lg:text-5xl"
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
