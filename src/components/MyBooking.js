import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, ListGroup, ListGroupItem } from 'react-bootstrap';

const MyBooking = () => {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Replace with the actual user ID or other identifier as required
    const userId = 'userId';
    const fetchBooking = async () => {
      try {
        const response = await axios.get(`/my-booking/${userId}`);
        if (response.status === 200) {
          setBooking(response.data);
        } else {
          setError('No booking found.');
        }
      } catch (err) {
        console.error('Error fetching booking:', err);
        setError('Error fetching your booking. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, []);

  const handleDeleteBooking = async () => {
    try {
      // Replace with the actual booking ID or other identifier as required
      const bookingId = booking.id;
      const response = await axios.delete(`/my-booking/${bookingId}`);
      if (response.status === 200) {
        setBooking(null);
        alert('Your booking has been successfully cancelled.');
      } else {
        setError('Unable to cancel the booking. Please try again later.');
      }
    } catch (err) {
      console.error('Error deleting booking:', err);
      setError('Error processing your request. Please try again.');
    }
  };

  if (loading) {
    return <Container>Loading your booking...</Container>;
  }

  if (error) {
    return <Container className="text-danger">{error}</Container>;
  }

  if (!booking) {
    return <Container>You currently have no bookings.</Container>;
  }

  return (
    <Container>
      <h2>My Booking</h2>
      {booking && (
        <ListGroup>
          <ListGroupItem>Date: {booking.date}</ListGroupItem>
          <ListGroupItem>Time: {booking.time}</ListGroupItem>
          <ListGroupItem>Section: {booking.tourSection}</ListGroupItem>
          <ListGroupItem>Number of People: {booking.numOfPeople}</ListGroupItem>
        </ListGroup>
      )}
      <Button variant="danger" onClick={handleDeleteBooking}>
        Cancel Booking
      </Button>
    </Container>
  );
};

export default MyBooking;