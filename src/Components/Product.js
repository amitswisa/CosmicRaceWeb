import Input from "./Input";

const Product = (props) => {
  return (
    <div className="product-card">
      <div className="product-picture">
        <img
          src={require("../images/" + props.imageSource)}
          width={props.imageWidth}
          alt={props.imageAlt}
        />
      </div>
      <div className="product-desc">
        <h4>{props.title}</h4>
        <p>{props.text}</p>
        <p>
          <span className="prod-price-label">Price:</span>
          <span className="prod-price"> {props.price}</span>
        </p>
        <Input type="submit" value="Buy" />
      </div>
    </div>
  );
};

export default Product;
