import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MeetingList = () => {
    const [meetings, setMeetings] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/meetings') // Changed to GET
            .then((response) => {
                setMeetings(response.data);
            })
            .catch((err) => {
                setError('Failed to fetch meeting IDs');
                console.error(err);
            });
    }, []);

    return (
        <div>
            <h1>Meeting IDs</h1>
            {error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <ul>
                    {meetings.map((meeting) => (
                        <li key={meeting.meetingId}>
                            <button
                                onClick={() => navigate(`/meeting/${meeting.meetingId}`)}
                            >
                                {meeting.meetingId}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MeetingList;
