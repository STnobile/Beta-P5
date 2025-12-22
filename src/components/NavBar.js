import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../assets/logoNr.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import { axiosReq } from "../api/axiosDefaults";
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

  const loggedOutIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin/"
      >
        <i className="fas fa-sign-in-alt"></i>Sign in
      </NavLink>
      <NavLink
        to="/signup/"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className="fas fa-user-plus"></i>Sign up
      </NavLink>
    </>
  );

  const handleSignOut = async () => {
    try {
      await axiosReq.get("dj-rest-auth/csrf/");
      await axiosReq.post("dj-rest-auth/logout/");
      setCurrentUser();
      removeTokenTimestamp();
      localStorage.removeItem('token');
    } catch (err) {
      alert('Failed to sign out. Please try again.');
    }
  };

  let loggedInIcons;
  if (currentUser) {
    loggedInIcons = (
      <NavDropdown
        title={<Avatar src={currentUser.profile_image} text="Profile" height={40} />}
        id="user-dropdown"
        show={dropdownOpen}
        onToggle={(isOpen) => {
          setDropdownOpen(isOpen);
          if (isOpen) setExpanded(true);
        }}
        alignRight
      >
        <NavDropdown.Item as={NavLink} to={`/profiles/${currentUser.profile_id}`} activeClassName="active"><i className="fas fa-user"></i>Profile</NavDropdown.Item>
        <NavDropdown.Item as={NavLink} to="/feed"><i className="fas fa-stream"></i>Feed</NavDropdown.Item>
        <NavDropdown.Item as={NavLink} to="/liked"><i className="fas fa-heart"></i>Liked</NavDropdown.Item>
        <NavDropdown.Item as={NavLink} to="/visiting"><i className="fa-solid fa-calendar-day"></i>Booking</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item as={NavLink} to="/" onClick={handleSignOut} activeClassName="active-link"><i className="fa-solid fa-door-closed"></i>Sign Out</NavDropdown.Item>
     </NavDropdown>
      
    );
  }

  return (
    <Navbar expanded={expanded} className={styles.NavBar} expand="md" fixed="top">
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
            <NavBarIcon key="home" iconClass="fa-solid fa-house-chimney" label="Home" link="/" />
        
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
