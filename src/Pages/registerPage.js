import { React, useState } from "react";
import Input from "../Components/Input";
import Form from "react-bootstrap/Form";
import Headline from "../Components/Headline";
import NavbarComponent from "../Components/NavbarComponent";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [email, setEmail] = useState("");

  function registerSubmit() {
    // Checking if both passwords are equal
    if (username.length < 5) {
      alert("Username length must be at least 5 characters.");
    } else if (password.length < 6) {
      alert("Password length must be at least 5 characters.");
    } else if (password !== repassword) {
      alert("Please make sure the passwords are equal.");
    } else {
      alert("Work!");
    }
  }

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
