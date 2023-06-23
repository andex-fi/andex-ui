import { noop } from "lodash";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Nav } from "./Nav";
import Navbar from "./Navbar";
import useTheme from "../hooks/useTheme";
import { Footer, footerLinks, langs } from "@andex/uikit";
import { Footer as HomepageFooter } from "../pages/homepage/footer";

const MOBILE_MENU_HEIGHT = 44;

const Layout: React.FC = (props) => {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme()
  return (
    <div className="bg-[#EBF1FF] dark:bg-purple-dark h-min-screen w-full">
      {location.pathname === "/" ? <Nav /> : <Navbar />}
      <Outlet />
      {location.pathname === "/" ? <HomepageFooter /> : 
      <Footer
        items={footerLinks}
        isDark={isDark}
        toggleTheme={toggleTheme}
        langs={langs}
        setLang={noop}
        currentLang="EN"
        andxPriceUsd={0.023158668932877668}
        buyAndxLabel="Buy ANDX"
        mb={[`${MOBILE_MENU_HEIGHT}px`, null, "0px"]}
        {...props}
      />
      }
    </div>
  );
}

export default Layout;
