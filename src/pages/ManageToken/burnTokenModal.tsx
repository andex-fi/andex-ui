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
        className="w-full lg:w-[30%] h-[80vh] p-4 md:p-6 bg-white dark:bg-purple-light rounded-lg overflow-y-scroll"
        onClick={(e) => e.stopPropagation()}
      >
        <h4 className="text-[#13173E] dark:text-white font-bold">
          Burn tokens
        </h4>

        <div className="border border-[#DFE8F9] p-4 rounded-lg mt-3 overflow-hidden bg-[#F4F5FA] dark:bg-purple-darkest">
          <h4>Target Address</h4>
          <input
            type="text"
            placeholder="0:a5c7faa181d88c7338d91fa8578cef02d7a118188844d84.."
            className="w-full bg-[#F4F5FA] dark:bg-purple-darkest mt-1 focus:border-[#F4F5FA]"
          />
        </div>

        <div className="border border-[#DFE8F9] p-4 rounded-lg mt-3 overflow-hidden bg-[#F4F5FA] dark:bg-purple-darkest">
          <h4>Amount to burn</h4>
          <input
            type="text"
            placeholder="2.2098"
            className="w-full bg-[#F4F5FA] dark:bg-purple-darkest mt-1 focus:border-[#F4F5FA] text-5xl font-bold"
          />
        </div>

        <div className="border border-[#DFE8F9] p-4 rounded-lg mt-3 overflow-hidden bg-[#F4F5FA] dark:bg-purple-darkest">
          <h4>Call back Address</h4>
          <input
            type="text"
            placeholder="0:a5c7faa181d88c7338d91fa8578cef02d7a118188844d84.."
            className="w-full bg-[#F4F5FA] dark:bg-purple-darkest mt-1 focus:border-[#F4F5FA]"
          />
        </div>

        <div className="border border-[#DFE8F9] p-4 rounded-lg mt-3 overflow-hidden bg-[#F4F5FA] dark:bg-purple-darkest">
          <h4>Call back Payload</h4>
          <input
            type="text"
            placeholder="0"
            className="w-full bg-[#F4F5FA] dark:bg-purple-darkest mt-1 focus:border-[#F4F5FA] text-5xl font-bold"
          />
        </div>

        {token.map((item, index) => (
          <div
            key={index}
            className="border border-[#DFE8F9] p-4 rounded-lg mt-3 overflow-hidden bg-[#F4F5FA] dark:bg-purple-darkest"
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
          <Button
            btnStyles="text-[#52058F] bg-[#F4F5FA] rounded-2xl w-48 py-4 font-bold border-2 border-[#DFE8F9]"
            onClick={handleCloseBurnModal}
          >
            Cancel
          </Button>
          <Button btnStyles="bg-[#52058F] text-white rounded-2xl w-48 py-4 font-bold dark:bg-purple-darkest">
            Enter all data
          </Button>
        </div>
      </div>
    </div>
  );
};
