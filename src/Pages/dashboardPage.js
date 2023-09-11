import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import JWTManager from "../classes/JWTManager";
import NavbarComponent from "../components/NavbarComponent";
import { Container } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InfoBlock from "../components/InfoBlock";
import AppContainer from "../components/AppContainer";
import { update } from "../features/userSlice";

const DashboardPage = () => {
  const dispatch = useDispatch();
  let userCoins = useSelector((state) => state.user.userData.coins);
  let userWins = useSelector((state) => state.user.userData.wins);
  let userLoses = useSelector((state) => state.user.userData.loses);
  let userLevel = useSelector((state) => state.user.userData.level);
  let userXp = useSelector((state) => state.user.userData.xp);
  const navigate = useNavigate();

  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);

  // Switch character and character's stats.
  const handleCharacterChange = (index) => {
    setCurrentCharacterIndex(index);
  };

  // Fetch logged user data from server before rendering page.
  useLayoutEffect(() => {
    fetch(process.env.REACT_APP_SERVER_HOST + "/update-user-data", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${JWTManager.getToken()}`,
      },
      body: JSON.stringify({
        username: JWTManager.getUsername(),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) dispatch(update(data));
        else alert(data.message);
      })
      .catch((err) => alert(err));
  }, [dispatch]);

  // Check user login token with every render.
  useEffect(() => {
    if (!JWTManager.isTokenValid()) navigate("/");
  }, [navigate]);

  return (
    <div className="dashboardStyle">
      <NavbarComponent />
      <Container>
        <Row>
          <Col style={{ textAlign: "right", color: "#FFF" }}>{userLevel}</Col>
          <Col xs={10}>
            <ProgressBar animated striped variant="warning" now={userXp} />
          </Col>
          <Col style={{ textAlign: "left", color: "#FFF" }}>
            {userLevel + 1}
          </Col>
        </Row>
      </Container>
      <AppContainer className="userInfo d-flex flex-row">
        <InfoBlock>Hello, {JWTManager.getUsername()}</InfoBlock>
        <InfoBlock>
          {userCoins}{" "}
          <img
            src={require("../images/coin.png")}
            style={{
              paddingLeft: "5px",
              paddingRight: "5px",
              position: "relative",
              top: "-1px",
            }}
            width="28px"
            alt=""
          />
        </InfoBlock>
        <InfoBlock>Win: {userWins}</InfoBlock>
        <InfoBlock>Lose: {userLoses}</InfoBlock>
      </AppContainer>
      <footer className="text-white">
        Made by Amit Swisa, Ran Nisan & Dvir Magen
      </footer>
    </div>
  );
};

export default DashboardPage;
