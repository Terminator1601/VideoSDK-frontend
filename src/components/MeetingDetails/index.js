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




import "tailwindcss/tailwind.css";
import React from "react";

// Sample Meeting Data
const meetingData = {
  meetingId: "k7tb-chj6-9sjp",
  start: "2024-04-02T11:31:52.746Z",
  end: "2024-04-02T11:50:23.198Z",
  uniqueParticipantsCount: 4,
  participantArray: [
    {
      participantId: "vCPSzABN",
      name: "bbbn",
      events: {
        mic: [
          { start: "2024-04-02T11:48:01.648Z", end: "2024-04-02T11:48:53.973Z" },
          { start: "2024-04-02T11:48:55.204Z", end: "2024-04-02T11:50:23.198Z" },
        ],
        webcam: [
          { start: "2024-04-02T11:48:01.773Z", end: "2024-04-02T11:50:23.198Z" },
        ],
        screenShare: [],
        screenShareAudio: [],
      },
      timelog: [
        { start: "2024-04-02T11:48:00.514Z", end: "2024-04-02T11:50:23.184Z" },
      ],
    },
    {
      participantId: "b8ddpv65",
      name: "rajan",
      events: {
        mic: [
          { start: "2024-04-02T11:32:32.073Z", end: "2024-04-02T11:32:33.637Z" },
          { start: "2024-04-02T11:32:34.167Z", end: "2024-04-02T11:39:12.377Z" },
        ],
        webcam: [
          { start: "2024-04-02T11:32:33.644Z", end: "2024-04-02T11:34:32.410Z" },
        ],
        screenShare: [],
        screenShareAudio: [],
      },
      timelog: [
        { start: "2024-04-02T11:32:31.973Z", end: "2024-04-02T11:50:16.624Z" },
      ],
    },
    {
      participantId: "yOztorht",
      name: "gvv",
      events: {
        mic: [
          { start: "2024-04-02T11:45:54.765Z", end: "2024-04-02T11:46:29.265Z" },
        ],
        webcam: [
          { start: "2024-04-02T11:45:56.468Z", end: "2024-04-02T11:47:52.094Z" },
        ],
        screenShare: [],
        screenShareAudio: [],
      },
      timelog: [
        { start: "2024-04-02T11:45:53.142Z", end: "2024-04-02T11:47:52.086Z" },
      ],
    },
  ],
};

// Helper Function
const calculateOffset = (time, start, end) => {
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();
  const currentTime = new Date(time).getTime();
  return ((currentTime - startTime) / (endTime - startTime)) * 100;
};

const Timeline = () => {
  const { start, end, participantArray } = meetingData;

  return (
    <div className="p-10 bg-gray-900 min-h-screen text-white">
      {/* Timeline Header */}
      <div className="relative border-b-2 border-gray-600 pb-4 mb-6">
        <div className="absolute left-0 text-sm text-gray-400">
          {new Date(start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
        <div className="absolute right-0 text-sm text-gray-400">
          {new Date(end).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>

      {/* Participant Timelines */}
      {participantArray.map((participant, index) => (
        <div key={index} className="relative mb-8">
          {/* Participant Info */}
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-4">
              {participant.name[0].toUpperCase()}
            </div>
            <h2 className="text-sm font-bold text-gray-300">{participant.name}</h2>
          </div>

          {/* Timeline Row */}
          <div className="relative h-8 bg-gray-800 rounded">
            {/* Timelogs */}
            {participant.timelog.map((log, logIndex) => (
              <div
                key={logIndex}
                className="absolute h-6 bg-blue-500 rounded"
                style={{
                  left: `${calculateOffset(log.start, start, end)}%`,
                  width: `${
                    calculateOffset(log.end, start, end) - calculateOffset(log.start, start, end)
                  }%`,
                }}
              ></div>
            ))}

            {/* Events */}
            {Object.entries(participant.events).map(([eventType, events]) =>
              events.map((event, eventIndex) => (
                <div
                  key={`${eventType}-${eventIndex}`}
                  className="absolute w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs"
                  style={{
                    left: `${calculateOffset(event.start, start, end)}%`,
                    top: "1px",
                  }}
                >
                  {eventType === "mic"
                    ? "🎤"
                    : eventType === "webcam"
                    ? "📷"
                    : eventType === "screenShare"
                    ? "🖥️"
                    : ""}
                </div>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
