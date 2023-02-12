const DataBlock = (props) => {
  return (
    <div className={"dataBlock " + props.className}>
      <h3>{props.title}</h3>
      <p>{props.children}</p>
    </div>
  );
};

export default DataBlock;
