/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext, useRef, useMemo } from "react";
import WebSocketContext from "../contexts/WebSocketContext";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Headline from "../components/Headline";

const ACTION_TYPES = {
  CONFIRMATION: "CONFIRMATION",
  NOTIFICATION: "NOTIFICATION",
  ACTION: "ACTION",
  MESSAGE: "MESSAGE",
};

const ControllerPage = () => {
  const navigate = useNavigate();
  const wsContext = useContext(WebSocketContext);
  const ws = wsContext.webSocket;

  const savedUsername = useRef(localStorage.getItem("username"));
  const savedCharacter = useRef(localStorage.getItem("character"));

  const [isPortrait, setIsPortrait] = useState(
    window.innerHeight < window.innerWidth
  );
  const [gameStarted, setGameStarted] = useState(false);
  const [activeMovement, setActiveMovement] = useState(null);
  const [notificationQueue, setNotificationQueue] = useState([
    "Waiting for host to start the game...",
  ]);

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerHeight < window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!ws) {
      alert("You are not registered to any room..");
      navigate("/room");
      return;
    }

    const handleWebSocketMessage = (event) => {
      const messageData = JSON.parse(event.data);

      switch (messageData.ActionType) {
        case ACTION_TYPES.CONFIRMATION:
          ws.send("ALIVE");
          break;
        case ACTION_TYPES.NOTIFICATION:
          if (messageData.MessageContent === "Starting match..") {
            setGameStarted(true);
          }
          setNotificationQueue((prevQueue) => [
            ...prevQueue,
            messageData.MessageContent,
          ]);
          break;
        case ACTION_TYPES.ACTION:
          if (messageData.MessageContent === "START") {
            setNotificationQueue((prevQueue) => [...prevQueue, "Playing!"]);
          }
          break;
        case ACTION_TYPES.MESSAGE:
          if (messageData.MessageContent === "MATCH_TERMINATION") {
            alert("Game has ended. Returning to room page.");
            navigate("/room");
          }
          break;
        default:
          break;
      }
    };

    const handleWebSocketClose = () => {
      wsContext.setWebSocket(null);
      navigate("/");
    };

    ws.onmessage = handleWebSocketMessage;
    ws.onclose = handleWebSocketClose;

    return () => {
      ws.onmessage = null;
      ws.onclose = null;
    };
  }, [ws, navigate, wsContext]);

  const sendCommand = (action) => {
    const message = {
      m_MessageType: "COMMAND",
      m_Username: savedUsername.current,
      m_Action: action,
      m_Location: { x: 0.0, y: 0.0 },
    };
    ws.send(JSON.stringify(message));
  };

  const onButtonPressed = useMemo(
    () => (action) => (e) => {
      e.preventDefault();
      if (["RUN_LEFT", "RUN_RIGHT"].includes(action)) {
        if (activeMovement !== action) {
          sendCommand(action);
          setActiveMovement(action);
        }
      } else {
        sendCommand(action);
      }
    },
    [activeMovement]
  );

  const onButtonReleased = useMemo(
    () => (action) => (e) => {
      e.preventDefault();
      if (["RUN_LEFT", "RUN_RIGHT"].includes(action)) {
        sendCommand("IDLE");
        setActiveMovement(null);
      }
    },
    []
  );

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
