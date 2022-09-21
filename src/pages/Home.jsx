import "./Home.css"
import React from 'react'
import {Row, Col, Button} from "react-bootstrap"
import {LinkContainer} from "react-router-bootstrap"

export const Home = () => {
  return (
    <Row>
        <Col md={4} className="d-flex flex-direction-column align-items-center justify-content-center">
            <div>
                <h1>It's time to chat!!!</h1>
                <p>Connect with the world & don't miss a word!!!</p>
                <LinkContainer to="/chat">
                    <Button variant="primary">Get Started <i className="fas fa-comments home-message-icon"></i></Button>
                    
                </LinkContainer>
            </div>
        </Col>
        <Col md={8} className="home__bg" >
            
        </Col>
    </Row>
  )
}
