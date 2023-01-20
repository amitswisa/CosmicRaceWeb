import Form from "react-bootstrap/Form";

const Input = (props) => {
  return (
    <Form.Group className="mb-2 MinstrelPosterWHG">
      <Form.Label>{props.label}</Form.Label>
      <Form.Control
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        style={props.style}
        onChange={props.onChange}
        required
      />
      {props.instructions ? (
        <label className="formInstructions">{props.instructions}</label>
      ) : (
        ""
      )}
    </Form.Group>
  );
};

export default Input;
