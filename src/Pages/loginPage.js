import { React, useState, useEffect } from "react";
import Input from "../components/Input";
import Form from "react-bootstrap/Form";
import Headline from "../components/Headline";
import NavbarComponent from "../components/NavbarComponent";
import JWTManager from "../classes/JWTManager";
import { useNavigate } from "react-router-dom";

// Fixed
const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Async login request on submitting the form.
  async function loginSubmit() {
    const response = await fetch(process.env.REACT_APP_SERVER_HOST + "/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    }).catch((err) => alert(err));

    const data = await response.json();

    alert(data.message);
    if (data.success) {
      JWTManager.storeToken(data.token);
      navigate("/dashboard");
    }
  }

  // Each render repeat this.
  useEffect(() => {
    if (JWTManager.isTokenValid()) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <pageContainer>
        <NavbarComponent />
        <Headline title="Sign in" style={{ marginTop: "1em" }} />
        <div className="d-flex flex-column">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              loginSubmit();
            }}>
            <Input
              label="Username:"
              name="username"
              value={username}
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              placeholder=""
            />
            <Input
              label="Password:"
              name="password"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder=""
            />
            <Input name="submit" type="submit" value="Login" />
          </Form>
        </div>
      </pageContainer>
    </>
  );
};

export default LoginPage;
