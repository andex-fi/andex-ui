import { Button } from "../../components/Button";
import { AddIcon, MinusIcon } from "@andex/uikit"
import { useNavigate } from "react-router-dom";
import FavoritePools from "./components/FavoritePools";
import { usePoolsStoreContext } from "../../contexts/PoolsStoreProvider";

const Liquiditypools: React.FC = () => {
  const pool = usePoolsStoreContext();
  console.log(pool);

  const navigate = useNavigate();

  const handleAddPosition = (): void => {
    navigate("/add");
  };

  const handleRemovePosition = (): void => {
    navigate("/remove");
  };

  return (
    <div
      className={`flex flex-col items-center justify-center w-full font-montserrat p-4 py-10 md:py-24`}
    >
      <div
        className={`w-full md:w-[60%] bg-white dark:bg-purple-darkest rounded-lg p-4`}
        style={{
          boxShadow: "0px 16px 64px rgba(55, 0, 98, 0.2)",
        }}
      >
        <div className=" justify-between items-center flex">
          <h1 className=" font-bold text-sm">Pools Overview</h1>

          {pool.wallet.address && (
            <div className="flex gap-3">
              <Button
                btnStyles="bg-[#52058F] dark:bg-purple-lightest px-3 py-1 rounded-2xl text-white text-sm col-span-2 col-end-7 flex items-center justify-center gap-2"
                onClick={handleAddPosition}
              >
                <span><AddIcon color="white"/></span>
                <p>New Position</p>
              </Button>
              <Button
                btnStyles="border-[#52058F] dark:border-purple-lightest text-[#52058F] border-2 px-3 py-1 rounded-2xl dark:text-white text-sm col-span-2 col-end-7 flex items-center justify-center gap-2"
                onClick={handleRemovePosition}
              >
                <span><MinusIcon /></span>
                <p>Remove Liquidity</p>
              </Button>
            </div>
          )}
        </div>

        {!pool.wallet.address ? (
          <>
            <div className="w-full md:w-[30rem] mx-auto bg-white dark:bg-purple-darkest rounded-lg p-4">
              <Button
                btnStyles="w-full px-2 py-4 flex items-center justify-center bg-[#52058F] text-white text-sm rounded-lg mt-6 font-bold"
                onClick={pool.wallet.connect}
              >
                <p>Connect Wallet</p>
              </Button>
            </div>
          </>
        ) : (
          <FavoritePools />
        )}
      </div>
    </div>
  );
};

export default Liquiditypools;