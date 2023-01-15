import { React, useState } from "react";
import Input from "../Components/Input";
import Form from "react-bootstrap/Form";
import Headline from "../Components/Headline";
import NavbarComponent from "../Components/NavbarComponent";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function loginSubmit() {
    console.log("TEST");
  }

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