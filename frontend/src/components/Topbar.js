import React, { useRef, useState } from "react";
import "./Topbar.css";
import axios from "../axios";
import { logout, resetNotifications } from "../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Nav, Navbar, NavDropdown, Button } from "react-bootstrap";

const Topbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  

  
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Good Food</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {/* if no user */}
              {!user && (
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              )}
              {user && !user.isAdmin && (
                <LinkContainer to="/cart">
                  <Nav.Link>
                    <i className="fas fa-shopping-cart"></i>
                    {user?.cart.count > 0 && (
                      <span className="badge badge-warning" id="cartcount">
                        {user.cart.count}
                      </span>
                    )}
                  </Nav.Link>
                </LinkContainer>
              )}
              {/* if user  */}
              {user && (
                <>
                  <NavDropdown title={`${user.email}`} id="basic-nav-dropdown">
                    {user.isAdmin && (
                      <>
                        <LinkContainer to="/admin">
                          <NavDropdown.Item>Dashboard</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/new-product">
                          <NavDropdown.Item>Create Product</NavDropdown.Item>
                        </LinkContainer>
                      </>
                    )}
                    {!user.isAdmin && (
                      <>
                        <LinkContainer to="/cart">
                          <NavDropdown.Item>Cart</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/orders">
                          <NavDropdown.Item>My orders</NavDropdown.Item>
                        </LinkContainer>
                      </>
                    )}

                    <NavDropdown.Divider />
                    <Button
                      style={{ background: "#ff0000", border: "none" }}
                      onClick={handleLogout}
                      className="logout-btn"
                    >
                      Logout
                    </Button>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
       
         
      </Navbar>
    </>
  );
};

export default Topbar;
