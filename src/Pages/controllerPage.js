import { useState, useEffect, useContext } from "react";
import WebSocketContext from "../contexts/WebSocketContext";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import Headline from "../components/Headline";

const ControllerPage = () => {
  const navigate = useNavigate();

  const wsContext = useContext(WebSocketContext);
  const ws = wsContext.webSocket;

  const [isPortrait, setIsPortrait] = useState(
    window.innerHeight > window.innerWidth
  ); // Initialize state based on current orientation
  const [gameStarted, setGameStarted] = useState(true);

  // Orientation check
  useEffect(() => {
    function handleResize() {
      setIsPortrait(window.innerHeight > window.innerWidth); // Update state based on current orientation
    }

    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /* useEffect(() => {
    if (!ws) {
      alert("Your are not registered to any room..");
      navigate("/room");
      return;
    }

    ws.onmessage = (event) => {
      console.debug("Received message from server: ", event.data);
    };

    ws.onclose = () => {
      // If the connection is closed, navigate the user back to the home page.
      wsContext.setWebSocket(null);
      navigate("/");
    };
  }, [ws]); */

  return (
    <pageContainer>
      {isPortrait ? (
        <Container className="d-flex flex-column">
          {gameStarted ? (
            <>
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
              <Container className="controllerGui d-flex flex-column">
                <h2>amitswisa</h2>
                <Container className="d-flex flex-row controllerKeys">
                  <div className="left">
                    <button className="controllerBtn btn btn-danger">
                      Left
                    </button>
                  </div>
                  <div className="right">
                    <button className="controllerBtn btn btn-danger">
                      Right
                    </button>
                  </div>
                </Container>
              </Container>
            </>
          ) : (
            <Container className="controllerViewStyle">
              <Headline title="Waiting for host to start the game..." />
            </Container>
          )}
        </Container>
      ) : (
        <Container className="portraitReminder">
          <h1>Please switch to Portrait Mode for optimal viewing.</h1>
        </Container>
      )}
    </pageContainer>
  );
};

export default ControllerPage;
