import { FC } from "react";
import { Button } from "../../components/Button";
// import { useNavigate } from "react-router-dom";
import { Pools, Positions } from "./positions";
import { useAccountContext } from "../../hooks/accountContext";
import { useNavigate } from "react-router-dom";

export const Liquiditypools: FC = () => {
  // const [positions, setPositions] = useState<boolean>(false);
  const { address, connect } = useAccountContext();
  const handleConnectWallet = (): void => {
    connect();
  };

  const navigate = useNavigate();

  const handleAddPosition = (): void => {
    navigate("/addliquidity");
  };

  return (
    <div
      className={`flex flex-col items-center justify-center w-full font-montserrat bg-[#E5E5E5] dark:bg-purple-dark p-4 py-10 md:py-24`}
    >
      <div
        className={`w-full md:w-[60%] bg-white dark:bg-purple-darkest rounded-lg p-4`}
        style={{
          boxShadow: "0px 16px 64px rgba(55, 0, 98, 0.2)",
        }}
      >
        <div className="grid grid-cols-6">
          <h1 className="col-span-2 font-bold text-sm">Pools Overview</h1>

          {address && (
            <Button
              btnStyles="bg-[#9645D7] px-2 py-1 rounded-2xl text-white text-sm col-span-2 col-end-7 flex items-center justify-center gap-2"
              onClick={handleAddPosition}
            >
              <span>+</span>
              <p>New Position</p>
            </Button>
          )}
        </div>

        {!address ? (
          <>
            <div className="w-full md:w-[30rem] mx-auto bg-white dark:bg-purple-darkest rounded-lg p-4">
              <Button
                btnStyles="w-full px-2 py-4 flex items-center justify-center bg-[#52058F] text-white text-sm rounded-lg mt-6 font-bold"
                onClick={handleConnectWallet}
              >
                <p>Connect Wallet</p>
              </Button>
            </div>
          </>
        ) : Positions && Positions?.length > 0 ? (
          <div className="mt-4">
            <div className="flex items-center justify-between text-[#657795]">
              <h4 className="text-sm font-bold">
                Your positions(<span>{Positions.length}</span>)
              </h4>
              <p className="text-sm font-bold">Status</p>
            </div>

            {Positions.map((position, index) => (
              <div
                key={index}
                className="bg-[#F4F5FA] dark:bg-purple-light p-4 w-full my-4 rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={position.img} alt={position.name} />
                    <h3 className="font-bold text-md uppercase">
                      {position.name}
                    </h3>
                    <p
                      className="text-[#7F8FA9] text-xs p-1"
                      style={{ background: "rgba(127, 143, 169, 0.16)" }}
                    >
                      {position.percentage}
                    </p>
                  </div>

                  <div>
                    <p
                      className="py-1 px-2 flex items-center gap-2 text-[#7F8FA9] text-sm font-bold"
                      style={{ background: "rgba(127, 143, 169, 0.16)" }}
                    >
                      <div
                        className={`${
                          position.status === "In range"
                            ? "bg-[#33EC82] h-2 w-2 rounded-full"
                            : "border border-[#7F8FA9] h-2 w-2 rounded-full"
                        }`}
                      ></div>
                      {position.status}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-2">
                  <div>
                    <p className="text-sm">
                      Min:{" "}
                      <span className="text-[#13173E] dark:text-white font-bold">
                        {position.min}
                      </span>
                    </p>
                  </div>

                  <div>
                    <p className="text-sm">
                      Max:{" "}
                      <span className="text-[#13173E] dark:text-white font-bold">
                        {position.max}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-48">
            <p className="font-bold">No positions found</p>
          </div>
        )}
      </div>

      <div className={`w-full md:w-[70%] mt-12`}>
        <h3 className="text-[#13173E] font-bold text-sm">All pools</h3>

        <div className="w-full overflow-x-auto">
          <div
            className={`w-full min-w-[800px] bg-white dark:bg-purple-light rounded-lg p-4 mt-3`}
          >
            <div className="w-full grid grid-cols-4">
              {["Pool", "TVL", "Volume 24H", "Volume 7D"].map((heading) => (
                <h4 className="text-[#657795] font-bold text-sm">{heading}</h4>
              ))}
            </div>
            <hr className="w-full mt-3 text-[#DFE8F9]" />
            {Pools.map((pool) => (
              <>
                <div className="w-full m grid grid-cols-4 py-4">
                  <div className="flex items-center gap-2">
                    <img src={pool.img} alt={pool.img} />
                    <h3 className="text-[#000000] dark:text-white font-bold">
                      {pool.name}
                    </h3>
                    {pool.percentage && (
                      <div
                        className="text-[#7F8FA9] dark:text-white text-xs p-1"
                        style={{ background: "rgba(127, 143, 169, 0.16)" }}
                      >
                        {pool.percentage}
                      </div>
                    )}
                  </div>
                  <p className="text-[#000000] dark:text-white font-bold text-sm">
                    {pool.tvl}
                  </p>
                  <p className="text-[#000000] dark:text-white font-bold text-sm">
                    {pool.vol24h}
                  </p>
                  <p className="text-[#000000] dark:text-white font-bold text-sm">
                    {pool.vol7d}
                  </p>
                </div>
                <hr className="w-full mt-3 text-[#DFE8F9]" />
              </>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center mt-8">
          <Button btnStyles="bg-[#9645D7] text-white py-2 px-3 rounded-3xl font-bold text-sm">
            Load more
          </Button>
        </div>
      </div>
    </div>
  );
};
