import React from "react";
import { Navbar, Nav, Container, NavDropdown, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../assests/chaticon.png";
import {useSelector} from "react-redux"
import {useLogoutUserMutation} from "../services/appApi"

export const Navigation = () => {
  const user = useSelector((state)=> state.user);
  const [logoutUser] = useLogoutUserMutation();
  async function handleLogout(e){
    e.preventDefault();
    await logoutUser(user);
    //logout location
    window.location.replace("/");

  }
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img src={logo} style={{ width: 50, height: 50 }} alt="logo" />
            <p style={{ fontSize: 12, color: "blue" }}>Chat Room</p>
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
{!user && (
<LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
            )}

            
            <LinkContainer to="/chat">
              <Nav.Link>Chat</Nav.Link>
            </LinkContainer>
{user && (
            <NavDropdown title={
              <>
              <img src={user.picture} style={{width: 30, height: 30, marginRight : 10, objectFit:"cover", borderRadius: "50%"}} alt=""/>
              {user.name}
              </>
            } id="basic-nav-dropdown">
             
              <NavDropdown.Item>
                <Button  variant="danger" onClick={handleLogout}>Logout</Button>
              </NavDropdown.Item>
            </NavDropdown>
            )
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
