import React, { useState, useEffect, Component } from "react";
import { Link, useHistory } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";
import { AppContext } from "./libs/contextLib";
import { Auth } from "aws-amplify";
import { onError } from "./libs/errorLib";


function App() {
  const history = useHistory();
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();

    userHasAuthenticated(false);

    history.push("/signin");
  }

  return (
    !isAuthenticating &&
    <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">ICE</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {isAuthenticated
              ? <>
                  <LinkContainer to="/organizations">
                    <NavItem>Organizations</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/teams">
                    <NavItem>Teams</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/meeting-areas">
                    <NavItem>Meeting Areas</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/incidents">
                    <NavItem>Incidents</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/emergency-contacts">
                    <NavItem>Emergency Contacts</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/crew">
                    <NavItem>Crew</NavItem>
                  </LinkContainer>                
                  <NavItem onClick={handleLogout}>Logout</NavItem></>
              : <>
                  <LinkContainer to="/signup">
                    <NavItem>Signup</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/Signin">
                    <NavItem>Signin</NavItem>
                  </LinkContainer>
                </>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <AppContext.Provider
        value={{ isAuthenticated, userHasAuthenticated }}
      >
        <Routes />
      </AppContext.Provider>
    </div>
  );
}
export default App;