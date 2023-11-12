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
  const [sending, setSending] = useState(false);
  
  const [errors, setErrors] = useState({});

  const history = useHistory();
  // console.log(history);
  const { id } = useParams();
  //  console.log("IDDDDDDDDDDDDDDD: ", id)
  // console.log({ id });

  const currentUser = useCurrentUser();
  // console.log(useCurrentUser);
  const setCurrentUser = useSetCurrentUser();
  //  console.log(setCurrentUser)


  useEffect(() => {
    if (currentUser?.profile_id?.toString() === id) {
      setUsername(currentUser.username);
      setFirstName(currentUser.first_name); // Set first_name
      setLastName(currentUser.last_name);   // Set last_name
    } else {
      history.push("/");
    }
  }, [currentUser, history, id]);

  const handleSubmit = async (event) => {
    setSending(true);
    event.preventDefault();
    try {
      await axiosRes.put("/dj-rest-auth/user/", {
        username,
        first_name: firstName, // Include first_name
        last_name: lastName,   // Include last_name
      });
      setCurrentUser((prevUser) => ({
        ...prevUser,
        username,
        first_name: firstName, // Update state
        last_name: lastName,   // Update state
      }));
      history.goBack();
    } catch (err) {
      setErrors(err.response?.data);
    }
    setSending(false);
  };

  // useEffect(() => {
  //   // Define `fetchData` inside `useEffect` to capture the current `id`
  //   const fetchData = async () => {
  //     try {
  //       const response = await axiosRes.get(`/dj-rest-auth/user/`);
  //       const userData = response.data;
  //       console.log(userData)

  //       setUsername(currentUser.username)
      
  //       setFirstName(userData.first_name); 
  //       console.log(userData.first_name)
      
  //       setLastName(userData.last_name);
  //       console.log(userData.last_name)
      
  //     } catch (error) {
  //       // Error handling here
  //       console.error("Failed to fetch user data:", error);
  //     }
  //   };

  //   if (currentUser?.profile_id?.toString() === id) {
  //      setUsername(currentUser.username);
      
  //     // Call `fetchData` if there is an `id` present and it's not the current user's profile
  //     fetchData();
  //   } else {
  //     // Redirect to the homepage if there is no `id`
  //     history.push("/");
  //   } 
  // }, [currentUser, id, history]); 

  


  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   console.log("Submitting the form with the following values:");
  //   console.log("First Name:", firstName);
  //   console.log("Last Name:", lastName);
  //   console.log("Username:", username);

  //   try {
  //     const response = await axiosRes.put(`/dj-rest-auth/user/`, {
  //       first_name: firstName,
  //       last_name: lastName,
  //       username: username,
  //     });
  //     console.log("Response data:", response.data);
  //     setCurrentUser((prevUser) => ({
  //       ...prevUser,
  //       profile: {
  //         ...prevUser.profile,
  //         username,
  //       }
  //     })
  //     );
  //     history.goBack();
  //   } catch (err) {
  //     console.error("Error submitting form:", err);
  //     setErrors(err.response?.data || {});
  //   }
  // };


  return (
    <Row>
      <Col className="py-2 mx-auto text-center" md={6}>
        <Container className={appStyles.Content}>
          <Form onSubmit={handleSubmit} className="my-2">
            <Form.Group>
              <Form.Label>First Name:</Form.Label>
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
                disabled={sending} 
                className={`${btnStyles.Button} ${btnStyles.Blue}`}
                type="submit"
              >
                {sending ? "Sending..." : "Save"}
              </Button>
            </div>
          </Form>
        </Container>
      </Col>
    </Row>
  );
};

export default UsernameForm;