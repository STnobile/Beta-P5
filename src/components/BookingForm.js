import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import Form from 'react-bootstrap/Form';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import styles from '../styles/BookingForm.module.css';
import appStyles from '../App.module.css';
import btnStyles from "../styles/Button.module.css";
import { axiosReq } from '../api/axiosDefaults';
import ErrorBanner from './ErrorBanner';
import { getErrorMessage } from '../utils/utils';


const getDatePlusDay = days => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().slice(0, 10);
};

const saveBookingsToLocal = (bookings) => {
    localStorage.setItem('userBookings', JSON.stringify(bookings));
};

function BookingForm() {
    const [formSubmitted, setFormSubmitted] = useState(true);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [numOfPeople, setNumOfPeople] = useState(1);
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState('');
    const [chosenDateTime, setChosenDateTime] = useState(null);
    const maxCapacity = 28;
    const currentUser = useCurrentUser();
    const previousBookingsRef = useRef(null);

    const isOwnerOfBooking = booking => currentUser && booking.owner_id === currentUser.id;

    const userBookings = currentUser
        ? bookings.filter(booking => isOwnerOfBooking(booking))
        : [];

    const [tourSection, setTourSection] = useState('');

    const loadBookings = useCallback(async ({ shouldUpdate = () => true } = {}) => {
        try {
            const response = await axiosReq.get('/visiting/');
            if (!shouldUpdate()) return false;
            setBookings(response.data.results);
            saveBookingsToLocal(response.data.results);
            return true;
        } catch (err) {
            if (shouldUpdate()) {
                setError(getErrorMessage(err, 'Error loading bookings. Please try again later.'));
            }
            return false;
        }
    }, []);
    

    useEffect(() => {
        let isMounted = true; // Flag to indicate the mounted status
    
        loadBookings({ shouldUpdate: () => isMounted });
    
        return () => {
            isMounted = false;
        };
    }, [loadBookings]);

    const allowedDays = useMemo(() => {
        return [...Array(10).keys()]
            .map(getDatePlusDay)
            .filter(day => {
                const dayOfWeek = new Date(day).getDay();
                return dayOfWeek !== 0 && dayOfWeek !== 1;
            })
            .filter(day => {
                // Ensure the day is not in the past
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return new Date(day) >= today;
            });
    }, []);

    useEffect(() => {
        if (!allowedDays.length) return;
        if (!allowedDays.includes(date)) {
            setDate(allowedDays[0]);
        }
    }, [allowedDays, date]);

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
    const remainingCapacity = date && time
        ? maxCapacity - calculateCurrentCapacity(date, time)
        : maxCapacity;


    const handleBookingSubmit = async e => {
        e.preventDefault(); // Correct usage to prevent form default submission.

        // Reset form submitted state when starting a new submission
        setError('');
        try {
            const currentCapacity = calculateCurrentCapacity(date, time);
            if (currentCapacity + numOfPeople <= maxCapacity) {
                const bookingData = {
                    date,
                    time_slot: time,
                    num_of_people: numOfPeople,
                    tour_section: tourSection,
                    // Add other necessary fields here
                };
                // Create a new booking
                const response = await axiosReq.post('/visiting/', bookingData);
                if (response.status === 201) { // Check if the booking was created successfully (201 Created)
                    // Reset fields and load bookings
                    setDate(allowedDays[0] || '');
                    setTime('');
                    setNumOfPeople(1);
                    setTourSection('');
                    await loadBookings();
                    setChosenDateTime(`${date} ${time}`);
                    setFormSubmitted(true);
                } else {
                    setError('Failed to create the booking.');
                }
            } else {
                setError('The selected time slot is fully booked.');
            }
        } catch (err) {
            setError(getErrorMessage(err, 'Error processing booking. Please try again.'));
        } finally {
            // Optional reset of formSubmitted state
            // setFormSubmitted(false);
        }
    };

    const handleDelete = async (bookingId) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this booking?');
        if (isConfirmed) {
            // Make a copy of the current bookings for potential rollback
            setBookings(prevBookings => {
                previousBookingsRef.current = prevBookings;
                const newBookings = prevBookings.filter(booking => booking.id !== bookingId);
                // Persist the optimistic update immediately
                saveBookingsToLocal(newBookings);
                // Update the state optimistically
                return newBookings;
            });
    
            try {
                const response = await axiosReq.delete(`/visiting/${bookingId}/`);
                if (!(response.status === 200 || response.status === 204)) {
                    // If the deletion was not successful, throw an error to catch it below
                    throw new Error('Deletion was not successful.');
                }
            } catch (error) {
                // If an error occurs, rollback to the previous bookings
                const rollbackBookings = previousBookingsRef.current || [];
                setBookings(rollbackBookings);
                saveBookingsToLocal(rollbackBookings);
                setError('Error deleting booking. Please try again.');
            }
        }
    };
    

    if (!currentUser) {
        return (
            <Row className={styles.PageRow}>
                <Col className="my-auto p-0 p-md-2" lg={7}>
                    <Container className={`${appStyles.Content} ${styles.Panel}`}>
                        <h1 className={styles.Header}>Book a Visit</h1>
                        <p className={styles.SubHeader}>Please sign in to book a museum visit.</p>
                        <Button
                            as={Link}
                            to="/signin"
                            className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
                        >
                            Sign in
                        </Button>
                    </Container>
                </Col>
            </Row>
        );
    }

    return (
        <Row className={styles.PageRow}>
            <Col className="p-0 p-md-2" lg={7}>
                <Container className={`${appStyles.Content} ${styles.Panel}`}>
                    <h1 className={styles.Header}>Book a Visit</h1>
                    <p className={styles.SubHeader}>
                        Pick your date, tour section, time slot, and visitor count.
                    </p>
                    <ErrorBanner message={error} />
                    <Form onSubmit={handleBookingSubmit} className={styles.BookingForm}>
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
                            {!!time && !!date && (
                                <div className={styles.InfoText}>
                                    Remaining spots: {Math.max(remainingCapacity, 0)}
                                </div>
                            )}
                        </Form.Group>

                        <Form.Group controlId="num_of_people">
                            <Form.Label>Number of People:</Form.Label>
                            <Form.Control
                                type="number"
                                min={1}
                                max={28}
                                value={numOfPeople}
                                onChange={(e) => setNumOfPeople(parseInt(e.target.value, 10))}
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
                            disabled={!date || !time || !tourSection || remainingCapacity <= 0 || numOfPeople > remainingCapacity}
                        >
                            Submit Booking
                        </Button>
                    </Form>
                </Container>
            </Col>
            <Col className="p-0 p-md-2" lg={5}>
                <Container className={`${appStyles.Content} ${styles.Panel}`}>
                    <h2 className={styles.SectionTitle}>Your Bookings</h2>
                    {formSubmitted && userBookings.length > 0 ? (
                        <div className="table-responsive">
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
                                    {userBookings.map((booking) => (
                                        <tr key={booking.id}>
                                            <td>{booking.date}</td>
                                            <td>{booking.time_slot}</td>
                                            <td>{booking.tour_section}</td>
                                            <td>{booking.num_of_people}</td>
                                            <td>
                                                <Button
                                                    className={`${btnStyles.vstnBtn} ${btnStyles.vstnBtnOutline}`}
                                                    name="delete"
                                                    onClick={() => handleDelete(booking.id)}
                                                    aria-label="Delete booking"
                                                >
                                                    <i className="fa-solid fa-trash-can"></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className={styles.EmptyState}>No bookings available yet.</div>
                    )}

                    {chosenDateTime && (
                        <div className={`alert alert-success ${styles.SuccessAlert}`} role="alert">
                            Your booking for {chosenDateTime} has been successfully submitted.
                        </div>
                    )}
                </Container>
            </Col>
        </Row>
    );
}

export default BookingForm;
