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

  const [isLandscape, setIsLandscape] = useState(
    window.innerWidth > window.innerHeight
  );
  const [gameStarted, setGameStarted] = useState(true);
  const [activeMovement, setActiveMovement] = useState(null);
  const [isEliminate, setIsEliminate] = useState(false);
  const [notificationQueue, setNotificationQueue] = useState([
    "Waiting for host to start the game...",
  ]);

  useEffect(() => {
    const handleResize = () => {
      const newOrientation = window.innerWidth > window.innerHeight;
      if (newOrientation !== isLandscape) setIsLandscape(newOrientation);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial setup

    // WebSocket listeners
    if (!ws) {
      alert("You are not registered to any room..");
      navigate("/room");
      return;
    }

    const handleWebSocketMessage = (event) => {
      const messageData = JSON.parse(event.data);
      switch (messageData.ActionType) {
        case "CONFIRMATION":
          ws.send("ALIVE");
          console.log("Passed server alive check.");
          break;
        case "NOTIFICATION":
          if (messageData.MessageContent === "Starting match..") {
            setGameStarted(true);
          }
          setNotificationQueue((prev) => [...prev, messageData.MessageContent]);
          break;
        case "ACTION":
          if (messageData.MessageContent === "START") {
            setNotificationQueue((prev) => [...prev, "Playing!"]);
          }
          break;
        case "MESSAGE":
          if (messageData.MessageContent === "MATCH_TERMINATION") {
            alert("Game has ended. Returning to room page.");
            navigate("/room");
          }
          break;
        case "ELIMINATION":
          setIsEliminate(true);
          break;
        default:
          break;
      }
    };

    const handleWebSocketClose = () => {
      wsContext.setWebSocket(null);
      navigate("/");
    };

    ws.addEventListener("message", handleWebSocketMessage);
    ws.addEventListener("close", handleWebSocketClose);

    return () => {
      window.removeEventListener("resize", handleResize);
      ws.removeEventListener("message", handleWebSocketMessage);
      ws.removeEventListener("close", handleWebSocketClose);
    };
  }, [ws, isLandscape, navigate, wsContext]);

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
        sendCommand(action);
        setActiveMovement(action);
      }
    } else {
      sendCommand(action);
    }
  };

  const onButtonReleased = (action) => (e) => {
    e.preventDefault();
    if (action === "RUN_LEFT" || action === "RUN_RIGHT") {
      sendCommand("IDLE");
      setActiveMovement(null);
    }
  };

  return (
    <Container>
      {isEliminate ? (
        <Container className="eliminationContainer">
          <h1>You are eliminated!</h1>
        </Container>
      ) : isLandscape ? (
        renderGameControls()
      ) : (
        renderLandscapeReminder()
      )}
    </Container>
  );

  //asd
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
            <Container className="d-flex flex-row characterView"></Container>
            <Container className="d-flex flex-row controllerActionKeys">
              <ControlButton
                onTouchStart={onButtonPressed("ATTACK")} // <-- Assuming you want an attack action
                onTouchEnd={onButtonReleased("ATTACK")}
                src="lightningAttack.png"
                imgStyle={{ width: "32px" }}
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
        <h1>Please switch to Landscape Mode for optimal viewing.</h1>
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
  imgStyle,
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
      <img src={src} alt={alt} draggable="false" style={imgStyle} {...props} />
    </button>
  );
};

export default ControllerPage;
