import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../assets/logoNr.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import {
    useCurrentUser,
    useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { removeTokenTimestamp } from "../utils/utils";


const NavBarIcon = ({ iconClass, label, link }) => (
    <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to={link}
    >
        <i className={iconClass}></i>{label}
    </NavLink>
);


const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();
    const { expanded, setExpanded, ref } = useClickOutsideToggle();
    const [dropdownOpen, setDropdownOpen] = React.useState(false);

    const handleSignOut = async () => {
        try {
            await axios.post("dj-rest-auth/logout/");
            setCurrentUser(null);
            removeTokenTimestamp();
            // Clear token storage if tokens are stored in the browser
            localStorage.removeItem('token'); // or sessionStorage.removeItem('token');
        } catch (err) {
            console.error("Error during sign out:", err);
            // Implement a user-friendly error message here
            alert('Failed to sign out. Please try again.');
        }
    };
    

    return (
        <Navbar expanded={expanded}
            className={styles.NavBar}
            expand="md"
            fixed="top"
        >
            <Container>
                <NavLink to="/">
                    <Navbar.Brand>
                        <img src={logo} alt='logo' height="55" />
                    </Navbar.Brand>
                </NavLink>
                {currentUser && <NavBarIcon iconClass="far fa-plus-square" label="Add post" link="/posts/create" />}
                
                <div ref={ref}>
                    <Navbar.Toggle
                        onClick={() => setExpanded(!expanded)}
                        aria-controls="basic-navbar-nav"
                    />
                </div>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto" align="end">
                        <NavBarIcon iconClass="fa-solid fa-house-chimney" label="Home" link="/" />
                        <NavBarIcon iconClass="fas fa-images" label="Gallery" link="/gallery" />

                        {currentUser ? (
                            <NavDropdown 
                                title={<Avatar src={currentUser.profile_image} text="Profile" height={40} />}
                                id="user-dropdown"
                                show={dropdownOpen}
                                onToggle={(isOpen) => {
                                    setDropdownOpen(isOpen);
                                    if(isOpen) setExpanded(true);
                                }}
                                align="end" 
                            >
                                <NavDropdown.Item as={NavLink} to={`/profiles/${currentUser?.profile_id}`}><i className="fas fa-user"></i>Profile</NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to="/feed"><i className="fas fa-stream"></i>Feed</NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to="/liked"><i className="fas fa-heart"></i>Liked</NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to="/visiting"><i className="fa-solid fa-calendar-day"></i>Booking</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item align="end" as={NavLink} to="/" onClick={handleSignOut}><i className="fa-solid fa-door-closed"></i>Sign Out</NavDropdown.Item>
                                
                            </NavDropdown>
                        ) : (
                            <>
                                <NavBarIcon iconClass="fa-solid fa-door-closed" label="Sign In" link="/signin" />
                                <NavBarIcon iconClass="fa-solid fa-users-line" label="Sign Up" link="/signup" />
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
