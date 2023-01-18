import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import LinkNavigation from "../components/LinkNavigation";
import JWTManager from "../classes/JWTManager";

const MainPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (JWTManager.isTokenValid()) navigate("/dashboard");
  }, [navigate]);

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
