import { FC } from "react";
import { Hero } from "./hero";
import { Seamless } from "./seamless";
import { Perpetual } from "./perpetual";
import { Supercharge } from "./supercharge";

export const Homepage: FC = () => {
  return (
    <div>
      <Hero />
      <Seamless />
      <Perpetual />
      <Supercharge />
    </div>
  );
};
