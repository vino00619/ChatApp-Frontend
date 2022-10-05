import "./Home.css"
import React from 'react'
import {Row, Col, Button} from "react-bootstrap"
import {LinkContainer} from "react-router-bootstrap"
import banner from "../assests/banner.jpg";

export const Home = () => {
  return (
    <Row>
        <Col md={4} className="d-flex flex-direction-column align-items-center justify-content-center">
            <div>
                <h1>Let's Chat!</h1>
                <p>Connect with the world</p>
                <LinkContainer to="/chat">
                    <Button variant="primary">Connect<i className="fas fa-comments home-message-icon"></i></Button>
                    
                </LinkContainer>
            </div>
        </Col>
        <Col md={6} className="home__bg" >
        <img src={banner} style={{height: "25rem", width: "39rem"}} alt="banner" />
        </Col>
    </Row>
  )
}
