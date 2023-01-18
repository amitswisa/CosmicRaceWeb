import React from "react";
import Logo from "../components/Logo";
import LinkNavigation from "../components/LinkNavigation";

const MainPage = () => {
  return (
    <header className="App-header">
      <Logo />
      <div className="buttonGroup d-flex flex-column mb-3">
        <LinkNavigation link="/Login" text="Login with existing account" />
        <LinkNavigation link="/Register" text="Register with new account" />
        <LinkNavigation link="/" text="Play as a guest" />
      </div>
    </header>
  );
};

export default MainPage;
