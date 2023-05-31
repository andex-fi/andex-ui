import { FC } from "react";
import { motion } from "framer-motion";
import PerpetualImg from "../../assets/perpetualimg.png";
import { Button } from "../../components/Button";

export const Perpetual: FC = () => {
  return (
    <div
      className="px-4 md:px-10 lg:px-48 pt-20 flex flex-col-reverse lg:flex-row items-center justify-center lg:gap-20 text-white relative"
      style={{
        background: "linear-gradient(180deg, #270A3E 0%, #100618 100%)",
      }}
    >
      <motion.img
        src={PerpetualImg}
        alt="PerpetualImg"
        className="w-full lg:w-[50%] mt-12 lg:mt-0 "
        whileInView={{ x: 0, opacity: 1 }}
        initial={{ x: -100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 20 }}
      />

      <motion.div
        whileInView={{ x: 0, opacity: 1 }}
        initial={{ x: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 20 }}
      >
        <div className="text-center lg:text-left">
          <h2 className="text-2xl lg:text-4xl font-extrabold mb-2">
            Trade Perpetual
          </h2>
          <h2 className="text-2xl lg:text-4xl font-extrabold mb-2">
            Contracts with Ease
          </h2>
        </div>
        <p className="text-center lg:text-left opacity-80 text-sm my-5 w-full lg:w-[80%]">
          Dive into the world of perpetual contracts and enjoy hassle-free
          trading with our intuitive platform. With Andex Protocol, you can take
          advantage of price movements, hedge risks, and engage in leveraged
          trading, all within a secure and reliable environment
        </p>
        <div className="flex items-center justify-center lg:justify-normal gap-3">
          <Button btnStyles="bg-[#983BF6] text-white flex items-center justify-center font-bold px-4 py-2 text-sm rounded-lg">
            Coming soon
          </Button>
          <Button btnStyles="bg-[#3B1F5E] text-white flex items-center justify-center font-bold px-4 py-2 text-sm rounded-lg">
            Learn more
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
