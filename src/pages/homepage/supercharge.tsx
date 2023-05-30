import { FC } from "react";
import { Button } from "../../components/Button";
import SuperchargeImg from "../../assets/superchargeimg.png";
import UnlockImg from "../../assets/unlockimg.png";

export const Supercharge: FC = () => {
  return (
    <div
      className="px-4 md:px-10 lg:px-48 py-20 text-white"
      style={{
        background: "linear-gradient(90deg, #270A3E 0%, #100618 100%)",
      }}
    >
      <div className="lg:flex items-center justify-center gap-10">
        <div>
          <div className="text-center lg:text-left">
            <h2 className="text-2xl lg:text-4xl font-extrabold mb-2">
              Supercharge Your
            </h2>
            <h2 className="text-2xl lg:text-4xl font-extrabold mb-2">
              Earnings with
            </h2>
            <h2 className="text-2xl lg:text-4xl font-extrabold mb-2">
              Farming and Staking
            </h2>
          </div>
          <p className="text-center lg:text-left opacity-80 text-sm my-5 w-full lg:w-[80%]">
            Participate in our innovative farming and staking programs to earn
            lucrative rewards. Amplify your profits and maximize your yield by
            harnessing the power of our advanced DeFi strategies, carefully
            designed to suit both beginners and experienced users
          </p>
          <div className="flex items-center justify-center lg:justify-normal gap-3">
            <Button btnStyles="bg-[#983BF6] text-white flex items-center justify-center font-bold px-4 py-2 text-sm rounded-lg">
              Coming soon
            </Button>
            <Button btnStyles="bg-[#3B1F5E] text-white flex items-center justify-center font-bold px-4 py-2 text-sm rounded-lg">
              Learn more
            </Button>
          </div>
        </div>
        <img
          src={SuperchargeImg}
          alt="Supercharge img"
          className="w-full lg:w-[40%] mt-8 lg:mt-0"
        />
      </div>
      <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-10 mt-20">
        <img src={UnlockImg} alt="UnlockImg" />

        <div>
          <div className="text-center lg:text-left">
            <h2 className="text-2xl lg:text-4xl font-extrabold mb-2">
              Unlock Limitless
            </h2>
            <h2 className="text-2xl lg:text-4xl font-extrabold mb-2">
              Possibilities with
            </h2>
            <h2 className="text-2xl lg:text-4xl font-extrabold mb-2">
              Borrowing and Lending
            </h2>
          </div>
          <p className="text-center lg:text-left opacity-80 text-sm my-5 w-full lg:w-[80%]">
            Leverage your assets for greater financial flexibility through our
            borrowing and lending capabilities. Seamlessly access capital or
            earn interest on your holdings with our user-friendly borrowing and
            lending options, tailored to your specific needs.
          </p>
          <div className="flex items-center justify-center lg:justify-normal gap-3">
            <Button btnStyles="bg-[#983BF6] text-white flex items-center justify-center font-bold px-4 py-2 text-sm rounded-lg">
              Coming soon
            </Button>
            <Button btnStyles="bg-[#3B1F5E] text-white flex items-center justify-center font-bold px-4 py-2 text-sm rounded-lg">
              Learn more
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
