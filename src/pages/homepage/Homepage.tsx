import { FC } from "react";
import { Hero } from "./hero";
import { Seamless } from "./seamless";

export const Homepage: FC = () => {
  return (
    <div>
      <Hero />
      <Seamless />
    </div>
  );
};
