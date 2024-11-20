import React, { useState } from 'react';
import axios from 'axios';

const CreateMeeting = () => {
    const [meetingData, setMeetingData] = useState({
        meetingId: '',
        start: '',
        end: '',
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMeetingData({
            ...meetingData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:5000/api/meetings', meetingData)
            .then((response) => {
                setMessage(response.data.message);
                setMeetingData({ meetingId: '', start: '', end: '' });
            })
            .catch((err) => {
                setMessage('Failed to create meeting');
                console.error(err);
            });
    };

    return (
        <div>
            <h1>Create New Meeting</h1>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Meeting ID:</label>
                    <input
                        type="text"
                        name="meetingId"
                        value={meetingData.meetingId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Start Time:</label>
                    <input
                        type="datetime-local"
                        name="start"
                        value={meetingData.start}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>End Time:</label>
                    <input
                        type="datetime-local"
                        name="end"
                        value={meetingData.end}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Create Meeting</button>
            </form>
        </div>
    );
};

export default CreateMeeting;
