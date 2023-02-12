import React, { useEffect } from "react";
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

const DashboardPage = (props) => {
  const navigate = useNavigate();

  const chartData = {
    labels: ["Magic Points", "Speed", "Power", "Defence", "Accuracy"],
    datasets: [
      {
        label: "Character Skills",
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
        data: [56, 81, 89, 100, 21],
      },
    ],
  };

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
        <InfoBlock text={"Hello, " + JWTManager.getUsername()} />
        <InfoBlock text="Coins: 1000" />
        <InfoBlock text="Win: 250" />
        <InfoBlock text="Lose: 120" />
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
            </tbody>
          </Table>
        </DataBlock>
        <DataBlock title="Characters">
          <Container className="d-flex flex-row" style={{ marginTop: "20px" }}>
            <div className="characterImage">
              <img src={require("../images/character.png")} alt="" />
            </div>
            <div className="characterData">
              <RadarChart data={chartData} />
            </div>
          </Container>
        </DataBlock>
      </AppContainer>
      <footer className="text-white">
        Made by Amit Swisa, Ran Nisan & Dvir Magen
      </footer>
    </div>
  );
};

export default DashboardPage;
