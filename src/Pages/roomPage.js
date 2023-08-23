import { useState, useContext } from "react";
import WebSocketContext from "../contexts/WebSocketContext";
import NavbarComponent from "../components/NavbarComponent";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Input from "../components/Input";
import Form from "react-bootstrap/Form";

const RoomPage = () => {
  const navigate = useNavigate();
  const [roomNumber, setRoomNumber] = useState("");
  const [username, setUsername] = useState("");
  const [character, setCharacter] = useState("");
  const wsContext = useContext(WebSocketContext);

  function joinRoom() {
    const ws = new WebSocket("ws://102.37.156.78:8081");

    ws.onopen = () => {
      // On connection open, send a message to the server.
      const message = {
        messagetype: "CONFIGURATION",
        username: username,
        roomid: roomNumber,
        characterid: Number(character), // convert character string to number
      };

      ws.send(JSON.stringify(message));
    };

    // New
    ws.onmessage = (event) => {
      // When the client receives a message
      if (event.data === "OK") {
        wsContext.setWebSocket(ws);
        localStorage.setItem("username", username);
        localStorage.setItem("character", Number(character));
        navigate("/play");
      }
    };

    ws.onerror = (error) => {
      console.error(`WebSocket error: ${error}`);
    };

    ws.onclose = () => {
      wsContext.setWebSocket(null);
      alert("Connection to server closed.");
      navigate("/room");
    };
  }

  return (
    <pageContainer>
      <NavbarComponent />
      <Container style={{ marginTop: "60px" }}>
        <div style={{ textAlign: "center" }}>
          <h2 className="headLine FM_Title">Friend Mode</h2>
          <span className="fmlabel">
            <b>*Notice: enter room number as provided in game.</b>
          </span>
        </div>
      </Container>
      <br />
      <Container>
        <div className="d-flex flex-column rp_Form">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              joinRoom();
            }}>
            <Input
              name="username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nickname"
              className="input-room-page"
            />
            <Form.Select
              className="select-input-room-page"
              aria-label="Character selection"
              onChange={(e) => setCharacter(e.target.value)}>
              <option className="first-option">Choose character</option>
              <option value="1">Mask Dude</option>
              <option value="2">Ninja Frog</option>
              <option value="3">Pink Man</option>
              <option value="4">Virtual Guy</option>
            </Form.Select>
            <Input
              className="input-room-page"
              name="roomNumber"
              type="text"
              onChange={(e) => setRoomNumber(e.target.value)}
              placeholder="#Room number"
            />
            <Input name="roomNumber" type="submit" value="Join Room" />
          </Form>
        </div>
      </Container>
    </pageContainer>
  );
};

export default RoomPage;
