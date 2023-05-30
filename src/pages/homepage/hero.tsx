import { FC } from "react";
import { Button } from "../../components/Button";
import { Link } from "react-router-dom";

export const Hero: FC = () => {
  return (
    <section
      className="text-center text-white px-4 md:px-10 lg:px-20 py-10 md:pt-24"
      style={{
        background: "linear-gradient(90deg, #270A3E 0%, #100618 100%)",
      }}
    >
      <div>
        <h1 className="text-3xl lg:text-7xl font-extrabold mb-2">
          Rediscover Defi on
        </h1>
        <h1 className="text-3xl lg:text-7xl font-extrabold mb-2">
          Venom with Andex
        </h1>
      </div>

      <div className="mt-8">
        <p className="mb-1 text-md font-bold opacity-80">
          Swap, Provide Liquidity, Farm, Stake, Borrow, Lend, Trade Perpetual
        </p>
        <p className="mb-1 text-md font-bold opacity-80">
          Contracts, Farm with Leverage, and Insure Assets-all in one
        </p>
        <p className="mb-1 text-md font-bold opacity-80">
          comprehensive DeFi protocol
        </p>
      </div>

      <div className="flex items-center gap-6 justify-center mt-6">
        <Link to="/swap">
          <Button btnStyles="bg-[#983BF6] text-white flex items-center justify-center font-bold px-4 py-2 text-sm rounded-lg">
            Launch Dapp
          </Button>
        </Link>
        <Button btnStyles="bg-[#3B1F5E] text-white flex items-center justify-center font-bold px-4 py-2 text-sm rounded-lg">
          Learn more
        </Button>
      </div>
    </section>
  );
};
