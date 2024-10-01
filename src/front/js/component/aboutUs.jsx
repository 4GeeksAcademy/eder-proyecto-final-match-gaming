import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import "../../styles/about.css"
import "../../styles/home.css"
import { JoinUs } from "./joinus.jsx";
export const AboutUs = () => {
  return (
    <Container className="mt-5 bg-black text-white">
      <Row className="text-center mb-4 ">
        <Col  style={{ margin: '150px 0 100px 0' }}>
          <h1 className="fw-bold ">About Match Gaming</h1>
          <p className="text-white gaming-neon">Discover the platform that unites passionate gamers</p>
        </Col>
      </Row>
      {/* Introduction Section */}
      <Row className="mb-5">
        <Col md={6}>
          <h2 className="fw-bold">Welcome!</h2>
          <p>
            Match Gaming is the ultimate platform designed to unite gamers who share the same passion for video games. Our mission is to create a personalized experience where users can discover and connect with other players who have similar gaming interests, preferences, and styles.
          </p>
        </Col>
        <Col md={6}>
            {/* <Card className="custom-card">
                <Card.Img 
                variant="top" 
                src="https://images.blacknut.com/website/biz/1684749878006_wired-productions.jpg" 
                alt="Gamers playing" 
                />
            </Card> */}
                             {/* column for the image */}
                             <Col xs={12}>
            <img 
            src="https://cdni.iconscout.com/illustration/premium/thumb/boy-win-annual-gaming-tournament-trophies-and-prize-money-illustration-download-in-svg-png-gif-file-formats--playstation-logo-trophy-computer-games-pack-video-illustrations-4206803.png?f=webp" 
            alt="Gaming Connections"
            className="img-fluid mx-auto d-block" 
            style={{ maxWidth: "100%", height: "auto", marginTop: "20px" }}
            />
        </Col>
        </Col>
      </Row>
      {/* Mission Section */}
      <Row className="mb-5 bg-container text-white p-4 rounded custom-row text-center">
        <Col>
          <h2 className="fw-bold">Our Mission</h2>
          <p>
            We believe that gaming is more than just playing—it’s about building meaningful connections. Our mission at Match Gaming is to provide a space where gamers can explore, connect, and engage with a community of like-minded individuals. Whether you’re looking for friends, teammates, or a gaming crew, we’re here to help you find your perfect match.
          </p>
        </Col>

      </Row>
      {/* Features Section */}
      <Row className="mb-5">
        <Col>
          <h2 className="fw-bold">Features & Benefits</h2>
          <ul>
            <li>Personalized Profiles: Showcase your gaming preferences and playstyle.</li>
            <li>Find Gamers Like You: Discover shared interests and connect with others.</li>
            <li>Create and Join Gaming Sessions: Play together with your community.</li>
            <li>Real Connections: Build lasting friendships and teams.</li>
          </ul>
        </Col>
      </Row>
      {/* How It Works Section */}
      <Row className="mb-5 bg-container text-white p-4 rounded">
        <Col>
          <h2 className="fw-bold">How It Works</h2>
          <ol>
            <li>Register and Create a Profile: List your favorite games and preferences.</li>
            <li>Explore the Community: Browse profiles and invite players to game together.</li>
            <li>Start Gaming: Schedule or join game sessions that match your style.</li>
          </ol>
        </Col>
    
      </Row>
      {/* Why Match Gaming Section */}
      <Row className="mb-5 ">
        <Col>
          <h2 className="fw-bold">Why Match Gaming?</h2>
          <p>
            We aim to build a community that goes beyond casual gaming. At Match Gaming, we prioritize genuine connections by helping you meet people who truly match your gaming preferences and personality. Join us to turn your gaming experience into something extraordinary.
          </p>
        </Col>
        {/* column for the image */}
        <Col xs={12}>
            <img 
            src="https://cdni.iconscout.com/illustration/premium/thumb/esports-competition-trophies-illustration-download-in-svg-png-gif-file-formats--playstation-logo-trophy-winner-team-tournament-gaming-pack-video-games-illustrations-4206790.png?f=webp" 
            alt="Gaming Connections"
            className="img-fluid mx-auto d-block" 
            style={{ maxWidth: "100%", height: "auto", marginTop: "20px" }}
            />
        </Col>
      </Row>
      <Row>
      <JoinUs />
      </Row>
    </Container>
  );
};
