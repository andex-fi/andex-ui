import React, { FC } from "react";
import { Outlet } from "react-router-dom";

export const Pools: FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
