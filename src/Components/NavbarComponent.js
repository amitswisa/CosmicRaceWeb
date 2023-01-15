import LinkNavigation from "./LinkNavigation";
import { useLocation } from "react-router-dom";

function NavbarComponent() {
  const location = useLocation();

  return (
    <>
      <div className="Navbar buttonGroup d-flex flex-row">
        <LinkNavigation link="/" text="Home" />
        {location.pathname !== "/Login" && (
          <LinkNavigation link="/Login" text="Login" />
        )}
        {location.pathname !== "/Register" && (
          <LinkNavigation link="/Register" text="Register" />
        )}
      </div>
    </>
  );
}

export default NavbarComponent;
