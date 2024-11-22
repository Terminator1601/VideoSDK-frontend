// import "tailwindcss/tailwind.css"
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { fetchSessionDetails } from "../../Api/api";
// import {
//   Camera,
//   Mic,
//   AlertCircle,
//   LogIn,
//   LogOut,
//   WifiOff
// } from "lucide-react";

// const TimelineContainer = ({ children }) => (
//   <div className="min-h-screen bg-gray-900 p-8 text-white">
//     {children}
//   </div>
// );

// const TimeHeader = ({ timeMarkers }) => (
//   <div className="relative border-b-2 border-gray-600 pb-4 mb-6 h-8">
//     {timeMarkers.map((time, index) => (
//       <span
//         key={index}
//         className="absolute text-sm text-gray-400 transform -translate-x-1/2"
//         style={{ left: `${time.offset}%` }}
//       >
//         {time.label}
//       </span>
//     ))}
//   </div>
// );

// const EventIcon = ({ type, offset, time, tooltip }) => {
//   const getIcon = () => {
//     switch (type) {
//       case "mic":
//         return <Mic className="w-6 h-6" />;
//       case "camera":
//         return <Camera className="w-6 h-6" />;
//       case "error":
//         return <AlertCircle className="w-6 h-6 text-red-500" />;
//       case "join":
//         return <LogIn className="w-6 h-6 text-green-500" />;
//       case "leave":
//         return <LogOut className="w-6 h-6" />;
//       case "disconnect":
//         return <WifiOff className="w-6 h-6 text-red-500" />;
//       default:
//         return null;
//     }
//   };

//   const getBgColor = () => {
//     if (type === "error" || type === "disconnect") return "bg-red-800";
//     if (type === "join") return "bg-green-800";
//     return "bg-blue-800";
//   };

//   return (
//     <div
//       className="absolute flex flex-col items-center transform -translate-x-1/2"
//       style={{ left: `${offset}%` }}
//       title={tooltip || time}
//     >
//       <div className={`rounded-full p-1 ${getBgColor()}`}>
//         {getIcon()}
//       </div>
//       <span className="mt-1 text-xs text-gray-400">
//         {time}
//       </span>
//     </div>
//   );
// };

// const ParticipantTimeline = ({ participant, sessionStart, sessionEnd }) => {
//   const calculateOffset = (time) => {
//     const eventTime = new Date(time);
//     const duration = new Date(sessionEnd) - new Date(sessionStart);
//     return ((eventTime - new Date(sessionStart)) / duration) * 100;
//   };

//   const createEventSegments = (events, bgColor) =>
//     events.map((event, index) => {
//       const startOffset = calculateOffset(event.start);
//       const endOffset = calculateOffset(event.end);

//       return (
//         <div
//           key={`${event.type}-${index}`}
//           className={`absolute h-full ${bgColor} top-0 z-10`}
//           style={{
//             left: `${startOffset}%`,
//             width: `${endOffset - startOffset}%`
//           }}
//         />
//       );
//     });

//   const createPresenceSegment = () => {
//     const joinTime = participant.joinTime;
//     const leaveTime = participant.leaveTime || sessionEnd;
//     const startOffset = calculateOffset(joinTime);
//     const endOffset = calculateOffset(leaveTime);

//     return (
//       <div
//         className="absolute h-full bg-green-500 opacity-30 top-0 z-0"
//         style={{
//           left: `${startOffset}%`,
//           width: `${endOffset - startOffset}%`
//         }}
//       />
//     );
//   };

//   return (
//     <div className="mb-8">
//       <h3 className="mb-2 text-sm font-semibold text-gray-300">
//         {participant.name || "Unknown Participant"}
//       </h3>
//       <div className="relative h-1 bg-gray-700">
//         {createPresenceSegment()}
//         {createEventSegments(participant.events.mic, "bg-blue-500")}
//         {createEventSegments(participant.events.webcam, "bg-purple-500")}

//         <EventIcon
//           type="join"
//           offset={calculateOffset(participant.joinTime)}
//           time={new Date(participant.joinTime).toLocaleTimeString()}
//           tooltip={`Joined: ${participant.name}`}
//         />

//         {participant.leaveTime && (
//           <EventIcon
//             type="leave"
//             offset={calculateOffset(participant.leaveTime)}
//             time={new Date(participant.leaveTime).toLocaleTimeString()}
//             tooltip={`Left: ${participant.name}`}
//           />
//         )}

//         {participant.events.mic.map((event, index) => (
//           <EventIcon
//             key={`mic-${index}`}
//             type="mic"
//             offset={calculateOffset(event.start)}
//             time={new Date(event.start).toLocaleTimeString()}
//             tooltip={`${event.type === 'mute' ? 'Muted' : 'Unmuted'}: ${participant.name}`}
//           />
//         ))}

