const CharacterContainer = (props) => {
  return (
    <div class="characterBlock">
      <h5>
        <b>{props.characterName}</b>
      </h5>
      <span>{props.description}</span>
      <br />
      <img src={props.characterImage} width="70px" alt="" />
    </div>
  );
};

export default CharacterContainer;
