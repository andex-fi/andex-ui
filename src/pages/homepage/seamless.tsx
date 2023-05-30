import { FC } from "react";
import { Button } from "../../components/Button";
import { Link } from "react-router-dom";
import SeamlessImg from "../../assets/seamlessswap.png";
import { motion } from "framer-motion";

export const Seamless: FC = () => {
  return (
    <div
      className="lg:flex items-center justify-center px-4 md:px-10 lg:px-20 py-20 text-white"
      style={{
        background: "linear-gradient(180deg, #270A3E 0%, #100618 100%)",
      }}
    >
      <motion.div
        className="text-center lg:text-left"
        whileInView={{ x: 0, opacity: 1 }}
        initial={{ x: -100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 20 }}
      >
        <div>
          <h1 className="text-2xl lg:text-4xl font-extrabold mb-2">
            Seamless Swaps and{" "}
          </h1>
          <h1 className="text-2xl lg:text-4xl font-extrabold mb-2">
            Liquidity Provision
          </h1>
        </div>
        <p className="opacity-80 text-sm my-5 w-full lg:w-[80%]">
          Experience seamless asset swapping and provide liquidity effortlessly.
          Our intuitive interface ensures fast and secure transactions, enabling
          you to access a diverse range of tokens and optimize your capital
          deployment
        </p>
        <div className="flex items-center justify-center lg:justify-normal gap-3">
          <Link to="/swap">
            <Button btnStyles="bg-[#983BF6] text-white flex items-center justify-center font-bold px-4 py-2 text-sm rounded-lg">
              Launch Dapp
            </Button>
          </Link>
          <Button btnStyles="bg-[#3B1F5E] text-white flex items-center justify-center font-bold px-4 py-2 text-sm rounded-lg">
            Learn more
          </Button>
        </div>
      </motion.div>

      <motion.img
        src={SeamlessImg}
        alt="SeamlessImg"
        className="w-full lg:w-[50%] mt-6 lg:mt-0"
        whileInView={{ x: 0, opacity: 1 }}
        initial={{ x: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 20 }}
      />
    </div>
  );
};
