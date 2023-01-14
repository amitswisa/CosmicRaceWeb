import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import "./styles/MainPage.css";
import logo from "./images/logo.png";

class MainPage extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="buttonGroup d-flex flex-column mb-3">
            <Button variant="light">Login with existing account</Button>
            <Button variant="light">Register with new account</Button>
            <Button variant="light">Play as a guest</Button>
          </div>
        </header>
      </div>
    );
  }
}

export default MainPage;
