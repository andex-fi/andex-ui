import { FC, useState } from "react";
import Logo from "../assets/LogoLight.png";
import LogoWhite from "../assets/LogoLightSingle.png";
import { navLinks } from "../pages/homepage/utils";
import { Link, NavLink } from "react-router-dom";
import { Button } from "./Button";
import {
  SunIcon,
  Bars3CenterLeftIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export const Nav: FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenMenu = (): void => {
    setOpen(!open);
  };

  const activeLink = "text-[#fff]  font-bold hover:text-[#fff]";
  const normalLink = "text-[#A086C0] font-bold  hover:text-[#fff]";
  return (
    <div className="bg-[#240939] text-white flex flex-col gap-8 lg:gap-0 lg:flex-row lg:items-center lg:justify-between px-4 md:px-10 lg:px-20 py-6">
      <img
        src={Logo}
        alt="andex logo"
        className="hidden md:block md:w-[20%] lg:w-[8%]"
      />
      <img
        src={LogoWhite}
        alt="andex logo"
        className="block md:hidden w-[10%]"
      />

      {open ? (
        <div className="block lg:hidden absolute top-20 left-0 w-full bg-[#240939] py-10 z-10">
          <ul className="flex flex-col items-center gap-10 lg:gap-8">
            {navLinks.map((navlink, index) => (
              <NavLink
                to={navlink.link}
                key={index}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                <li>{navlink.name}</li>
              </NavLink>
            ))}
          </ul>

          <div className="flex flex-col mt-4 items-center gap-10">
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
      ) : null}

      <ul className="hidden lg:flex items-center gap-4 lg:gap-8">
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

      <div className="hidden lg:flex items-center gap-4">
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

      {open ? (
        <XMarkIcon
          className="w-8 h-8 block lg:hidden absolute top-6 right-4"
          onClick={handleOpenMenu}
        />
      ) : (
        <Bars3CenterLeftIcon
          className="w-8 h-8 block lg:hidden absolute top-6 right-4"
          onClick={handleOpenMenu}
        />
      )}
    </div>
  );
};
