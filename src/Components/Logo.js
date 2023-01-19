import logo from "../images/logo.png";

const Logo = (props) => {
  return (
    <img
      src={logo}
      width={props.width}
      height={props.height}
      className="App-logo"
      alt="logo"
    />
  );
};

export default Logo;
