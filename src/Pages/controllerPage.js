import { Container } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";

const ControllerPage = () => {
  // TODO - redirect people with no autherized access to this page.

  return (
    <pageContainer>
      <Container className="d-flex flex-row scoreBoard">
        <div className="right">
          <label>
            Current place: <span>#1</span>
          </label>
        </div>
        <div class="mpBar">
          <ProgressBar
            animated
            now={40}
            className="progressBar"
            variant="warning"
            label="40 / 100"
          />
        </div>
      </Container>
    </pageContainer>
  );
};

export default ControllerPage;
