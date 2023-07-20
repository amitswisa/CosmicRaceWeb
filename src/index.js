import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import WebSocketContext from "./contexts/WebSocketContext";
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
import StorePage from "./pages/storePage";
import ChangePasswordPage from "./pages/changePasswordPage";

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
  {
    path: "/store",
    element: <StorePage />,
  },
  {
    path: "/change-password",
    element: <ChangePasswordPage />,
  },
]);

const App = () => {
  const [webSocket, setWebSocket] = useState(null);

  return (
    <React.StrictMode>
      <Provider store={store}>
        <WebSocketContext.Provider value={{ webSocket, setWebSocket }}>
          <RouterProvider router={router} />
        </WebSocketContext.Provider>
      </Provider>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />); // change this line to render the App component

reportWebVitals();
