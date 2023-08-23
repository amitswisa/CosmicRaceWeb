import { useState, useEffect, useContext } from "react";
import WebSocketContext from "../contexts/WebSocketContext";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Headline from "../components/Headline";

const ControllerPage = () => {
  const navigate = useNavigate();
  const savedUsername = localStorage.getItem("username");
  const wsContext = useContext(WebSocketContext);
  const ws = wsContext.webSocket;

  const [isPortrait, setIsPortrait] = useState(
    window.innerHeight < window.innerWidth
  );
  const [gameStarted, setGameStarted] = useState(true);

  useEffect(() => checkOrientation, []);
  useEffect(() => setupWebSocketListeners, [ws]);

  const checkOrientation = () => {
    const handleResize = () =>
      setIsPortrait(window.innerHeight < window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  };

  const setupWebSocketListeners = () => {
    if (!ws) {
      alert("You are not registered to any room..");
      navigate("/room");
      return;
    }

    ws.onmessage = handleWebSocketMessage;
    ws.onclose = handleWebSocketClose;
  };

  const handleWebSocketMessage = (event) => {
    const res = event.data;

    if (res === "isAlive\n") {
      console.log("response to server: alive");
      ws.send("ALIVE");
    }
  };

  const handleWebSocketClose = () => {
    wsContext.setWebSocket(null);
    navigate("/");
  };

  const sendCommand = (action) => {
    const message = {
      m_MessageType: "COMMAND",
      m_Username: savedUsername,
      m_Action: action,
      m_Location: { x: 0.0, y: 0.0 },
    };
    ws.send(JSON.stringify(message));
  };

  const onButtonPressed = (action) => (e) => {
    e.preventDefault();
    sendCommand(action);
  };

  return (
    <pageContainer>
      {isPortrait ? renderPortraitContent() : renderLandscapeReminder()}
    </pageContainer>
  );

  function renderPortraitContent() {
    return (
      <Container className="d-flex flex-column">
        {gameStarted ? (
          renderGameControls()
        ) : (
          <Headline title="Waiting for host to start the game..." />
        )}
      </Container>
    );
  }

  function renderGameControls() {
    return (
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
              <ControlButton
                onTouchStart={onButtonPressed("RUN_LEFT")}
                onTouchEnd={onButtonPressed("IDLE")}
                src="left.png"
                alt="left arrow"
              />
              <ControlButton
                onTouchStart={onButtonPressed("RUN_RIGHT")}
                onTouchEnd={onButtonPressed("IDLE")}
                src="right.png"
                alt="right arrow"
              />
            </Container>
            <Container className="d-flex flex-row characterView">
              <img
                src={`characters/${savedUsername}.png`}
                alt="Character"
                width="64"
                height="64"
              />
            </Container>
            <Container className="d-flex flex-row controllerActionKeys">
              <ControlButton
                src="lightningAttack.png"
                style={{ width: "3vw" }}
                alt="lightning attack"
              />
              <ControlButton
                onTouchStart={onButtonPressed("JUMP")}
                onTouchEnd={onButtonPressed("IDLE")}
                src="upArrow.png"
                alt="up arrow"
              />
            </Container>
          </Container>
        </Container>
      </>
    );
  }

  function renderLandscapeReminder() {
    return (
      <Container className="portraitReminder">
        <h1>Please switch to Portrait Mode for optimal viewing.</h1>
      </Container>
    );
  }
};

const ControlButton = ({
  onTouchStart,
  onTouchEnd,
  src,
  alt,
  style,
  ...props
}) => {
  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  return (
    <button
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onContextMenu={handleContextMenu}
      style={style}
      className="controllerBtn btn btn-danger"
      {...props}>
      <img src={src} alt={alt} draggable="false" {...props} />
    </button>
  );
};

export default ControllerPage;
