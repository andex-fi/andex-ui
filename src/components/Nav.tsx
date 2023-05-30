import React, { FC } from "react";
import Logo from "../assets/LogoWhite.png";
import LogoWhite from "../assets/LogoWhiteSingle.png";
import { navLinks } from "../pages/homepage/utils";
import { Link, NavLink } from "react-router-dom";
import { Button } from "./Button";
import { SunIcon } from "@heroicons/react/24/outline";

export const Nav: FC = () => {
  const activeLink = "text-[#fff]  font-bold hover:text-[#fff]";
  const normalLink = "text-[#A086C0] font-bold  hover:text-[#fff]";
  return (
    <div className="bg-[#240939] text-white lg:flex items-center justify-between px-4 md:px-10 lg:px-20 py-6">
      <img src={Logo} alt="andex logo" className="hidden md:block lg:w-[8%]" />
      <img
        src={LogoWhite}
        alt="andex logo"
        className="block md:hidden w-[10%]"
      />

      <ul className="flex items-center gap-4 lg:gap-8">
        {navLinks.map((navlink, index) => (
          <NavLink
            to={navlink.link}
            key={index}
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
          >
            <li>{navlink.name}</li>
          </NavLink>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        <div
          className="p-2 rounded-lg cursor-pointer"
          style={{ background: "rgba(67, 50, 83, 0.29)" }}
        >
          <SunIcon className="w-6 h-6" />
        </div>
        <Link to="/swap">
          <Button btnStyles="bg-[#983BF6] px-4 py-2 flex items-center justify-center rounded-lg font-bold text-sm">
            Launch Dapp
          </Button>
        </Link>
      </div>
    </div>
  );
};
