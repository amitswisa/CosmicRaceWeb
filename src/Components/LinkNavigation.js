import React from "react";
import "../styles/style.css";

const LinkNavigation = (props) => {
  return (
    <a className="LinkNavigation" style={props.style} href={props.link}>
      {props.text}
    </a>
  );
};

export default LinkNavigation;
