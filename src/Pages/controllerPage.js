/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from "react";
import WebSocketContext from "../contexts/WebSocketContext";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import Headline from "../components/Headline";

const ControllerPage = () => {
  const navigate = useNavigate();
  const savedUsername = localStorage.getItem("username");
  const savedCharacter = localStorage.getItem("character");

  const wsContext = useContext(WebSocketContext);
  const ws = wsContext.webSocket;

  const [isPortrait, setIsPortrait] = useState(
    window.innerHeight < window.innerWidth
  ); // Initialize state based on current orientation
  const [gameStarted, setGameStarted] = useState(true);

  // Orientation check
  useEffect(() => {
    function handleResize() {
      setIsPortrait(window.innerHeight < window.innerWidth); // Update state based on current orientation
    }

    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!ws) {
      alert("Your are not registered to any room..");
      navigate("/room");
      return;
    }

    ws.onmessage = (event) => {
      const res = event.data;

      if (res === "isAlive\n") {
        console.log("response to server: alive");
        ws.send("ALIVE");
        return;
      }
    };

    ws.onclose = () => {
      // If the connection is closed, navigate the user back to the home page.
      wsContext.setWebSocket(null);
      navigate("/");
    };
  }, [ws]);

  const leftButtonPressed = (e) => {
    console.log("left key pressed");

    // send left key pressed to server

    const message = {
      m_MessageType: "COMMAND",
      m_Username: savedUsername,
      m_Action: "RUN_LEFT",
      m_Location: { x: 0.0, y: 0.0 },
    };

    ws.send(JSON.stringify(message)); // Convert object to JSON string
  };

  const rightButtonPressed = (e) => {
    console.log("right key pressed");

    // send left key pressed to server

    const message = {
      m_MessageType: "COMMAND",
      m_Username: savedUsername,
      m_Action: "RUN_RIGHT",
      m_Location: { x: 0.0, y: 0.0 },
    };

    ws.send(JSON.stringify(message)); // Convert object to JSON string
  };

  const jumpButtonPressed = (e) => {
    console.log("right key pressed");

    // send left key pressed to server

    const message = {
      m_MessageType: "COMMAND",
      m_Username: savedUsername,
      m_Action: "JUMP",
      m_Location: { x: 0.0, y: 0.0 },
    };

    ws.send(JSON.stringify(message)); // Convert object to JSON string
  };

  const onButtonReleased = (e) => {
    const message = {
      m_MessageType: "COMMAND",
      m_Username: savedUsername,
      m_Action: "IDLE",
      m_Location: { x: 0.0, y: 0.0 },
    };

    ws.send(JSON.stringify(message)); // Convert object to JSON string
  };

  // update

  return (
    <pageContainer>
      {isPortrait ? (
        <Container className="d-flex flex-column">
          {gameStarted ? (
            <>
              <Container
                className="d-flex flex-row scoreBoard"
                style={{ textAlign: "center" }}>
                <div className="right">
                  <label>
                    Current place: <span>#1</span>
                  </label>
                </div>
              </Container>
              <Container className="controllerGui d-flex flex-column">
                <h2>{savedUsername}</h2>
                <Container className="d-flex flex-row">
                  <Container className="left d-flex flex-row controllerMoveKeys">
                    <div className="left">
                      <button
                        onTouchStart={leftButtonPressed}
                        onTouchEnd={onButtonReleased}
                        className="controllerBtn btn btn-danger">
                        <img src="left.png" width="32" alt="left arrow" />
                      </button>
                    </div>
                    <div className="right">
                      <button
                        onTouchStart={rightButtonPressed}
                        onTouchEnd={onButtonReleased}
                        className="controllerBtn btn btn-danger">
                        <img src="right.png" width="32" alt="right arrow" />
                      </button>
                    </div>
                  </Container>
                  <Container className="d-flex flex-row characterView">
                    <img
                      src="characters/{savedCharacter}.png"
                      alt="Character"
                      width="64"
                      height="64"
                    />
                  </Container>
                  <Container className="d-flex flex-row controllerActionKeys">
                    <div className="left">
                      <button className="controllerBtn btn btn-danger">
                        <img
                          src="lightningAttack.png"
                          style={{ width: "3vw" }}
                          alt="lightning attack"
                        />
                      </button>
                    </div>
                    <div className="right jumpBtn">
                      <button
                        onTouchStart={jumpButtonPressed}
                        onTouchEnd={onButtonReleased}
                        className="controllerBtn btn btn-danger">
                        <img src="upArrow.png" width="32" alt="up arrow" />
                      </button>
                    </div>
                  </Container>
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
