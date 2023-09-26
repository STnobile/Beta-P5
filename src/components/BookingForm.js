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
    const [date, setDate] = useState(getDatePlusDay(0));
    const [time, setTime] = useState('');
    const [numOfPeople, setNumOfPeople] = useState(1);
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState('');
    const [chosenDateTime, setChosenDateTime] = useState(null);
    const maxCapacity = 28;
    const currentUser = useCurrentUser();

    const loadBookings = async () => {
        try {
            const response = await axios.get('/visiting/');
            setBookings(response.data.results);
        } catch (err) {
            console.error('Error loading bookings:', err);
            setError('Error loading bookings. Please try again later.');
        }
    };

    useEffect(() => {
        loadBookings();
    }, []);

    const allowedDays = [...Array(10).keys()]
        .map(getDatePlusDay)
        .filter(day => {
            const dayOfWeek = new Date(day).getDay();
            return dayOfWeek !== 0 && dayOfWeek !== 1;  // Exclude Sundays and Mondays
        })
        .filter(day => {
            // Ensure the day is not in the past
            const today = new Date();
            today.setHours(0, 0, 0, 0);  // Reset time to compare dates only
            return new Date(day) >= today;
        });

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

    const [editingBooking, setEditingBooking] = useState(null);

    const handleEdit = (bookingId) => {
        const bookingToEdit = bookings.find(booking => booking.id === bookingId);
        if (bookingToEdit) {
            setDate(bookingToEdit.date);
            setTime(bookingToEdit.time_slot);
            setNumOfPeople(bookingToEdit.num_of_people);
            setEditingBooking(bookingToEdit);
        }
    };

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
                
                if (editingBooking) {
                    // Update the existing booking
                    await axios.put(`/visiting/${editingBooking.id}/`, bookingData);
                    setEditingBooking(null);  // Reset the editing state
                } else {
                    // Create a new booking
                    await axios.post('/visiting/', bookingData);
                }
                
                setDate('');
                setTime('');
                setNumOfPeople(1);
                loadBookings();
                setChosenDateTime(`${date} ${time}`);
            } else {
                setError('The selected time slot is fully booked.');
            }
        } catch (err) {
            console.error('Error processing booking:', err);
            setError('Error processing booking. Please try again.');
        }
    };

    const handleDelete = async (bookingId) => {
        try {
            await axios.delete(`/visiting/${bookingId}/`);
            loadBookings();
        } catch (err) {
            console.error('Error deleting booking:', err);
            setError('Error deleting booking. Please try again.');
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
                            <div className={styles.InfoText}>Selected: {numOfPeople} people</div>
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
                            className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Dark}`}
                            type="submit"
                        >
                            Submit Booking
                        </Button>
                    </Form>
                    <table className={styles.BookingTable}>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Time Slot</th>
                                <th>Number of People</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings
                                .filter(booking => booking.user_id === currentUser.id)
                                .map(booking => (
                                    <tr key={booking.id}>
                                        <td>{booking.date}</td>
                                        <td>{booking.time_slot}</td>
                                        <td>{booking.num_of_people}</td>
                                        <td>
                                            <button onClick={() => handleEdit(booking.id)}>Edit</button>
                                            <button onClick={() => handleDelete(booking.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>

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
