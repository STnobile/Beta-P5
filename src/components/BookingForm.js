import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from '../styles/BookingForm.module.css';
import btnStyles from '../styles/Button.module.css';
import appStyles from '../App.module.css';

const getDatePlusDay = days => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().slice(0, 10);
};

function BookingForm() {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [numOfPeople, setNumOfPeople] = useState(1);
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState('');
    const [chosenDateTime, setChosenDateTime] = useState(null);
    const maxCapacity = 28;
    const currentUser = useCurrentUser();

    useEffect(() => {
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

    const allowedDays = [...Array(7).keys()].map(getDatePlusDay);
    const allowedTimeSlots = [
        '10:00 am - 11:30 am',
        '12:00 pm - 1:30 pm',
        '4:00 pm - 5:30 pm',
        '6:00 pm - 7:30 pm',
    ];

    const calculateCurrentCapacity = (selectedDate, selectedTime) => bookings.reduce(
        (totalCapacity, booking) => booking.date === selectedDate && booking.time_slot === selectedTime
            ? totalCapacity + booking.num_of_people
            : totalCapacity
    , 0);

    const handleBookingSubmit = async e => {
        e.preventDefault();
        try {
            const currentCapacity = calculateCurrentCapacity(date, time);
            if (currentCapacity + numOfPeople <= maxCapacity) {
                const bookingData = {
                    date,
                    time_slot: time,
                    num_of_people: numOfPeople,
                    user_id: currentUser.id,
                };
                await axios.post('/visiting/', bookingData);
                setDate('');
                setTime('');
                setNumOfPeople(1);
                loadBookings();
                setChosenDateTime(`${date} ${time}`);
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
                <Container className={`${appStyles.Content} p-4`}>
                    <h1 className={styles.Header}>Book a Visit</h1>
                    {error && <p className="text-danger">{error}</p>}
                    <Form onSubmit={handleBookingSubmit}>
                        <Form.Group controlId="date">
                            <Form.Label>Date:</Form.Label>
                            <Form.Control
                                as="select"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            >
                                <option value="" disabled hidden>
                                    Select a Date:
                                </option>
                                {allowedDays.map(day => (
                                    <option key={day} value={day}>
                                        {day}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="time">
                            <Form.Label>Time:</Form.Label>
                            <Form.Control
                                as="select"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                required
                            >
                                <option value="" disabled hidden>
                                    Select a Time Slot:
                                </option>
                                {allowedTimeSlots.map(slot => (
                                    <option key={slot} value={slot}>
                                        {slot}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="num_of_people">
                            <Form.Label>Number of People:</Form.Label>
                            <Form.Control
                                type="number"
                                min={1}
                                max={28}
                                value={numOfPeople}
                                onChange={(e) => setNumOfPeople(parseInt(e.target.value))}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="max_capacity">
                            <Form.Label>Max Capacity:</Form.Label>
                            <Form.Control
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
                        {bookings.map(booking => (
                            <li key={booking.id}>
                                {booking.date} {booking.time_slot}
                            </li>
                        ))}
                    </ul>
                    {chosenDateTime && (
                        <div className={styles.ChosenDateTime}>
                            You have a booking on: {chosenDateTime}
                        </div>
                    )}
                </Container>
            </Col>
        </Row>
    );
}

export default BookingForm;
