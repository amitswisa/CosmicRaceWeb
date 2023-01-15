import React from "react";

const Headline = (props) => {
  return (
    <h1 className="headLine" style={props.style}>
      {props.title}
    </h1>
  );
};

export default Headline;
