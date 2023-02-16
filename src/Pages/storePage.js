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
      <AppContainer style={{ textAlign: "center" }} className="text-white">
        <h2>Store</h2>
        <div className="store-page">
          <div className="store-page-categories">
            <ul>
              <li>
                <h3>Categories</h3>
              </li>
              <li>
                <span>Hats</span>
              </li>
              <li>
                <span>Shirts</span>
              </li>
              <li>
                <span>Pants</span>
              </li>
              <li>
                <span>Shoes</span>
              </li>
              <li>
                <span>Accessories</span>
              </li>
            </ul>
          </div>
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
