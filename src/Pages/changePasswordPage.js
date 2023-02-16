import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JWTManager from "../classes/JWTManager";
import NavbarComponent from "../components/NavbarComponent";
import AppContainer from "../components/AppContainer";
import Input from "../components/Input";
import Form from "react-bootstrap/Form";

const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");

  // Handle change password request.
  async function submit() {
    // Handle short password lemgth.
    if (newPassword.length < 6) {
      alert("Password length must be at least 6 characters.");
      return;
    }

    // Request to change password.
    const request = await fetch(
      process.env.REACT_APP_SERVER_HOST + "/change-password",
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${JWTManager.getToken()}`,
        },
        body: JSON.stringify({
          password: newPassword,
        }),
      }
    );

    // Retreive data.
    const responseJson = await request.json();
    alert(responseJson.message);

    // Change password succeed
    if (responseJson.success) {
      navigate("/logout");
    }
  }

  useEffect(() => {
    if (!JWTManager.isTokenValid()) navigate("/");
  }, [navigate]);

  return (
    <div className="dashboardStyle">
      <NavbarComponent />
      <AppContainer style={{ width: "33%" }} className="text-white">
        <h2 className="text-center">Change Password</h2>
        <Form
          style={{ marginTop: "40px" }}
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}>
          <Input
            label="New Password:"
            name="new_p"
            value={newPassword}
            type="password"
            instructions="* Password must be at least 6 characters."
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder=""
          />
          <Input name="submit" type="submit" value="Change Password" />
        </Form>
      </AppContainer>
    </div>
  );
};

export default ChangePasswordPage;
