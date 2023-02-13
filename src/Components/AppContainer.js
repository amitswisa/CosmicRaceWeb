import { Container } from "react-bootstrap";

const AppContainer = (props) => {
  return (
    <Container
      className={"AppContainer " + props.className}
      style={props.style}>
      {props.children}
    </Container>
  );
};

export default AppContainer;
