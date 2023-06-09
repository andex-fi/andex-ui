import { FC } from "react";
import { Button } from "../../components/Button";
import ProtectImg from "../../assets/protectimg.svg";
import { motion } from "framer-motion";

export const Protect: FC = () => {
  return (
    <div
      className="px-4 md:px-10 lg:px-48 py-20 text-white w-full"
      style={{
        background: "linear-gradient(90deg, #270A3E 0%, #100618 100%)",
      }}
    >
      <motion.div
        className="lg:flex items-center justify-center gap-10"
        whileInView={{ y: 0, opacity: 1 }}
        initial={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 20 }}
      >
        <div>
          <div className="text-center lg:text-left">
            <h2 className="text-2xl lg:text-4xl font-extrabold mb-2">
              Protect Your assets with
            </h2>
            <h2 className="text-2xl lg:text-4xl font-extrabold mb-2">
              Comprehensive Insurance
            </h2>
          </div>
          <p className="text-center lg:text-left opacity-80 text-sm my-5 w-full lg:w-[80%]">
            Safeguard your investments with our robust asset insurance
            solutions. We understand the importance of security, which is why we
            offer comprehensive coverage to shield your assets from potential
            risks, giving you peace of mind as you explore new horizons.
          </p>
          <div className="flex items-center justify-center mt-2 lg:justify-normal gap-3">
            <Button btnStyles="bg-[#983BF6] text-white flex items-center justify-center font-bold px-8 py-3 text-sm rounded-lg">
              Coming soon
            </Button>
            <Button btnStyles="bg-[#3B1F5E] text-white flex items-center justify-center font-bold px-8 py-3 text-sm rounded-lg">
              Learn more
            </Button>
          </div>
        </div>
        <img
          src={ProtectImg}
          alt="Supercharge img"
          className="w-full lg:w-[40%] mt-8 lg:mt-0"
        />
      </motion.div>
    </div>
  );
};
