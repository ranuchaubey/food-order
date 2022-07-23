import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";
import { useLoginMutation } from "../services/appApi";
import {
  Container,
  Row,
  Col,
  FormGroup,
  Button,
  Form,
  Alert,
} from "react-bootstrap";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isError, isLoading, error }] = useLoginMutation();
  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password });
  };
  return (
    <Container>
      <Row>
        <Col md={6} className="login_form--container">
          <Form style={{ width: "100%" }} onSubmit={handleLogin}>
            <h1 style={{ fontWeight: "300", textAlign: "center" }}>
              Login to your account
            </h1>
            {isError && <Alert variant="danger">{error.data}</Alert>}
            <FormGroup>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Button
                type="submit"
                disabled={isLoading}
                style={{
                  background: "#29bf12",
                  border: "none",
                  marginTop: "10px",
                }}
              >
                Login
              </Button>
            </FormGroup>
            <p className="pt-3 text-center">
              Don't have a account ? <Link to="/signup">Create account</Link>
            </p>
          </Form>
        </Col>
        <Col md={6} className="login__image--container"></Col>
      </Row>
    </Container>
  );
};

export default Login;
