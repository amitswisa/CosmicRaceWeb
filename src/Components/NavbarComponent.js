import LinkNavigation from "./LinkNavigation";
import JWTManager from "../classes/JWTManager";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavbarComponent() {
  return (
    <>
      {JWTManager.isTokenValid() ? (
        <Navbar
          collapseOnSelect
          expand="lg"
          className="Navbar-extends"
          bg="dark"
          variant="dark">
          <Container>
            <Navbar.Brand href="/dashboard">CosmicRace</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/dashboard#Home">Home</Nav.Link>
                <Nav.Link href="#store">Store</Nav.Link>
                <NavDropdown title="Settings" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Change Password
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav>
                <Navbar.Text>
                  Signed in as: <a href="#login">{JWTManager.getUsername()}</a>{" "}
                  |
                </Navbar.Text>
                <Nav.Link href="/logout">Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      ) : (
        <div className="Navbar buttonGroup d-flex d-flex flex-row-reverse">
          <LinkNavigation link="/Register" text="Register" />
          <LinkNavigation link="/Login" text="Login" />
          <LinkNavigation link="/" text="Home" />
        </div>
      )}
    </>
  );
}

export default NavbarComponent;
