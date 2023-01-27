import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import logo from "./images/logo.png";
import LoginPage from "./pages/loginPage";
import MainPage from "./pages/mainPage";
import RegisterPage from "./pages/registerPage";
import LogoutPage from "./pages/logoutPage";
import RoomPage from "./pages/roomPage";
import ErrorPage from "./pages/error_page";
import ControllerPage from "./pages/controllerPage";
import DashboardPage from "./pages/dashboardPage";

import { Provider } from "react-redux";

// Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.css";
import { store } from "./app/store";

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
  {
    path: "/Logout",
    element: <LogoutPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage logo={logo} />,
  },
  {
    path: "/room",
    element: <RoomPage logo={logo} />,
  },
  {
    path: "/play",
    element: <ControllerPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
