import React, { useEffect, useState } from "react";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { useHistory, useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";

import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

const UsernameForm = () => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const history = useHistory();
  // console.log(history);
  const { id } = useParams();
  // console.log("IDDDDDDDDDDDDDDD: ", id)
  // console.log({ id });

  const currentUser = useCurrentUser();
  // console.log(useCurrentUser);
  const setCurrentUser = useSetCurrentUser();
  // console.log(setCurrentUser);

  useEffect(() => {
    let index = 0
    if (currentUser?.profile_id?.toString() === id) {
      console.log("Index: ", index)
      console.log("currentUser from useEffect:", currentUser);
      setUsername(currentUser.username);
      console.log("username from useEffect:", username);
      console.log("profile from useEffect:", currentUser.profile);

      setFirstName(currentUser.profile_firstName);
      setLastName(currentUser.lastName );
      setEmail(currentUser.email);
      console.log("First Name from useEffect:", firstName);
      console.log("Last Name from useEffect:", lastName);
      console.log("Email from useEffect:", email);
      console.log("Username from useEffect:", username);
      index += 1
    } else {
      history.push("/");
    }
  }, [currentUser, history, id, email, username, firstName, lastName]);

  


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitting the form with the following values:");
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Email:", email);
    console.log("Username:", username);

    try {
      const response = await axiosRes.put(`/dj-rest-auth/user/`, {
        first_name: firstName,
        last_name: lastName,
        email: email,
        username: username,
      });
      console.log("Response data:", response.data);
      setCurrentUser((prevUser) => ({
        ...prevUser,
        profile: {
          ...prevUser.profile,
          email: email,
          username: username,
        }
      }));
      history.goBack();
    } catch (err) {
      console.error("Error submitting form:", err);
      setErrors(err.response?.data || {});
    }
  };


  return (
    <Row>
      <Col className="py-2 mx-auto text-center" md={6}>
        <Container className={appStyles.Content}>
          <Form onSubmit={handleSubmit} className="my-2">
            <Form.Group>
              <Form.Label>First Name: {firstName}</Form.Label>
              <Form.Control
                placeholder="First name"
                type="text"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
            </Form.Group>
            {errors?.firstName?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            )) }

            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                placeholder="Last name"
                type="text"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
            </Form.Group>
            {errors?.lastName?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                placeholder="Email"
                type="email" // Set type to email for proper validation
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group>
            {errors?.email?.map((message, idx) => ( // Updated from location to email
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            )) }
            <Form.Group>
              <Form.Label>Change Username</Form.Label>
              <Form.Control
                placeholder="Username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </Form.Group>
            {errors?.username?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            )) }
            <div className="d-flex justify-content-between">
              <Button
                className={`${btnStyles.Button} ${btnStyles.Blue}`}
                onClick={() => history.goBack()}
              >
                Cancel
              </Button>
              <Button
                className={`${btnStyles.Button} ${btnStyles.Blue}`}
                type="submit"
              >
                Save
              </Button>
            </div>
          </Form>
        </Container>
      </Col>
    </Row>
  );
};

export default UsernameForm;