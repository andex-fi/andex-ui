import { useEffect, useState } from "react";
import "../index.css";

import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3CenterLeftIcon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import styled from "styled-components";
import LogoLight from "../assets/LogoLight.png";
import LogoLightSingle from "../assets/LogoLightSingle.png";
import LogoDark from "../assets/LogoDark.png";
import LogoDarkSingle from "../assets/LogoDarkSingle.png";
import { Link } from "react-router-dom";
import WalletDropDown from "./WalletDropDown";
import { useWallet } from "../hooks/useWallet";
import { Observer } from "mobx-react-lite";
import useTheme from "../hooks/useTheme";

const NavContainer = styled.div`
  background: ${({ theme }) => theme.colors.background};
`

const navigation = [
  { name: "Swap", href: "/swap", current: true },
  { name: "Builder", href: "/builder", current: false },
  { name: "Pools", href: "/pools", current: false },
];
const userNavigation = [
  { name: "Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Navbar: React.FC = () => {

  const wallet = useWallet();

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const { toggleTheme } = useTheme()

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
    toggleTheme();
  };

  return (
    <NavContainer>
      <Disclosure as="nav">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 md:py-6 font-montserrat">
              <div className="flex h-16 justify-between">
                <div className="flex">
                  <div className="-ml-2 mr-2 flex items-center md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3CenterLeftIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="flex flex-shrink-0 items-center">
                    <Link to="/">
                      <div className="block h-8 w-auto lg:hidden">
                        <img
                          src={darkMode ? LogoLightSingle : LogoDarkSingle}
                          alt="Andex"
                          className="h-8"
                        />
                      </div>
                    </Link>
                    <Link to="/">
                      <div className="hidden h-8 w-auto lg:block">
                        <img
                          src={darkMode ? LogoLight : LogoDark}
                          alt="Andex"
                          className="h-8"
                        />
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        item.current
                          ? "text-[#983BF6]"
                          : "text-grey hover:text-purple-lightest",
                        "rounded-md px-3 py-2 text-md font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="flex items-center">
                  <div className="flex">
                    <button
                      type="button"
                      className="hidden items-center rounded-md bg-[#D1D5FF] mr-3 px-3 py-2 text-sm font-semibold text-purple-lightest shadow-sm lg:block dark:bg-purple/75"
                      onClick={() => handleDarkMode()}
                    >
                      {" "}
                      {darkMode ? (
                        <SunIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MoonIcon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </button>
                    <Observer>
                      {() =>
                        wallet.address ? (
                          <WalletDropDown />
                        ) : (
                          <button
                            type="button"
                            onClick={() => wallet.connect()}
                            className="inline-flex items-center rounded-lg px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 bg-purple text-white dark:bg-purple-lightest"
                          >
                            Connect Wallet
                          </button>
                        )
                      }
                    </Observer>
                  </div>
                  <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.href}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden font-montserrat">
              <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-[#983BF6] text-white"
                        : "text-grey hover:bg-[#983BF6] hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </NavContainer>
  );
}

export default Navbar;
