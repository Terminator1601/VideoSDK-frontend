// // Timeline.js
// import React from 'react';
// import './Timeline.css';

// const participants = [
//   {
//     name: 'Arjun Kava (ABC001)',
//     date: '11 July 2024, 11:59',
//     duration: '20 Mins',
//     start: '12:00',
//     end: '12:20',
//     sessionDetails: 1,
//   },
//   {
//     name: 'Nikhil Chavda (ABC002)',
//     date: '11 July 2024, 11:59',
//     duration: '20 Mins',
//     start: '12:01',
//     end: '12:21',
//     sessionDetails: 3,
//   },
//   {
//     name: 'Ahmed Bhesaniya (ABC003)',
//     date: '11 July 2024, 11:59',
//     duration: '20 Mins',
//     start: '12:02',
//     end: '12:22',
//     sessionDetails: 2,
//   },
// ];

// const Timeline = () => {
//   return (
//     <div className="timeline-container">
//       <h2>Participants wise Session Timeline</h2>
//       <div className="timeline">
//         {participants.map((participant, index) => (
//           <div key={index} className="timeline-row">
//             <div className="participant-info">
//               <span>{participant.name}</span>
//               <span>{participant.date}</span>
//               <span>{participant.duration}</span>
//             </div>
//             <div className="timeline-bar">
//               <div
//                 className="session"
//                 style={{
//                   left: `${(parseInt(participant.start.split(':')[1]) - 59) * 10}px`,
//                   width: `${(parseInt(participant.duration.split(' ')[0]) * 10)}px`,
//                 }}
//               >
//                 <span className="session-details">{participant.sessionDetails}</span>
//               </div>
//             </div>
//             <div className="details">
//               <button>View details</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Timeline;


// Timeline.js
import React, { useState, useEffect } from 'react';
import './Timeline.css';

const generateTimeIntervals = (startTime, endTime) => {
  const intervals = [];
  const start = new Date(startTime);
  const end = new Date(endTime);
  
  // Generate 30-minute intervals
  for (let time = start; time <= end; time.setMinutes(time.getMinutes() + 30)) {
    intervals.push(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  }
  
  return intervals;
};

const Timeline = ({ meetingId }) => {
  const [meetingData, setMeetingData] = useState(null);
  const [timeIntervals, setTimeIntervals] = useState([]);

  useEffect(() => {
    // Fetch JSON data (replace with your actual JSON file path or API call)
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/api/meetings/${meetingId}'); // Update this path
      const data = await response.json();

      // Find the meeting with the matching meetingId
      const meeting = data.find((m) => m.meetingId === meetingId);
      setMeetingData(meeting);

      if (meeting) {
        // Generate time intervals based on meeting start/end times
        const intervals = generateTimeIntervals(meeting.start, meeting.end);
        setTimeIntervals(intervals);
      }
    };

    fetchData();
  }, [meetingId]);

  if (!meetingData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="timeline-container">
      <h2>Session Timeline for Meeting: {meetingId}</h2>
      <div className="timeline">
        {/* Render time intervals */}
        <div className="time-intervals">
          {timeIntervals.map((time, index) => (
            <div key={index} className="time-interval">{time}</div>
          ))}
        </div>

        {/* Render participant sessions */}
        {meetingData.participantArray.map((participant, index) => (
          <div key={index} className="timeline-row">
            <div className="participant-info">
              <span>{participant.name}</span>
              <span>Participant ID: {participant.participantId}</span>
            </div>
            <div className="timeline-bar">
              {participant.timelog.map((log, logIndex) => {
                const startMinutes =
                  (new Date(log.start) - new Date(meetingData.start)) / (1000 * 60);
                const durationMinutes =
                  (new Date(log.end) - new Date(log.start)) / (1000 * 60);

                return (
                  <div
                    key={logIndex}
                    className="session"
                    style={{
                      left: `${startMinutes * 2}px`, // Scale factor for timeline (adjust as necessary)
                      width: `${durationMinutes * 2}px`,
                    }}
                  >
                    <span className="session-details">{index + 1}</span>
                    <span className="tooltip">{participant.name}</span>
                  </div>
                );
              })}
            </div>
            <div className="details">
              <button>View details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;