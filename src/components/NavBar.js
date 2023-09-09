import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap';
import logo from '../assets/logo.png'
import styles from '../styles/NavBar.module.css'
import { NavLink } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser} from '../contexts/CurrentUserContext';
import Avatar from './Avatar';
import axios from 'axios';



const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const handleSignOut = async () => {
        try {
            await axios.post("dj-rest-auth/logout/");
            setCurrentUser(null);
        } catch (err) {
            console.log(err)
        }
    };

    const addPostIcon = (
          <NavLink
                className = { styles.NavLink }
                activeClassName = { styles.Active }
                to = "/posts/create" 
                >

                <i className="far fa-plus-square"></i>Add post
            </NavLink >
    );

    const loggedInIcons = ( <>
        <NavLink
                className = { styles.NavLink }
                activeClassName = { styles.Active }
                to = "/feed" 
                >

                 <i className="fas fa-stream"></i>Feed
            </NavLink>
            <NavLink
                className = { styles.NavLink }
                activeClassName = { styles.Active }
                to = "/liked" >

                    <i className="fas fa-heart"></i>Liked
            </NavLink>
            <NavLink
                className = { styles.NavLink }
                to = "/"
                onClick= {handleSignOut} 
                >

                 <i className="fa-solid fa-door-closed"></i>Sign Out
            </NavLink>
            <NavLink
                className = { styles.NavLink }
                to = {`/profiles/${currentUser?.profile_id}`}
                >

                 <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
            </NavLink>


    </>
    );
    
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
                {currentUser && addPostIcon}
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