import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JWTManager from "../classes/JWTManager";

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (JWTManager.isTokenValid()) JWTManager.deleteToken();
    navigate("/");
  }, [navigate]);

  return "";
};

export default LogoutPage;
