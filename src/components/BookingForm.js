import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/BookingForm.module.css';
import btnStyles from '../styles/Button.module.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import appStyles from '../App.module.css';

function BookingForm() {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        // Load bookings when the component mounts
        loadBookings();
    }, []);

    const loadBookings = async () => {
        try {
            const response = await axios.get('/api/visits/');
            setBookings(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const allowedDays = ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const allowedTimeSlots = [
        '10:00 am - 11:30 am',
        '12:00 pm - 1:30 pm',
        '4:00 pm - 5:30 pm',
        '6:00 pm - 7:30 pm',
    ];

    const handleBookingSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/visits/', { date, time });
            // Clear form fields and reload bookings
            setDate('');
            setTime('');
            loadBookings();
        } catch (err) {
            console.error('Error creating booking:', err);
        }
    };

    return (
        <Row className={styles.Row}>
            <Col className="my-auto p-0 p-md-2" md={6}>
                <Container className={`${appStyles.Content} p-4 `}>
                    <h1 className={styles.Header}>Book a Visit</h1>

                    <Form onSubmit={handleBookingSubmit}>
                        <Form.Group controlId="date">
                            <Form.Label>Date:</Form.Label>
                            <Form.Control
                                className={styles.Input}
                                as="select"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            >
                                <option
                                    value="Select a Date:">
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
                                className={styles.Input}
                                as="select"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                required
                            >
                                <option value="Select a Time Slot:"></option>
                                {allowedTimeSlots.map((slot) => (
                                    <option key={slot} value={slot}>
                                        {slot}
                                    </option>
                                ))}
                            </Form.Control>
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
                                {booking.location} - {booking.date} {booking.time}
                            </li>
                        ))}
                    </ul>
                </Container>
            </Col>
            <Col
                md={6}
                className={`my-auto d-none d-md-block p-2 ${styles.SignInCol}`}
            >
                <Image
                    className={`${appStyles.FillerImage}`}
                    src={
                        'https://res.cloudinary.com/dj3sy6ut7/image/upload/v1694425334/media/images/hero3_qlzgwv.jpg'
                    }
                />
            </Col>
        </Row>
    );
}

export default BookingForm;
