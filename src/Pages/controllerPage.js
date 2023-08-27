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
  const [activeMovement, setActiveMovement] = useState(null); // <-- New State
  const [notificationQueue, SetNotificationQueue] = useState([
    "Waiting for host to start the game...",
  ]);

  useEffect(() => checkOrientation, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    //const res = event.data;
    const messageData = JSON.parse(event.data);

    // eslint-disable-next-line default-case
    switch (messageData.ActionType) {
      case "CONFIRMATION":
        ws.send("ALIVE");
        console.log("Passed server alive check.");
        break;
      case "NOTIFICATION":
        if (messageData.MessageContent === "Starting match..") {
          setGameStarted(true);
        }

        SetNotificationQueue([
          ...notificationQueue,
          messageData.MessageContent,
        ]);
        break;
      case "ACTION":
        if (messageData.MessageContent === "START") {
          SetNotificationQueue([...notificationQueue, "Playing!"]);
        }
        break;
      case "MESSAGE":
        if (messageData.MessageContent === "MATCH_TERMINATION") {
          alert("Game has ended. Returning to room page.");
          navigate("/room");
        }
        break;
    }

    // if (res === "isAlive\n") {
    //   console.log("response to server: alive");
    //   ws.send("ALIVE");
    // }
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
    if (action === "RUN_LEFT" || action === "RUN_RIGHT") {
      if (activeMovement !== action) {
        // Only send command if the active movement changes
        sendCommand(action);
        setActiveMovement(action);
      }
    } else {
      // Action buttons like JUMP or ATTACK
      sendCommand(action);
    }
  };

  const onButtonReleased = (action) => (e) => {
    e.preventDefault();
    if (action === "RUN_LEFT" || action === "RUN_RIGHT") {
      sendCommand("IDLE");
      setActiveMovement(null);
    }
    // Action buttons like JUMP or ATTACK don't change the movement,
    // so no need to handle them here
  };

  return (
    <Container>
      {isPortrait ? renderPortraitContent() : renderLandscapeReminder()}
    </Container>
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
            <label className="notificationLabel">
              {gameStarted
                ? notificationQueue[notificationQueue.length - 1]
                : "Game Rank: #1"}
            </label>
          </div>
        </Container>
        <Container className="controllerGui d-flex flex-column">
          <h2>{savedUsername}</h2>
          <Container className="d-flex flex-row">
            <Container className="left d-flex flex-row controllerMoveKeys">
              <ControlButton
                onTouchStart={onButtonPressed("RUN_LEFT")}
                onTouchEnd={onButtonReleased("RUN_LEFT")} // <-- Updated
                src="left.png"
                alt="left arrow"
              />
              <ControlButton
                onTouchStart={onButtonPressed("RUN_RIGHT")}
                onTouchEnd={onButtonReleased("RUN_RIGHT")} // <-- Updated
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
                onTouchStart={onButtonPressed("ATTACK")} // <-- Assuming you want an attack action
                onTouchEnd={onButtonReleased("ATTACK")}
                src="lightningAttack.png"
                style={{ width: "3vw" }}
                alt="lightning attack"
              />
              <ControlButton
                onTouchStart={onButtonPressed("JUMP")}
                onTouchEnd={onButtonReleased("JUMP")}
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
  const preventDefault = (e) => {
    e.preventDefault();
  };

  return (
    <button
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchMove={preventDefault}
      onContextMenu={preventDefault}
      onMouseDown={preventDefault}
      onMouseUp={preventDefault}
      onClick={preventDefault}
      style={style}
      className="controllerBtn btn btn-danger"
      {...props}>
      <img src={src} alt={alt} draggable="false" {...props} />
    </button>
  );
};

export default ControllerPage;
