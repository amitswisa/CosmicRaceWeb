import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JWTManager from "../classes/JWTManager";
import NavbarComponent from "../components/NavbarComponent";
import AppContainer from "../components/AppContainer";
import Product from "../components/Product";

const StorePage = (props) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([
    {
      title: "Hero Helmet",
      imageSource: "character.png",
      imageAlt: "",
      imageWidth: "100",
      text: "Test Test Test Test",
      price: "1000",
    },
    {
      title: "Hero Helmet",
      imageSource: "character.png",
      imageAlt: "",
      imageWidth: "100",
      text: "Test Test Test Test",
      price: "1000",
    },
    {
      title: "Hero Helmet",
      imageSource: "character.png",
      imageAlt: "",
      imageWidth: "100",
      text: "Test Test Test Test",
      price: "1000",
    },
    {
      title: "Hero Helmet",
      imageSource: "character.png",
      imageAlt: "",
      imageWidth: "100",
      text: "Test Test Test Test",
      price: "1000",
    },
    {
      title: "Hero Helmet",
      imageSource: "character.png",
      imageAlt: "",
      imageWidth: "100",
      text: "Test Test Test Test",
      price: "1000",
    },
    {
      title: "Hero Helmet",
      imageSource: "character.png",
      imageAlt: "",
      imageWidth: "100",
      text: "Test Test Test Test",
      price: "1000",
    },
  ]);

  useEffect(() => {
    if (!JWTManager.isTokenValid()) navigate("/");
  }, [navigate]);

  return (
    <div className="dashboardStyle">
      <NavbarComponent />
      <AppContainer style={{ textAlign: "center" }} className="text-white">
        <h2>Store</h2>
        <div className="store-page">
          <div className="store-page-container">
            {products.map((item) => (
              <Product
                title={item.title}
                imageSource={item.imageSource}
                imageAlt={item.imageAlt}
                imageWidth={item.imageWidth}
                text={item.text}
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
