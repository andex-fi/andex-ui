import React from "react";
import { useLocation } from "react-router-dom";
import { noop } from "lodash";
import useTheme from "../../hooks/useTheme";
import { Footer as UIKitFooter, footerLinks, langs } from "@andex/uikit";
import { Footer as HomepageFooter } from "../../pages/homepage/footer";

const MOBILE_MENU_HEIGHT = 44;

const Footer: React.FC = () => {
    const location = useLocation();
    const { isDark, toggleTheme } = useTheme();
    return (
        <>
            {location.pathname === "/" ? <HomepageFooter /> :
            <UIKitFooter
            items={footerLinks}
            isDark={isDark}
            toggleTheme={toggleTheme}
            langs={langs}
            setLang={noop}
            currentLang="EN"
            andxPriceUsd={0.023158668932877668}
            buyAndxLabel="Buy ANDX"
            mb={[`${MOBILE_MENU_HEIGHT}px`, null, "0px"]}
          />
            }
        </>
    )
}

export default Footer;