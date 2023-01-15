import LinkNavigation from "./LinkNavigation";

function NavbarComponent() {
  return (
    <>
      <div className="Navbar buttonGroup d-flex flex-row">
        <LinkNavigation link="/" text="Home" />
        <LinkNavigation link="/Login" text="Login" />
        <LinkNavigation link="/Register" text="Register" />
      </div>
    </>
  );
}

export default NavbarComponent;
