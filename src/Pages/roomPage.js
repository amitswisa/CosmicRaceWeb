import { useState } from "react";
import NavbarComponent from "../components/NavbarComponent";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Input from "../components/Input";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { play } from "../features/userSlice";

const RoomPage = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.user.playSettings.roomNumber);
  const navigate = useNavigate();
  const [roomNumber, setRoomNumber] = useState("");

  function searchRoom() {
    // TODO - VALIDATE ROOM NUMBER AGAINST UNITY GAME SERVER.
    dispatch(play(roomNumber));
    alert(state);
    navigate("/play");
  }

  return (
    <pageContainer>
      <NavbarComponent />
      <Container>
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
              searchRoom();
            }}>
            <Input
              name="roomNumber"
              type="text"
              onChange={(e) => setRoomNumber(e.target.value)}
              placeholder="#Room number..."
            />
            <Input name="roomNumber" type="submit" value="Search" />
          </Form>
        </div>
      </Container>
    </pageContainer>
  );
};

export default RoomPage;
