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
        <p>
          <span className="prod-price">
            {props.price} <img src={require("../images/coin.png")} alt="" />
          </span>
        </p>
        <input type="submit" value="Buy" />
      </div>
    </div>
  );
};

export default Product;
