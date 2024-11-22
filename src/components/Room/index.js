// import React from 'react';
// import { useParams } from 'react-router-dom';

// const Room = () => {
//     const { meetingId } = useParams();

//     return (
//         <div style={{ textAlign: 'center', marginTop: '50px' }}>
//             <h1>Welcome to the Room</h1>
//             <p>
//                 <strong>Meeting ID:</strong> {meetingId}
//             </p>
//             <p>This is the session room for the specified Meeting ID.</p>
//         </div>
//     );
// };

// export default Room;


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { logEvent } from '../../Api/api'; // Import the logEvent function

const Room = () => {
    const { meetingId } = useParams();
    const [participantId, setParticipantId] = useState(''); // Set this to the actual participant ID
    const [micStatus, setMicStatus] = useState(false); // Example for mic status
    const [webcamStatus, setWebcamStatus] = useState(false); // Example for webcam status

    useEffect(() => {
        // Log participant join event when the component mounts
        logEvent(meetingId, participantId, 'join', {
            start: new Date().toISOString(),
            details: 'Participant joined the session',
        });

        return () => {
            // Log participant leave event when the component unmounts
            logEvent(meetingId, participantId, 'leave', {
                end: new Date().toISOString(),
                details: 'Participant left the session',
            });
        };
    }, [meetingId, participantId]);

    const toggleMic = () => {
        setMicStatus(!micStatus);
        logEvent(meetingId, participantId, 'mic', {
            start: new Date().toISOString(),
            status: micStatus ? 'off' : 'on',
        });
    };

    const toggleWebcam = () => {
        setWebcamStatus(!webcamStatus);
        logEvent(meetingId, participantId, 'webcam', {
            start: new Date().toISOString(),
            status: webcamStatus ? 'off' : 'on',
        });
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to the Room</h1>
            <p><strong>Meeting ID:</strong> {meetingId}</p>
            <button onClick={toggleMic}>{micStatus ? 'Turn off Mic' : 'Turn on Mic'}</button>
            <button onClick={toggleWebcam}>{webcamStatus ? 'Turn off Webcam' : 'Turn on Webcam'}</button>
        </div>
    );
};

export default Room;
