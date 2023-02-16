import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JWTManager from "../classes/JWTManager";
import NavbarComponent from "../components/NavbarComponent";
import AppContainer from "../components/AppContainer";
import Product from "../components/Product";

const StorePage = (props) => {
  const navigate = useNavigate();
  const [products] = useState([
    {
      title: "Hero Helmet",
      imageSource: "character.png",
      imageAlt: "",
      imageWidth: "100",
      price: "1000",
    },
    {
      title: "Hero Helmet",
      imageSource: "character.png",
      imageAlt: "",
      imageWidth: "100",
      price: "1000",
    },
    {
      title: "Hero Helmet",
      imageSource: "character.png",
      imageAlt: "",
      imageWidth: "100",
      price: "1000",
    },
    {
      title: "Hero Helmet",
      imageSource: "character.png",
      imageAlt: "",
      imageWidth: "100",
      price: "1000",
    },
    {
      title: "Hero Helmet",
      imageSource: "character.png",
      imageAlt: "",
      imageWidth: "100",
      price: "1000",
    },
    {
      title: "Hero Helmet",
      imageSource: "character.png",
      imageAlt: "",
      imageWidth: "100",
      price: "1000",
    },
  ]);

  useEffect(() => {
    if (!JWTManager.isTokenValid()) navigate("/");
  }, [navigate]);

  return (
    <div className="dashboardStyle">
      <NavbarComponent />
      <AppContainer className="text-white">
        <div className="text-center">
          <h2>Store</h2>
          <div className="store-page-categories">
            <div>
              <img src={require("../images/hat_icon.png")} alt="" />
            </div>
            <div>
              <img src={require("../images/shirt_icon.png")} alt="" />
            </div>
            <div>
              <img src={require("../images/pants_icon.png")} alt="" />
            </div>
            <div>
              <img src={require("../images/shoe_icon.png")} alt="" />
            </div>
            <div>
              <img src={require("../images/accessories_icon.png")} alt="" />
            </div>
          </div>
        </div>
      </AppContainer>
      <AppContainer style={{ textAlign: "center" }} className="text-white">
        <div className="store-page">
          <div className="store-page-container">
            {products.map((item) => (
              <Product
                title={item.title}
                imageSource={item.imageSource}
                imageAlt={item.imageAlt}
                imageWidth={item.imageWidth}
                price={item.price}
              />
            ))}
          </div>
        </div>
      </AppContainer>
    </div>
  );
};

export default StorePage;
