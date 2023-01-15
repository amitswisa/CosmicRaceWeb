import React from "react";
import ReactDOM from "react-dom/client";
import MainPage from "./Pages/mainPage";
import RegisterPage from "./Pages/registerPage";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./Pages/error_page";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.css";
import logo from "./images/logo.png";
import LoginPage from "./Pages/loginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage logo={logo} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Register",
    element: <RegisterPage logo={logo} />,
  },
  {
    path: "/Login",
    element: <LoginPage logo={logo} />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