//         {participant.events.webcam.map((event, index) => (
//           <EventIcon
//             key={`camera-${index}`}
//             type="camera"
//             offset={calculateOffset(event.start)}
//             time={new Date(event.start).toLocaleTimeString()}
//             tooltip={`Camera ${event.type === 'off' ? 'Off' : 'On'}: ${participant.name}`}
//           />
//         ))}

//         {participant.events.errors?.map((error, index) => (
//           <EventIcon
//             key={`error-${index}`}
//             type="error"
//             offset={calculateOffset(error.timestamp)}
//             time={new Date(error.timestamp).toLocaleTimeString()}
//             tooltip={`Error: ${error.message}`}
//           />
//         ))}

//         {participant.events.disconnections?.map((disconnect, index) => (
//           <EventIcon
//             key={`disconnect-${index}`}
//             type="disconnect"
//             offset={calculateOffset(disconnect.timestamp)}
//             time={new Date(disconnect.timestamp).toLocaleTimeString()}
//             tooltip={`Disconnected: ${disconnect.reason}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// const SessionTimeline = () => {
//   const { meetingId } = useParams();
//   const [session, setSession] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const loadSessionDetails = async () => {
//       try {
//         setLoading(true);
//         const data = await fetchSessionDetails(meetingId);
//         setSession(data);
//         setError(null);
//       } catch (err) {
//         setError(err.message || "Failed to load session details");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadSessionDetails();
//   }, [meetingId]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-4">
//         <div className="bg-red-500 text-white p-4 rounded-md">
//           {error}
//         </div>
//       </div>
//     );
//   }

//   if (!session) {
//     return (
//       <div className="p-4">
//         <h2 className="text-xl font-semibold">No session found</h2>
//       </div>
//     );
//   }

//   const timeMarkers = [
//     { label: new Date(session.start).toLocaleTimeString(), offset: 0 },
//     { label: new Date(session.end).toLocaleTimeString(), offset: 100 },
//   ];

//   return (
//     <TimelineContainer>
//       <h1 className="mb-6 text-xl font-semibold text-white">
//         Participant Event Timeline
//       </h1>
//       <TimeHeader timeMarkers={timeMarkers} />
//       {session.participantArray.map((participant) => (
//         <ParticipantTimeline
//           key={participant.participantId}
//           participant={participant}
//           sessionStart={session.start}
//           sessionEnd={session.end || new Date().toISOString()}
//         />
//       ))}
//     </TimelineContainer>
//   );
// };

// export default SessionTimeline;





import "tailwindcss/tailwind.css"

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSessionDetails } from "../../Api/api";
import {
  Camera,
  Mic,
  AlertCircle,
  LogIn,
  LogOut,
  WifiOff,
  ArrowRight
} from "lucide-react";

// Helper function to validate and parse dates
const parseDate = (dateString) => {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? new Date() : date;
};

const TimelineContainer = ({ children }) => (
  <div className="min-h-screen bg-gray-900 p-8 text-white">{children}</div>
);

const TimeHeader = ({ timeMarkers }) => (
  <div className="relative border-b-2 border-gray-600 pb-4 mb-6 h-8">
    {timeMarkers.map((time, index) => (
      <span
        key={index}
        className="absolute text-sm text-gray-400 transform -translate-x-1/2"
        style={{ left: `${time.offset}%` }}
      >
        {time.label}
      </span>
    ))}
  </div>
);

const EventIcon = ({ type, offset, time, tooltip }) => {
  const getIcon = () => {
    switch (type) {
      case "mic":
        return <Mic className="w-6 h-6" />;
      case "camera":
        return <Camera className="w-6 h-6" />;
      case "error":
        return <AlertCircle className="w-6 h-6 text-red-500" />;
      case "join":
        return <LogIn className="w-6 h-6 text-green-500" />;
      case "leave":
        return <LogOut className="w-6 h-6" />;
      case "disconnect":
        return <WifiOff className="w-6 h-6 text-red-500" />;
      default:
        return null;
    }
  };

  const getBgColor = () => {
    if (type === "error" || type === "disconnect") return "bg-red-800";
    if (type === "join") return "bg-green-800";
    return "bg-blue-800";
  };

  return (
    <div
      className="absolute flex flex-col items-center transform -translate-x-1/2"
      style={{ left: `${offset}%` }}
      title={tooltip || time}
    >
      <div className={`rounded-full p-1 ${getBgColor()}`}>{getIcon()}</div>
      <span className="mt-1 text-xs text-gray-400">{time}</span>
    </div>
  );
};

