import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import Form from 'react-bootstrap/Form';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from '../styles/BookingForm.module.css';
import appStyles from '../App.module.css';
import btnStyles from "../styles/Button.module.css";
import Image from "react-bootstrap/Image";


const getDatePlusDay = days => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().slice(0, 10);
};

function BookingForm() {
    const [formSubmitted, setFormSubmitted] = useState(true);
    const [date, setDate] = useState(getDatePlusDay(0));
    const [time, setTime] = useState('');
    const [numOfPeople, setNumOfPeople] = useState(1);
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState('');
    const [chosenDateTime, setChosenDateTime] = useState(null);
    const maxCapacity = 28;
    const currentUser = useCurrentUser();
    const [deleteSuccess, setDeleteSuccess] = useState('');

    const isOwnerOfBooking = booking => booking.owner_id === currentUser.id;

    // Define userBookings here
    const userBookings = bookings.filter(booking => isOwnerOfBooking(booking));

    const [tourSection, setTourSection] = useState('');

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

    const allowedDays = useMemo(() => {
        return [...Array(10).keys()]
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
    }, []);


    const TOUR_SECTIONS = [
        ['Museum', 'Museum'],
        ['Photos Gallery', 'Photos Gallery'],
        ['Underground Wine tanks', 'Under Ground Wine tanks'],
        ['Private Garden', 'Private Garden'],
    ];

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
        // Reset form submitted state when starting a new submission
        setFormSubmitted(false);
        setError('');
        try {
            const currentCapacity = calculateCurrentCapacity(date, time);
            if (currentCapacity + numOfPeople <= maxCapacity) {
                const bookingData = {
                };
                // Create a new booking
                await axios.post('/visiting/', bookingData);

                // Reset fields and load bookings
                setDate(getDatePlusDay(0));
                setTime('');
                setNumOfPeople(1);
                setTourSection('');
                loadBookings();
                setChosenDateTime(`${date} ${time}`);
                setFormSubmitted(false);
            } else {
                setError('The selected time slot is fully booked.');
            }
        } catch (err) {
            console.error('Error processing booking:', err);
            setError('Error processing booking. Please try again.');
        }
    };

    const handleDelete = async (bookingId) => {
        // Confirmation dialog
        const isConfirmed = window.confirm('Are you sure you want to delete this booking?');

        if (isConfirmed) {
            try {
                const bookingToDelete = bookings.find(booking => booking.id === bookingId);
                if (!bookingToDelete) {
                    setError('Booking not found.');
                    return;
                }
                // Ensure the user is the owner of the booking if necessary before deletion
                if (isOwnerOfBooking(bookingToDelete)) {
                    await axios.delete(`/visiting/${bookingId}/`);
                    setDeleteSuccess('Booking successfully deleted.');
                    // Reset error in case there was one before
                    setError('');
                    loadBookings();
                } else {
                    setError('You are not authorized to delete this booking.');
                }
            } catch (err) {
                console.error('Error deleting booking:', err);
                setError('Error deleting booking. Please try again.');
            }
        } else {
            // User clicked 'Cancel' in the confirmation dialog
            console.log('Deletion cancelled by user.');
        }
    };

    return (
        <Row className={styles.Row}>
            <Col className="my-auto p-0 p-md-2" md={6}>
                <Container className={`${appStyles.Content} p-4`}>
                    <>
                        <h1 className={styles.Header}>Book a Visit</h1>
                    </>
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

                        <Form.Group controlId="tour_section">
                            <Form.Label>Tour Section:</Form.Label>
                            <Form.Control
                                as="select"
                                value={tourSection}
                                onChange={(e) => setTourSection(e.target.value)}
                                required
                            >
                                <option value="" disabled hidden>
                                    Select a Tour Section:
                                </option>
                                {TOUR_SECTIONS.map(tourSection => (
                                    <option key={tourSection[0]} value={tourSection[0]}>
                                        {tourSection[1]}
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
                            className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
                            type="submit"
                        >
                            Submit Booking
                        </Button>
                    </Form>
                    <hr />

                    {formSubmitted && (
                        <table className={styles.BookingTable}>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Section</th>
                                    <th>N.P.</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userBookings.map(booking => (
                                        <tr key={booking.id}>
                                            <td>{booking.date}</td>
                                            <td>{booking.time_slot}</td>
                                            <td>{booking.tour_section}</td>
                                            <td>{booking.num_of_people}</td>
                                            <td>
                                                <Button
                                                    className={`${btnStyles.Blue}`}
                                                    name='delete'
                                                    onClick={() => handleDelete(booking.id)}><i className="fa-solid fa-trash-can"></i>
                                                </Button>
                                            </td>
                                        </tr>
                                ))}
                                    </tbody>
                        </table>
                    )}

                    {chosenDateTime && (
                        <div className="alert alert-success" role="alert">
                            Your booking for {chosenDateTime} has been successfully submitted!
                        </div>
                    )}

                    {deleteSuccess && (
                        <div className="alert alert-success" role="alert">
                            {deleteSuccess}
                        </div>
                    )}
                </Container>
            </Col>

            <Col
                md={6}
                className={`my-auto d-none d-md-block p-2 ${styles.SignInCol}`}
            >
                <Image
                    className={`${appStyles.FillerImage}`}
                    src={"https://res.cloudinary.com/dj3sy6ut7/image/upload/v1693921307/discovery.jpg"}
                />
            </Col>
        </Row>
    );
}

export default BookingForm;