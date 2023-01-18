import LinkNavigation from "./LinkNavigation";
import JWTManager from "../classes/JWTManager";

function NavbarComponent() {
  return (
    <div className="Navbar buttonGroup d-flex flex-row">
      {JWTManager.isTokenValid() ? (
        <LinkNavigation link="/Logout" text="Logout" />
      ) : (
        <>
          <LinkNavigation link="/" text="Home" />
          <LinkNavigation link="/Login" text="Login" />
          <LinkNavigation link="/Register" text="Register" />
        </>
      )}
    </div>
  );
}

export default NavbarComponent;
