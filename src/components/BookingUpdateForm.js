import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from '../styles/BookingForm.module.css';
import btnStyles from '../styles/Button.module.css';


function BookingUpdateForm({ booking, onUpdated, onDeleted }) {
    const [date, setDate] = useState(booking.date);
    const [time, setTime] = useState(booking.time_slot);
    const [numOfPeople, setNumOfPeople] = useState(booking.num_of_people);
    const [error, setError] = useState('');

    const handleUpdateSubmit = async e => {
        e.preventDefault();
        try {
            const bookingData = {
                date,
                time_slot: time,
                num_of_people: numOfPeople,
                user_id: booking.user_id,
            };
            
            // Update the existing booking
            await axios.put(`/visiting/:id/edit/`, bookingData);
            
            // Inform parent component of the update
            if (onUpdated) onUpdated();

        } catch (err) {
            console.error('Error updating booking:', err);
            setError('Error updating booking. Please try again.');
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/visiting/${booking.id}/`);
            
            // Inform parent component of the deletion
            if (onDeleted) onDeleted();

        } catch (err) {
            console.error('Error deleting booking:', err);
            setError('Error deleting booking. Please try again.');
        }
    };

    return (
        <div className={styles.BookingUpdateForm}>
            {error && <p className="text-danger">{error}</p>}
            <Form onSubmit={handleUpdateSubmit}>
                <Form.Group controlId="updateDate">
                    <Form.Label>Date:</Form.Label>
                    <Form.Control
                        as="input"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="updateTime">
                    <Form.Label>Time:</Form.Label>
                    <Form.Control
                        as="input"
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="updateNumOfPeople">
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

                <Button className={btnStyles.Button} type="submit">
                    Update Booking
                </Button>
                <Button className={`${btnStyles.Button} ${btnStyles.Danger}`} onClick={handleDelete}>
                    Delete Booking
                </Button>
            </Form>
        </div>
    );
}

export default BookingUpdateForm;
