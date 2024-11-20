import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JoinSession = () => {
    const [meetingId, setMeetingId] = useState('');
    const navigate = useNavigate();

    const handleJoinSession = () => {
        if (meetingId.trim()) {
            navigate(`/room/${meetingId}`);
        } else {
            alert('Please enter a valid Meeting ID');
        }
    };

    return (
        <div style={{ textAlign: 'center', margin: '20px' }}>
            <input
                type="text"
                placeholder="Enter Meeting ID"
                value={meetingId}
                onChange={(e) => setMeetingId(e.target.value)}
                style={{ padding: '10px', width: '250px', marginRight: '10px' }}
            />
            <button onClick={handleJoinSession} style={{ padding: '10px 20px' }}>
                Join Session
            </button>
        </div>
    );
};

export default JoinSession;
