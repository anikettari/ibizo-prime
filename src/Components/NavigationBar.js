import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/home" style={{ marginLeft: "3.5rem" }}>
        Ibizo Prime
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav className="ms-auto d-flex">
          <Nav.Link
            as={Link}
            to="/profile"
            className="ms-auto"
            style={{ marginRight: "3.2rem" }}
          >
            <Button variant="outline-light" size="sm">
              Profile
            </Button>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
