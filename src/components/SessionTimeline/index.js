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

// .......................................EventIcon.......................................EventIcon.apply.......................................EventIcon.apply.........EventIcon.apply.apply.apply.apply.apply.apply.apply.apply.apply.....

import "tailwindcss/tailwind.css";
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
  ArrowRight,
} from "lucide-react";

const TimelineContainer = ({ children }) => (
  <div className="min-h-screen bg-slate-900 p-4 md:p-8 text-slate-100">
    {children}
  </div>
);

const TimeHeader = ({ timeMarkers }) => (
  <div className="relative border-b border-slate-700 pb-4 mb-6 h-8">
    {timeMarkers.map((time, index) => (
      <span
        key={index}
        className="absolute text-xs md:text-sm text-slate-400 transform -translate-x-1/2"
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
        return <Mic className="w-4 h-4 md:w-5 md:h-5" />;
      case "camera":
        return <Camera className="w-4 h-4 md:w-5 md:h-5" />;
      case "error":
        return <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-red-400" />;
      case "join":
        return <LogIn className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" />;
      case "leave":
        return <LogOut className="w-4 h-4 md:w-5 md:h-5" />;
      case "disconnect":
        return <WifiOff className="w-4 h-4 md:w-5 md:h-5 text-red-400" />;
      default:
        return null;
    }
  };

  const getBgColor = () => {
    if (type === "error" || type === "disconnect") return "bg-red-900/80";
    if (type === "join") return "bg-emerald-900/80";
    return "bg-blue-900/80";
  };

  return (
    <div
      className="absolute flex flex-col items-center transform -translate-x-1/2 group"
      style={{ left: `${offset}%` }}
    >
      <div
        className={`rounded-full p-1 ${getBgColor()} transition-all duration-200 hover:scale-110`}
      >
        {getIcon()}
      </div>
      <span className="mt-1 text-[10px] md:text-xs text-slate-400">{time}</span>
      <div className="invisible group-hover:visible absolute -top-8 bg-slate-800 text-xs text-slate-200 px-2 py-1 rounded-md whitespace-nowrap">
        {tooltip}
      </div>
    </div>
  );
};

const ParticipantTimeline = ({
  participant,
  sessionStart,
  sessionEnd,
  meetingId,
}) => {
  const navigate = useNavigate();

  const calculateOffset = (time) => {
    const eventTime = new Date(time);
    const duration = new Date(sessionEnd) - new Date(sessionStart);
    return ((eventTime - new Date(sessionStart)) / duration) * 100;
  };

  const createEventSegments = (events, bgColor) =>
    events.map((event, index) => {
      const startOffset = calculateOffset(event.start);
      const endOffset = calculateOffset(event.end);

      return (
        <div
          key={`${event.type}-${index}`}
          className={`absolute h-full ${bgColor} top-0 z-10 transition-opacity duration-200 hover:opacity-80`}
          style={{
            left: `${startOffset}%`,
            width: `${endOffset - startOffset}%`,
          }}
        />
      );
    });

  const createPresenceSegment = () => {
    const joinTime = participant.joinTime;
    const leaveTime = participant.leaveTime || sessionEnd;
    const startOffset = calculateOffset(joinTime);
    const endOffset = calculateOffset(leaveTime);

    return (
      <div
        className="absolute h-full bg-emerald-500/30 top-0 z-0"
        style={{
          left: `${startOffset}%`,
          width: `${endOffset - startOffset}%`,
        }}
      />
    );
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-slate-300">
          {participant.name || "Unknown Participant"}
        </h3>
        <button
          onClick={() =>
            navigate(
              `/session/${meetingId}/participant/${participant.participantId}`,
              {
                state: { participant },
              }
            )
          }
          className="px-3 py-1.5 text-xs flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md transition-colors duration-200 border border-slate-700"
        >
          View Details
          <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
        </button>
      </div>
      <div className="relative h-1.5 bg-slate-800 rounded-full">
        {createPresenceSegment()}
        {createEventSegments(participant.events.mic, "bg-blue-500/70")}
        {createEventSegments(participant.events.webcam, "bg-purple-500/70")}

        <EventIcon
          type="join"
          offset={calculateOffset(participant.joinTime)}
          time={new Date(participant.joinTime).toLocaleTimeString()}
          tooltip={`Joined: ${participant.name}`}
        />

        {participant.leaveTime && (
          <EventIcon
            type="leave"
            offset={calculateOffset(participant.leaveTime)}
            time={new Date(participant.leaveTime).toLocaleTimeString()}
            tooltip={`Left: ${participant.name}`}
          />
        )}

        {participant.events.mic.map((event, index) => (
          <EventIcon
            key={`mic-${index}`}
            type="mic"
            offset={calculateOffset(event.start)}
            time={new Date(event.start).toLocaleTimeString()}
            tooltip={`${event.type === "mute" ? "Muted" : "Unmuted"}: ${
              participant.name
            }`}
          />
        ))}

        {participant.events.webcam.map((event, index) => (
          <EventIcon
            key={`camera-${index}`}
            type="camera"
            offset={calculateOffset(event.start)}
            time={new Date(event.start).toLocaleTimeString()}
            tooltip={`Camera ${event.type === "off" ? "Off" : "On"}: ${
              participant.name
            }`}
          />
        ))}

        {participant.events.errors?.map((error, index) => (
          <EventIcon
            key={`error-${index}`}
            type="error"
            offset={calculateOffset(error.timestamp)}
            time={new Date(error.timestamp).toLocaleTimeString()}
            tooltip={`Error: ${error.message}`}
          />
        ))}

        {participant.events.disconnections?.map((disconnect, index) => (
          <EventIcon
            key={`disconnect-${index}`}
            type="disconnect"
            offset={calculateOffset(disconnect.timestamp)}
            time={new Date(disconnect.timestamp).toLocaleTimeString()}
            tooltip={`Disconnected: ${disconnect.reason}`}
          />
        ))}
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
      <div className="flex justify-center items-center h-screen bg-slate-900">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-slate-900">
        <div className="bg-red-500/20 border border-red-500 text-red-100 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="p-4 bg-slate-900">
        <h2 className="text-xl font-semibold text-slate-200">
          No session found
        </h2>
      </div>
    );
  }

  const timeMarkers = [
    { label: new Date(session.start).toLocaleTimeString(), offset: 0 },
    { label: new Date(session.end).toLocaleTimeString(), offset: 100 },
  ];

  return (
    <TimelineContainer>
      <h1 className="mb-6 text-lg md:text-xl font-semibold text-slate-100">
        Participant Event Timeline
      </h1>
      <TimeHeader timeMarkers={timeMarkers} />
      {session.participantArray.map((participant) => (
        <ParticipantTimeline
          key={participant.participantId}
          participant={participant}
          sessionStart={session.start}
          sessionEnd={session.end || new Date().toISOString()}
          meetingId={meetingId}
        />
      ))}
    </TimelineContainer>
  );
};

