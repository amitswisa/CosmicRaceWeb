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
import DataBlock from "../components/DataBlock";
import Table from "react-bootstrap/Table";
import RadarChart from "../components/RadarChart";
import AppContainer from "../components/AppContainer";
import { update } from "../features/userSlice";
import Slider from "react-slick";

const DashboardPage = () => {
  const dispatch = useDispatch();
  let userCoins = useSelector((state) => state.user.userData.coins);
  const navigate = useNavigate();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    cssEase: "linear",
  };
  const radarChartLabels = [
    "Magic Points",
    "Speed",
    "Power",
    "Defence",
    "Accuracy",
  ];
  const chartData = [
    {
      labels: radarChartLabels,
      characterImage: require("../images/character.png"),
      datasets: [
        {
          label: "Character 1",
          fill: true,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgb(255, 99, 132)",
          data: [20, 56, 89, 51, 100],
        },
      ],
    },
    {
      labels: radarChartLabels,
      characterImage: require("../images/character2.png"),
      datasets: [
        {
          label: "Character 2",
          fill: true,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgb(255, 99, 132)",
          data: [70, 26, 99, 71, 100],
        },
      ],
    },
  ];

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
          <Col style={{ textAlign: "right", color: "#FFF" }}>1</Col>
          <Col xs={10}>
            <ProgressBar animated striped variant="warning" now={80} />
          </Col>
          <Col style={{ textAlign: "left", color: "#FFF" }}>2</Col>
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
        <InfoBlock>Win: 250</InfoBlock>
        <InfoBlock>Lose: 120</InfoBlock>
      </AppContainer>
      <AppContainer className="d-flex flex-column flex-lg-row">
        <DataBlock title="Game History">
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Character</th>
                <th>Map</th>
                <th>Status</th>
                <th>XP</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
            </tbody>
          </Table>
        </DataBlock>
        <DataBlock title="Characters">
          <Slider
            {...sliderSettings}
            beforeChange={handleCharacterChange}
            initialSlide={currentCharacterIndex}
            style={{ width: "470px", marginLeft: "12px" }}>
            {chartData.map((data, index) => (
              <div
                key={index}
                className="d-flex flex-row"
                style={{ marginTop: "20px" }}>
                <div className="characterImage">
                  <img src={data.characterImage} alt="" />
                </div>
                <div className="characterData">
                  <RadarChart data={data} />
                </div>
              </div>
            ))}
          </Slider>
        </DataBlock>
      </AppContainer>
      <footer className="text-white">
        Made by Amit Swisa, Ran Nisan & Dvir Magen
      </footer>
    </div>
  );
};

export default DashboardPage;
