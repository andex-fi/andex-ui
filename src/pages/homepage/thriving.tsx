import { FC } from "react";
import { Button } from "../../components/Button";

export const Thriving: FC = () => {
  return (
    <div
      className="text-center text-white px-4 md:px-10 lg:px-[25%] py-28"
      style={{
        background: "linear-gradient(90deg, #270A3E 0%, #100618 100%)",
      }}
    >
      <div>
        <h2 className="text-2xl lg:text-4xl font-extrabold mb-2">
          Join Our Thriving Community and
        </h2>
        <h2 className="text-2xl lg:text-4xl font-extrabold mb-2">
          Shape the Future of DeFi
        </h2>
      </div>
      <p className="opacity-80 text-sm my-5">
        At Andex Protocol, we believe that true innovation thrives within a
        vibrant community of like-minded individuals. That's why we invite you
        to join our growing ecosystem of DeFi enthusiasts, builders, and
        visionaries. Together, we can shape the future of decentralized finance.
      </p>
      <div className="flex items-center justify-center">
        <Button btnStyles="bg-[#983BF6] text-white flex items-center justify-center font-bold px-4 py-2 text-sm rounded-lg">
          Join Community
        </Button>
      </div>
    </div>
  );
};