export default SessionTimeline;

// import "tailwindcss/tailwind.css";

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { fetchSessionDetails } from "../../Api/api";
// import {
//   Camera,
//   Mic,
//   AlertCircle,
//   LogIn,
//   LogOut,
//   WifiOff,
//   ArrowRight,
// } from "lucide-react";

// // Helper function to validate and parse dates
// const parseDate = (dateString) => {
//   const date = new Date(dateString);
//   return isNaN(date.getTime()) ? new Date() : date;
// };

// const TimelineContainer = ({ children }) => (
//   <div className="min-h-screen bg-gray-900 p-8 text-white">{children}</div>
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
//         return <Mic size={24} strokeWidth={2} className="text-blue-500" />;
//       case "camera":
//         return <Camera size={24} strokeWidth={2} className="text-purple-500" />;
//       case "error":
//         return <AlertCircle size={24} strokeWidth={2} className="text-red-600" />;
//       case "join":
//         return <LogIn size={24} strokeWidth={2} className="text-green-600" />;
//       case "leave":
//         return <LogOut size={24} strokeWidth={2} className="text-gray-600" />;
//       case "disconnect":
//         return <WifiOff size={24} strokeWidth={2} className="text-red-600" />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div
//       className="absolute flex flex-col items-center transform -translate-x-1/2"
//       style={{ left: `${offset}%`, zIndex: 20 }} // Add z-index here
//       title={tooltip || time}
//     >
//       <div className="rounded-full bg-black p-1">{getIcon()}</div>
//       <span className="mt-1 text-xs text-gray-300">{time}</span>
//     </div>
//   );
// };

// const ParticipantTimeline = ({
//   participant,
//   meetingId,
//   sessionStart,
//   sessionEnd,
// }) => {
//   const navigate = useNavigate();

//   const calculateOffset = (timeString) => {
//     const eventTime = parseDate(timeString);
//     const duration = parseDate(sessionEnd) - parseDate(sessionStart);
//     return duration <= 0
//       ? 0
//       : ((eventTime - parseDate(sessionStart)) / duration) * 100;
//   };

//   const handleViewDetails = () => {
// navigate(`/session/${meetingId}/participant/${participant.participantId}`, {
//   state: { participant },
//     });
//   };

//   const getParticipantTimeRange = () => {
//     if (participant.timelog && participant.timelog.length > 0) {
//       const firstJoin = participant.timelog[0].start;
//       const lastLeave = participant.timelog[participant.timelog.length - 1].end;
//       return {
//         joinTime: firstJoin,
//         leaveTime: lastLeave,
//       };
//     }
//     return {
//       joinTime: sessionStart,
//       leaveTime: sessionEnd,
//     };
//   };

//   const timeRange = getParticipantTimeRange();

//   const createEventSegments = (events, bgColor) =>
//     events.map((event, index) => {
//       const startOffset = calculateOffset(event.start);
//       const endOffset = calculateOffset(event.end);

