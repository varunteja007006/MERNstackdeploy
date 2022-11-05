import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import Alert from "react-bootstrap/Alert";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <Container>
      <Form className="p-3 mt-3" onSubmit={handleSubmit}>
        <div className="text-center">
          <h3>Login</h3>
        </div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        <div className="text-center">
          <Button variant="loginbtn" type="submit" disabled={isLoading}>
            Login
          </Button>{" "}
          {error && (
            <Alert
              variant="danger"
              className="mt-3 m-auto"
              style={{ width: "18rem" }}
            >
              <i className="fa-sharp fa-solid fa-triangle-exclamation"></i>{" "}
              {error}
            </Alert>
          )}{" "}
        </div>
      </Form>
    </Container>
  );
}

export default Login;
