import { React, useState, useEffect } from "react";
import Input from "../components/Input";
import Form from "react-bootstrap/Form";
import Headline from "../components/Headline";
import NavbarComponent from "../components/NavbarComponent";
import { useNavigate } from "react-router-dom";
import JWTManager from "../classes/JWTManager";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [email, setEmail] = useState("");

  async function registerSubmit() {
    // Checking if both passwords are equal
    if (username.length < 5) {
      alert("Username length must be at least 5 characters.");
    } else if (password.length < 6) {
      alert("Password length must be at least 6 characters.");
    } else if (password !== repassword) {
      alert("Please make sure the passwords are equal.");
    } else {
      const response = await fetch(
        process.env.REACT_APP_SERVER_HOST + "/registration",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
            email: email,
          }),
        }
      ).catch((err) => alert(err));

      const data = await response.json();

      alert(data.message);
      if (data.success) navigate("/login");
    }
  }

  // Check if user already signed in.
  useEffect(() => {
    if (JWTManager.isTokenValid()) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <pageContainer>
        <NavbarComponent />
        <Headline title="Sign up" />
        <div className="d-flex flex-column">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              registerSubmit();
            }}>
            <Input
              label="Username:"
              name="username"
              value={username}
              type="text"
              instructions="* Username must be at least 5 characters."
              onChange={(e) => setUsername(e.target.value)}
              placeholder=""
            />
            <Input
              label="Password:"
              name="password"
              value={password}
              type="password"
              instructions="* Password must be at least 6 characters."
              onChange={(e) => setPassword(e.target.value)}
              placeholder=""
            />
            <Input
              label="Re-Password:"
              name="repassword"
              value={repassword}
              onChange={(e) => setRepassword(e.target.value)}
              type="password"
              placeholder=""
            />
            <Input
              label="Email:"
              name="email"
              value={email}
              type="email"
              placeholder=""
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input name="submit" type="submit" value="Register" />
          </Form>
        </div>
      </pageContainer>
    </>
  );
};

export default RegisterPage;
