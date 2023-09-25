import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from '../styles/BookingForm.module.css';
import btnStyles from '../styles/Button.module.css';
import appStyles from '../App.module.css';

const getDatePlusDay = (days) => {
    const today = new Date()
    const date = new Date(today)
    date.setDate(date.getDate() + days)
    return date.toISOString().slice(0, 10)
}

function BookingForm() {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [numOfPeople, setNumOfPeople] = useState(1);
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState('');
    const [chosenDateTime, setChosenDateTime] = useState(null);
    const maxCapacity = 28; // Maximum capacity value

    useEffect(() => {
        // Load bookings when the component mounts
        loadBookings();
    }, []);

    const loadBookings = async () => {
        try {
            const response = await axios.get('/visiting/');
            setBookings(response.data.results);
        } catch (err) {
            console.error('Error loading bookings:', err);
            setError('Error loading bookings. Please try again later.');
        }
    };

    const allowedDays = [...Array(7).keys()].map((day) => {
        return getDatePlusDay(day)
    });

    const allowedTimeSlots = [
        '10:00 am - 11:30 am',
        '12:00 pm - 1:30 pm',
        '4:00 pm - 5:30 pm',
        '6:00 pm - 7:30 pm',
    ];

    // Function to calculate the current capacity for each time slot and date
    const calculateCurrentCapacity = (selectedDate, selectedTime) => {
        return bookings.reduce((totalCapacity, booking) => {
            if (booking.date === selectedDate && booking.time_slot === selectedTime) {
                totalCapacity += booking.num_of_people;
            }
            return totalCapacity;
        }, 0);
    };

    const handleBookingSubmit = async (e) => {
        e.preventDefault();

        try {
            // Calculate the current capacity based on the selected date and time slot
            const currentCapacity = calculateCurrentCapacity(date, time);

            // Ensure current_capacity doesn't exceed max_capacity
            if (currentCapacity + numOfPeople <= maxCapacity) {
                // Simulate a successful booking submission (Replace this with your actual code)
                const bookingData = {
                    date,
                    time_slot: time,
                    max_capacity: maxCapacity,
                    num_of_people: numOfPeople,
                    current_capacity: currentCapacity + numOfPeople,
                };

                // Clear form fields and reload bookings
                setDate('');
                setTime('');
                setNumOfPeople(1); // Reset num of people to 1
                loadBookings();
                setChosenDateTime(`${date} ${time}`);
                console.log(bookingData); // This will log the booking data
            } else {
                setError('The selected time slot is fully booked.');
            }
        } catch (err) {
            console.error('Error creating booking:', err);
            setError('Error creating booking. Please try again.');
        }
    };

    return (
        <Row className={styles.Row}>
            <Col className="my-auto p-0 p-md-2" md={6}>
                <Container className={`${appStyles.Content} p-4 `}>
                    <h1 className={styles.Header}>Book a Visit</h1>

                    {error && <p className="text-danger">{error}</p>}

                    <Form onSubmit={handleBookingSubmit}>
                        <Form.Group controlId="date">
                            <Form.Label>Date:</Form.Label>
                            <Form.Control
                                className={""}
                                as="select"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            >
                                <option value="" disabled hidden>
                                    Select a Date:
                                </option>

                                {allowedDays.map((day) => (
                                    <option key={day} value={day}>
                                        {day}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="time">
                            <Form.Label>Time:</Form.Label>
                            <Form.Control
                                className={""}
                                as="select"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                required
                            >
                                <option value="" disabled hidden>
                                    Select a Time Slot:
                                </option>
                                {allowedTimeSlots.map((slot) => (
                                    <option key={slot} value={slot}>
                                        {slot}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        {/* Allow the user to select the number of people */}
                        <Form.Group controlId="num_of_people">
                            <Form.Label>Number of People:</Form.Label>
                            <Form.Control
                                className={styles.Input}
                                type="number"
                                min={1}
                                max={28}
                                value={numOfPeople}
                                onChange={(e) => setNumOfPeople(parseInt(e.target.value))}
                                required
                            />
                        </Form.Group>

                        {/* Display max capacity */}
                        <Form.Group controlId="max_capacity">
                            <Form.Label>Max Capacity:</Form.Label>
                            <Form.Control
                                className={styles.Input}
                                type="text"
                                value={maxCapacity}
                                readOnly
                            />
                        </Form.Group>

                        <Button
                            className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
                            type="submit"
                        >
                            Book Here!!
                        </Button>
                    </Form>
                    <ul>
                        {bookings.map((booking) => (
                            <li key={booking.id} className={styles.Header}>
                                 {booking.date} {booking.time_slot}
                            </li>
                        ))}
                    </ul>

                    {chosenDateTime && (
                        <div className={styles.ChosenDateTime}>
                            You have booking: {chosenDateTime}
                        </div>
                    )}
                </Container>
            </Col>
        </Row>
    );
}

export default BookingForm;
