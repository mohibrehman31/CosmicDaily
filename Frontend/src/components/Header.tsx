import React, { useState } from "react";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import SignUp from "./SignUp";
import Login from "./Login";

const Header: React.FC = () => {
  const [openNavigation, setOpenNavigation] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const toggleNavigation = (): void => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleSignUpClick = () => {
    setShowSignUp(true);
    setShowLogin(false);
    disablePageScroll();
  };

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowSignUp(false);
    disablePageScroll();
  };

  const handleCloseModal = () => {
    setShowSignUp(false);
    setShowLogin(false);
    enablePageScroll();
  };

  const handleSwitchToLogin = () => {
    setShowSignUp(false);
    setShowLogin(true);
  };

  const handleSwitchToSignUp = () => {
    setShowLogin(false);
    setShowSignUp(true);
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full z-50 border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
          openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
        }`}
      >
        <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
          <a className="block w-[12rem] xl:mr-8" href="#hero">
            <div className="aspect-w-16 aspect-h-9">
              <img
                src="../public/Logo2.png"
                alt="Logo"
                className="object-contain w-full h-full"
              />
            </div>
          </a>

          <nav
            className={`${
              openNavigation ? "flex" : "hidden"
            } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
          >
            <HamburgerMenu />
          </nav>

          <button
            onClick={handleSignUpClick}
            className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block"
          >
            New account
          </button>
          <Button className="hidden lg:flex" onClick={handleLoginClick}>
            Sign in
          </Button>

          <Button
            className="ml-auto lg:hidden"
            px="px-3"
            onClick={toggleNavigation}
          >
            <MenuSvg openNavigation={openNavigation.toString()} />
          </Button>
        </div>
      </div>

      {showSignUp && (
        <SignUp onClose={handleCloseModal} onSwitchToLogin={handleSwitchToLogin} />
      )}
      {showLogin && (
        <Login onClose={handleCloseModal} onSwitchToSignUp={handleSwitchToSignUp} />
      )}
    </>
  );
};

export default Header;
