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
    const ws = new WebSocket("ws://localhost:8081");

    ws.onopen = () => {
      // On connection open, send a message to the server.

      // On connection open, send a message to the server.
      const message = {
        messagetype: "CONFIGURATION",
        username: username,
        roomid: roomNumber,
        characterid: Number(character), // convert character string to number
      };

      ws.send(JSON.stringify(message));
    };

    ws.onmessage = (event) => {
      // When the client receives a message
      if (event.data === "OK") {
        alert("Successfully joined room.");
        wsContext.setWebSocket(ws);
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
              placeholder="Username..."
            />
            <Form.Select
              aria-label="Character selection"
              onChange={(e) => setCharacter(e.target.value)}>
              <option>Choose character</option>
              <option value="1">Character 1</option>
              <option value="2">Character 2</option>
              <option value="3">Character 3</option>
              <option value="4">Character 4</option>
            </Form.Select>
            <Input
              name="roomNumber"
              type="text"
              onChange={(e) => setRoomNumber(e.target.value)}
              placeholder="#Room number..."
            />
            <Input name="roomNumber" type="submit" value="Join Room" />
          </Form>
        </div>
      </Container>
    </pageContainer>
  );
};

export default RoomPage;
