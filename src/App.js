import logo from "./images/logo.png";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

function App() {
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

export default App;
