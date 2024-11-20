import React from 'react';
import { useParams } from 'react-router-dom';

const Room = () => {
    const { meetingId } = useParams();

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to the Room</h1>
            <p>
                <strong>Meeting ID:</strong> {meetingId}
            </p>
            <p>This is the session room for the specified Meeting ID.</p>
        </div>
    );
};

export default Room;
