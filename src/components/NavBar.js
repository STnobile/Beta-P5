import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap';
import logo from '../assets/logo.png'
import styles from '../styles/NavBar.module.css'
import { NavLink } from 'react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUserContext';

const NavBar = () => {
    const currentUser = useCurrentUser();

    const loggedInIcons = <> {currentUser?.username} </>;
    
    const loggedOutIcons = (
      <>
            <NavLink
                className = { styles.NavLink }
                activeClassName = { styles.Active }
                to = "/signin" >

                    <i className="fa-solid fa-door-closed"></i>Sign In
            </NavLink >
            <NavLink
                className={styles.NavLink}
                activeClassName={styles.Active}
                to="/signup"
                >
                <i className="fa-solid fa-users-line"></i>Sign Up
            </NavLink>
      </>
    );


    return (
        <Navbar className={styles.NavBar} expand="md" fixed="top">
            <Container>
                <NavLink to="/">
                    <Navbar.Brand href="#home">
                        <img src={logo} alt='logo' height="35" />
                    </Navbar.Brand>
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto text-right">

                        <NavLink
                            exact
                            className={styles.NavLink}
                            activeClassName={styles.Active}
                            to="/">

                            <i className="fa-solid fa-house-chimney"></i>Home
                            {currentUser ? loggedInIcons : loggedOutIcons }
                        </NavLink>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar