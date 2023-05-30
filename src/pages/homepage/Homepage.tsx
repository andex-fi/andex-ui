import { FC } from "react";
import { Hero } from "./hero";
import { Seamless } from "./seamless";
import { Perpetual } from "./perpetual";
import { Supercharge } from "./supercharge";
import { Protect } from "./protect";

export const Homepage: FC = () => {
  return (
    <div>
      <Hero />
      <Seamless />
      <Perpetual />
      <Supercharge />
      <Protect />
    </div>
  );
};
