import { FC } from "react";
import { Hero } from "./hero";
import { Seamless } from "./seamless";
import { Perpetual } from "./perpetual";
import { Supercharge } from "./supercharge";
import { Protect } from "./protect";
import { Thriving } from "./thriving";

export const Homepage: FC = () => {
  return (
    <div className="w-full">
      <Hero />
      <Seamless />
      <Perpetual />
      <Supercharge />
      <Protect />
      <Thriving />
    </div>
  );
};
