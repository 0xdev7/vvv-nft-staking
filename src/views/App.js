import React, { useState } from "react";
import StakingPad from "../components/StakingPad/StakingPad";
import StakingInfo from "../components/StakingInfo/StakingInfo";
import { Col, Image, Navbar, Nav, Container, Button } from "react-bootstrap";
import "./App.css";

function App() {
  const [selectedAddress, setHeaderAddress] = useState("");

  return (
    <Container>
      <Col className="logo">
        <Image src="logo.png" />
      </Col>
      <Navbar expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Navbar.Brand href="#home">
            <Image className="me-2" src="images/discord.png" />
            <Image src="images/twitter.png" />
          </Navbar.Brand>
          <Nav className="w-100 justify-content-center">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">Dashboard</Nav.Link>
            <Nav.Link href="#">Shark Test</Nav.Link>
            <Nav.Link href="#">Referral Program</Nav.Link>
            <Nav.Link href="#">Staking</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {!selectedAddress ? (
          <Button className="btn-disconnect invisible">Disconnect1</Button>
        ) : (
          <Button className="btn-disconnect">
            {selectedAddress.substr(0, 5) + "..." + selectedAddress.substr(-4)}
          </Button>
        )}
      </Navbar>
      <StakingPad setHeaderAddress={setHeaderAddress}></StakingPad>
      <StakingInfo></StakingInfo>
    </Container>
  );
}

export default App;