//       return (
//         <div
//           key={`${event.type}-${index}`}
//           className={`absolute h-full ${bgColor} top-0 z-10 rounded-full`} // Set z-index to 10 to keep icons on top
//           style={{
//             left: `${startOffset}%`,
//             width: `${Math.max(0, endOffset - startOffset)}%`,
//           }}
//         />
//       );
//     });

//   const createPresenceSegment = () => {
//     const startOffset = calculateOffset(timeRange.joinTime);
//     const endOffset = calculateOffset(timeRange.leaveTime || sessionEnd);

//     return (
//       <div
//         className="absolute h-full bg-green-500 opacity-30 top-0 z-0"
//         style={{
//           left: `${startOffset}%`,
//           width: `${Math.max(0, endOffset - startOffset)}%`,
//         }}
//       />
//     );
//   };

//   if (
//     !participant.events ||
//     (!participant.timelog?.length &&
//       !Object.values(participant.events).some((arr) => arr.length))
//   ) {
//     return null;
//   }

//   return (
//     <div className="mb-8">
//       <div className="flex items-center justify-between group">
//         <div className="flex-1">
//           <h3 className="mb-2 text-sm font-semibold text-gray-300">
//             {participant.name || "Unknown Participant"}
//           </h3>
//           <div className="relative h-1 bg-gray-700">
//             {createPresenceSegment()}
//             {createEventSegments(participant.events.mic || [], "bg-blue-500")}
//             {createEventSegments(
//               participant.events.webcam || [],
//               "bg-purple-500"
//             )}

//             <EventIcon
//               type="join"
//               offset={calculateOffset(timeRange.joinTime)}
//               time={parseDate(timeRange.joinTime).toLocaleTimeString()}
//               tooltip={`Joined: ${participant.name}`}
//             />

//             {timeRange.leaveTime && (
//               <EventIcon
//                 type="leave"
//                 offset={calculateOffset(timeRange.leaveTime)}
//                 time={parseDate(timeRange.leaveTime).toLocaleTimeString()}
//                 tooltip={`Left: ${participant.name}`}
//               />
//             )}

//             {participant.events.error?.map((errorEvent, index) => (
//               <EventIcon
//                 key={`error-${index}`}
//                 type="error"
//                 offset={calculateOffset(errorEvent.time)}
//                 time={parseDate(errorEvent.time).toLocaleTimeString()}
//                 tooltip={errorEvent.message || "Error occurred"}
//               />
//             ))}

//             {participant.events.disconnect?.map((disconnectEvent, index) => (
//               <EventIcon
//                 key={`disconnect-${index}`}
//                 type="disconnect"
//                 offset={calculateOffset(disconnectEvent.time)}
//                 time={parseDate(disconnectEvent.time).toLocaleTimeString()}
//                 tooltip="Disconnected"
//               />
//             ))}
//           </div>
//         </div>

//         <button
//           onClick={handleViewDetails}
//           className="flex items-center text-white opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none"
//         >
//           <span className="mr-2 text-sm hover:text-blue-400 transition-colors duration-200">
//             View Details
//           </span>
//           <ArrowRight size={16} strokeWidth={1.5} />
//         </button>
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

//         if (data) {
//           // Parse session start and end times
//           data.start = parseDate(data.start);
//           data.end = parseDate(data.end || new Date());

//           // Filter and prepare participant data
//           data.participantArray = data.participantArray.filter(
//             (participant, index, self) => {
//               // Ensure participant has unique ID and valid events or time logs
//               const hasValidEvents = Object.values(participant.events || {}).some(
//                 (arr) => arr.length > 0
//               );
//               const isUnique = index === self.findIndex(
//                 (p) => p.participantId === participant.participantId
//               );
//               return participant.participantId && isUnique && (participant.timelog?.length > 0 || hasValidEvents);
//             }
//           );

//           // Normalize participant events for consistency
//           data.participantArray.forEach((participant) => {
//             participant.events = participant.events || {};
//             participant.events.error = participant.events.error || [];
//             participant.events.disconnect = participant.events.disconnect || [];
//           });
//         }

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
//         <div className="bg-red-500 text-white p-4 rounded-md">{error}</div>
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

//   // Generate time markers for the session timeline
//   const timeMarkers = Array.from({ length: 11 }, (_, i) => ({
//     offset: i * 10,
//     label: new Date(
//       session.start.getTime() + (i * (session.end.getTime() - session.start.getTime())) / 10
//     ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
//   }));

//   return (
//     <TimelineContainer>
//       <h2 className="text-xl mb-4">Session Timeline</h2>
//       <TimeHeader timeMarkers={timeMarkers} />
//       {session.participantArray.map((participant) => (
//         <ParticipantTimeline
//           key={participant.participantId}
//           participant={participant}
//           meetingId={meetingId}
//           sessionStart={session.start}
//           sessionEnd={session.end}
//         />
//       ))}
//     </TimelineContainer>
//   );
// };

// export default SessionTimeline;
