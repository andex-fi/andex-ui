import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Nav } from "./Nav";
import Navbar from "./Navbar";

function Layout() {
  const location = useLocation();
  return (
    <div className="bg-[#EBF1FF] dark:bg-purple-dark h-min-screen w-full">
      {location.pathname === "/" ? <Nav /> : <Navbar />}
      <Outlet />
    </div>
  );
}

export default Layout;
