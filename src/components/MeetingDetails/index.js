// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const MeetingDetails = () => {
//     const { meetingId } = useParams();
//     const [meetingDetails, setMeetingDetails] = useState(null);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         axios
//             .get(`http://localhost:5000/api/meetings/${meetingId}`) // GET for details
//             .then((response) => {
//                 setMeetingDetails(response.data);
//             })
//             .catch((err) => {
//                 setError('Failed to fetch meeting details');
//                 console.error(err);
//             });
//     }, [meetingId]);

//     if (error) {
//         return <p style={{ color: 'red' }}>{error}</p>;
//     }

//     if (!meetingDetails) {
//         return <p>Loading...</p>;
//     }

//     return (
//         <div>
//             <h1>Meeting Details</h1>
//             <p><strong>Meeting ID:</strong> {meetingDetails.meetingId}</p>
//             <p><strong>Start:</strong> {meetingDetails.start}</p>
//             <p><strong>End:</strong> {meetingDetails.end}</p>
//             <p><strong>Unique Participants:</strong> {meetingDetails.uniqueParticipantsCount}</p>
//             <h2>Participants</h2>
//             <ul>
//                 {meetingDetails.participantArray.map((participant) => (
//                     <li key={participant.participantId}>
//                         <p><strong>Name:</strong> {participant.name}</p>
//                         <p><strong>Mic Events:</strong></p>
//                         <ul>
//                             {participant.events.mic.map((event, index) => (
//                                 <li key={index}>
//                                     Start: {event.start}, End: {event.end}
//                                 </li>
//                             ))}
//                         </ul>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default MeetingDetails;







import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const MeetingDetails = () => {
    const { meetingId } = useParams();
    const [meetingDetails, setMeetingDetails] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/meetings/${meetingId}`) // GET for details
            .then((response) => {
                setMeetingDetails(response.data);
            })
            .catch((err) => {
                setError('Failed to fetch meeting details');
                console.error(err);
            });
    }, [meetingId]);

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (!meetingDetails) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Meeting Details</h1>
            <p><strong>Meeting ID:</strong> {meetingDetails.meetingId || "N/A"}</p>
            <p><strong>Start:</strong> {meetingDetails.start || "N/A"}</p>
            <p><strong>End:</strong> {meetingDetails.end || "N/A"}</p>
            <p><strong>Unique Participants:</strong> {meetingDetails.uniqueParticipantsCount || "N/A"}</p>
            <h2>Participants</h2>
            <ul>
                {(meetingDetails.participantArray || []).map((participant) => (
                    <li key={participant.participantId || Math.random()}>
                        <p><strong>Name:</strong> {participant.name || "N/A"}</p>
                        <p><strong>Mic Events:</strong></p>
                        <ul>
                            {(participant.events?.mic || []).map((event, index) => (
                                <li key={index}>
                                    Start: {event.start || "N/A"}, End: {event.end || "N/A"}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MeetingDetails;


