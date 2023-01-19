import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import JWTManager from "../classes/JWTManager";
import NavbarComponent from "../components/NavbarComponent";
import TextBlock from "../components/TextBlock";
import CharacterContainer from "../components/CharacterContainer";
import characterImg from "../images/character.png";

const DashboardPage = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!JWTManager.isTokenValid()) navigate("/");
  }, [navigate]);

  return (
    <pageContainer>
      <NavbarComponent />
      <Container>
        <div className="d-flex flex-row">
          <CharacterContainer
            characterName="Bang Banger"
            characterImage={characterImg}
            description="Level: 15"
          />
          <CharacterContainer
            characterName="Bang Banger"
            characterImage={characterImg}
            description="Level: 15"
          />
          <CharacterContainer
            characterName="Bang Banger"
            characterImage={characterImg}
            description="Level: 15"
          />
          <CharacterContainer
            characterName="Bang Banger"
            characterImage={characterImg}
            description="Level: 15"
          />
        </div>
      </Container>
      <br />
      <Container>
        <div className="d-flex flex-row">
          <TextBlock title="Rank: " text="#195" />
          <TextBlock title="Coins: " text="1000" />
          <TextBlock title="Game History" text="" />
          <TextBlock title="Game History" text="" />
        </div>
      </Container>
    </pageContainer>
  );
};

export default DashboardPage;
