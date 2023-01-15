import React, { Component } from "react";
import Logo from "../Components/Logo";
import LinkNavigation from "../Components/LinkNavigation";
class MainPage extends Component {
  render() {
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
  }
}

export default MainPage;
