const TextBlock = (props) => {
  return (
    <div className="textBlock">
      <h4>
        {props.title} {props.text}
      </h4>
    </div>
  );
};

export default TextBlock;
