import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  FormGroup,
  Button,
  Form,
  Alert,
} from "react-bootstrap";
import "./Signup.css";
import { useSignupMutation } from "../services/appApi";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signup, { error, isLoading, isError }] = useSignupMutation();
  const handleSignup = (e) => {
    e.preventDefault();
    signup({ name, email, password });
  };
  return (
    <Container>
      <Row>
        <Col md={6} className="signup_form--container">
          <Form style={{ width: "100%" }} onSubmit={handleSignup}>
            <h1 style={{ fontWeight: "300", textAlign: "center" }}>
              Create an account
            </h1>
            {isError && <Alert variant="danger">{error.data}</Alert>}
            <FormGroup>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </FormGroup>
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
            <FormGroup className="mb-3">
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
                  background: "#d90429",
                  border: "none",
                  marginTop: "10px",
                }}
              >
                Signup
              </Button>
            </FormGroup>
            <p className="pt-3 text-center">
              Already an account? <Link to="/login">Login</Link>
            </p>
          </Form>
        </Col>
        <Col md={6} className="signup__image--container"></Col>
      </Row>
    </Container>
  );
};

export default Signup;