const ParticipantTimeline = ({ participant, meetingId, sessionStart, sessionEnd }) => {
  const navigate = useNavigate();

  const calculateOffset = (timeString) => {
    const eventTime = parseDate(timeString);
    const duration = parseDate(sessionEnd) - parseDate(sessionStart);
    return duration <= 0 ? 0 : ((eventTime - parseDate(sessionStart)) / duration) * 100;
  };

  const handleViewDetails = () => {
    navigate(`/session/${meetingId}/participant/${participant.participantId}`, {
      state: { participant }
    });
  };

  const getParticipantTimeRange = () => {
    if (participant.timelog && participant.timelog.length > 0) {
      const firstJoin = participant.timelog[0].start;
      const lastLeave = participant.timelog[participant.timelog.length - 1].end;
      return {
        joinTime: firstJoin,
        leaveTime: lastLeave
      };
    }
    return {
      joinTime: sessionStart,
      leaveTime: sessionEnd
    };
  };

  const timeRange = getParticipantTimeRange();

  const createEventSegments = (events, bgColor) =>
    events.map((event, index) => {
      const startOffset = calculateOffset(event.start);
      const endOffset = calculateOffset(event.end);

      return (
        <div
          key={`${event.type}-${index}`}
          className={`absolute h-full ${bgColor} top-0 z-10 rounded-full`}
          style={{
            left: `${startOffset}%`,
            width: `${Math.max(0, endOffset - startOffset)}%`
          }}
        />
      );
    });

  const createPresenceSegment = () => {
    const startOffset = calculateOffset(timeRange.joinTime);
    const endOffset = calculateOffset(timeRange.leaveTime || sessionEnd);

    return (
      <div
        className="absolute h-full bg-green-500 opacity-30 top-0 z-0"
        style={{
          left: `${startOffset}%`,
          width: `${Math.max(0, endOffset - startOffset)}%`
        }}
      />
    );
  };

  if (!participant.events || (!participant.timelog?.length && !Object.values(participant.events).some(arr => arr.length))) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between group">
        <div className="flex-1">
          <h3 className="mb-2 text-sm font-semibold text-gray-300">
            {participant.name || "Unknown Participant"}
          </h3>
          <div className="relative h-1 bg-gray-700">
            {createPresenceSegment()}
            {createEventSegments(participant.events.mic || [], "bg-blue-500")}
            {createEventSegments(participant.events.webcam || [], "bg-purple-500")}

            <EventIcon
              type="join"
              offset={calculateOffset(timeRange.joinTime)}
              time={parseDate(timeRange.joinTime).toLocaleTimeString()}
              tooltip={`Joined: ${participant.name}`}
            />

            {timeRange.leaveTime && (
              <EventIcon
                type="leave"
                offset={calculateOffset(timeRange.leaveTime)}
                time={parseDate(timeRange.leaveTime).toLocaleTimeString()}
                tooltip={`Left: ${participant.name}`}
              />
            )}
          </div>
        </div>

        <button
          onClick={handleViewDetails}
          className="flex items-center text-gray-400 hover:text-white transition-colors duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none"
        >
          <span className="mr-2 text-sm">View Details</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const SessionTimeline = () => {
  const { meetingId } = useParams();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSessionDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchSessionDetails(meetingId);

        if (data) {
          data.start = parseDate(data.start);
          data.end = parseDate(data.end || new Date());

          data.participantArray = data.participantArray.filter(
            (participant, index, self) =>
              participant.participantId &&
              index === self.findIndex((p) => p.participantId === participant.participantId) &&
              (participant.timelog?.length > 0 || Object.values(participant.events).some((arr) => arr.length))
          );
        }

        setSession(data);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to load session details");
      } finally {
        setLoading(false);
      }
    };

    loadSessionDetails();
  }, [meetingId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-500 text-white p-4 rounded-md">{error}</div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold">No session found</h2>
      </div>
    );
  }

  const timeMarkers = Array.from({ length: 11 }, (_, i) => ({
    offset: i * 10,
    label: new Date(
      session.start.getTime() + (i * (session.end.getTime() - session.start.getTime())) / 10
    ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }));

  return (
    <TimelineContainer>
      <h2 className="text-xl mb-4">Session Timeline</h2>
      <TimeHeader timeMarkers={timeMarkers} />
      {session.participantArray.map((participant) => (
        <ParticipantTimeline
          key={participant.participantId}
          participant={participant}
          meetingId={meetingId}
          sessionStart={session.start}
          sessionEnd={session.end}
        />
      ))}
    </TimelineContainer>
  );
};

export default SessionTimeline;