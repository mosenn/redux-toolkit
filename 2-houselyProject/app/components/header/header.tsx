import React from "react";
import DesktopMenu from "./menu/desktop-menu";
import MobileMenu from "./menu/mobile-menu";
import AuthInitializer from "../auth-initializer/auth-init";

const Header = () => {
  return (
    <header>
      <AuthInitializer />
      <DesktopMenu />
      <MobileMenu />
    </header>
  );
};

export default Header;
