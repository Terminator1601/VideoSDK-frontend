// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { fetchSessionDetails } from "../../Api/api";
// import {
//   Box,
//   Typography,
//   Grid,
//   Paper,
//   CircularProgress,
//   Alert,
// } from "@mui/material";

// const SessionTimelineVisualization = ({ participant }) => {
//   const sessionStart = new Date(participant.sessionStart);
//   const sessionEnd = new Date(participant.sessionEnd);
//   const totalSessionDuration = sessionEnd - sessionStart;

//   const calculateTimelinePosition = (eventStart, eventEnd) => {
//     const start = new Date(eventStart);
//     const end = new Date(eventEnd);
//     const startPercentage =
//       ((start - sessionStart) / totalSessionDuration) * 100;
//     const widthPercentage = ((end - start) / totalSessionDuration) * 100;

//     return {
//       left: `${startPercentage}%`,
//       width: `${widthPercentage}%`,
//     };
//   };

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         height: 80,
//         position: "relative",
//         border: "1px solid #e0e0e0",
//         borderRadius: 2,
//         overflow: "hidden",
//       }}
//     >
//       <Box
//         sx={{
//           position: "absolute",
//           top: "50%",
//           left: 0,
//           right: 0,
//           height: 4,
//           backgroundColor: "#e0e0e0",
//           transform: "translateY(-50%)",
//         }}
//       />
//       {participant.events.mic.map((micEvent, index) => (
//         <Box
//           key={`mic-${index}`}
//           sx={{
//             position: "absolute",
//             top: "30%",
//             height: 10,
//             backgroundColor: "primary.main",
//             borderRadius: 1,
//             ...calculateTimelinePosition(micEvent.start, micEvent.end),
//           }}
//         />
//       ))}
//       {participant.events.webcam.map((webcamEvent, index) => (
//         <Box
//           key={`webcam-${index}`}
//           sx={{
//             position: "absolute",
//             top: "60%",
//             height: 10,
//             backgroundColor: "secondary.main",
//             borderRadius: 1,
//             ...calculateTimelinePosition(webcamEvent.start, webcamEvent.end),
//           }}
//         />
//       ))}
//       <Typography
//         variant="caption"
//         sx={{
//           position: "absolute",
//           left: 0,
//           bottom: 0,
//           p: 0.5,
//         }}
//       >
//         {sessionStart.toLocaleTimeString()}
//       </Typography>
//       <Typography
//         variant="caption"
//         sx={{
//           position: "absolute",
//           right: 0,
//           bottom: 0,
//           p: 0.5,
//         }}
//       >
//         {sessionEnd.toLocaleTimeString()}
//       </Typography>
//     </Box>
//   );
// };

// const SessionTimeline = () => {
//   const { meetingId } = useParams();
//   const [session, setSession] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const loadSessionDetails = async () => {
//     try {
//       setLoading(true);
//       const data = await fetchSessionDetails(meetingId);
//       setSession(data);
//       setError(null);
//     } catch (err) {
//       setError(err.message || "Failed to load session details");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadSessionDetails();
//   }, [meetingId]);

//   if (loading) {
//     return (
//       <Box
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         height="100vh"
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box padding="20px">
//         <Alert severity="error">{error}</Alert>
//       </Box>
//     );
//   }

//   if (!session) {
//     return (
//       <Box padding="20px">
//         <Typography variant="h6">No session found</Typography>
//       </Box>
//     );
//   }

//   const sanitizeEvents = (participant) => ({
//     mic: participant.events?.mic || [],
//     webcam: participant.events?.webcam || [],
//   });

//   return (
//     <Box padding="20px">
//       <Grid container spacing={3}>
//         <Grid item xs={12}>
//           <Paper elevation={3} sx={{ padding: "20px" }}>
//             <Typography variant="h6" gutterBottom>
//               Participant Event Timeline
//             </Typography>
//             {session.participantArray.map((participant) => {
//               const events = sanitizeEvents(participant);
//               const participantTimelineData = {
//                 ...participant,
//                 sessionStart: session.start,
//                 sessionEnd: session.end || new Date().toISOString(),
//                 events,
//               };

//               return (
//                 <Box key={participant.participantId} mb={3}>
//                   <Typography variant="subtitle1" gutterBottom>
//                     {participant.name || "Unknown Participant"}
//                   </Typography>
//                   <SessionTimelineVisualization
//                     participant={participantTimelineData}
//                   />
//                 </Box>
//               );
//             })}
//           </Paper>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default SessionTimeline;













// =======================================================================================================================





































import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSessionDetails } from "../../Api/api";
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  Mic as MicIcon,
  VideocamOutlined as CameraIcon,
  ExitToApp as ExitIcon,
  Warning as WarningIcon,
  Loop as RefreshIcon,
} from "@mui/icons-material";

const TimelineContainer = ({ children }) => (
  <Paper
    sx={{
      bgcolor: "grey.900",
      minHeight: "100vh",
      p: 4,
      color: "common.white",
    }}
  >
    {children}
  </Paper>
);

const TimeHeader = ({ timeMarkers }) => (
  <Box
    sx={{
      position: "relative",
      borderBottom: "2px solid",
      borderColor: "grey.600",
      pb: 2,
      mb: 3,
      height: "32px",
    }}
  >
    {timeMarkers.map((time, index) => (
      <Typography
        key={index}
        variant="caption"
        sx={{
          position: "absolute",
          left: `${time.offset}%`,
          transform: "translateX(-50%)",
          color: "grey.400",
        }}
      >
        {time.label}
      </Typography>
    ))}
  </Box>
);

const EventIcon = ({ type, offset, time }) => {
  const getIcon = () => {
    switch (type) {
      case "mic":
        return <MicIcon />;
      case "camera":
        return <CameraIcon />;
      case "exit":
        return <ExitIcon />;
      case "warning":
        return <WarningIcon />;
      case "reconnect":
        return <RefreshIcon />;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        left: `${offset}%`,
        transform: "translateX(-50%)",
        "& .MuiSvgIcon-root": {
          bgcolor: "primary.main",
          borderRadius: "50%",
          p: 0.5,
          width: 24,
          height: 24,
          color: "common.white",
        },
      }}
    >
      {getIcon()}
      <Typography
        variant="caption"
        sx={{
          mt: 0.5,
          color: "grey.400",
        }}
      >
        {time}
      </Typography>
    </Box>
  );
};

const ParticipantTimeline = ({ participant, sessionStart, sessionEnd }) => {
  const calculateOffset = (time) => {
    const eventTime = new Date(time);
    const duration = new Date(sessionEnd) - new Date(sessionStart);
    return ((eventTime - new Date(sessionStart)) / duration) * 100;
  };

  const events = [];

  // Add mic events
  participant.events.mic.forEach((event) => {
    events.push({
      type: "mic",
      time: new Date(event.start).toLocaleTimeString(),
      offset: calculateOffset(event.start),
    });
  });

  // Add webcam events
  participant.events.webcam.forEach((event) => {
    events.push({
      type: "camera",
      time: new Date(event.start).toLocaleTimeString(),
      offset: calculateOffset(event.start),
    });
  });

  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="subtitle2"
        sx={{ mb: 1, color: "grey.300" }}
      >
        {participant.name || "Unknown Participant"}
      </Typography>
      <Box sx={{ position: "relative", height: "48px" }}>
        <Box
          sx={{
            position: "absolute",
            height: "4px",
            bgcolor: "primary.main",
            left: "0%",
            width: "100%",
          }}
        />
        {events.map((event, index) => (
          <EventIcon
            key={index}
            type={event.type}
            offset={event.offset}
            time={event.time}
          />
        ))}
      </Box>
    </Box>
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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!session) {
    return (
      <Box p={2}>
        <Typography variant="h6">No session found</Typography>
      </Box>
    );
  }

  const timeMarkers = [
    { label: new Date(session.start).toLocaleTimeString(), offset: 0 },
    { label: new Date(session.end).toLocaleTimeString(), offset: 100 },
  ];

  return (
    <TimelineContainer>
      <Typography variant="h6" sx={{ mb: 3, color: "common.white" }}>
        Participant Event Timeline
      </Typography>
      <TimeHeader timeMarkers={timeMarkers} />
      {session.participantArray.map((participant) => (
        <ParticipantTimeline
          key={participant.participantId}
          participant={participant}
          sessionStart={session.start}
          sessionEnd={session.end || new Date().toISOString()}
        />
      ))}
    </TimelineContainer>
  );
};

export default SessionTimeline;





















// =======================================================================================================================

// import React from "react";
// import { Box, Typography, Paper } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import CameraAltIcon from "@mui/icons-material/CameraAlt";
// import MicIcon from "@mui/icons-material/Mic";
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import WarningIcon from "@mui/icons-material/Warning";
// import LoopIcon from "@mui/icons-material/Loop";
// // import SessionTimelineVisualization from "../SessionTimelineVisualization/index";

// // Sample Data
// const participants = [
//   {
//     name: "Arjun Kava (ABC001)",
//     sessions: [
//       {
//         startTime: "12:00",
//         endTime: "12:20",
//         events: [
//           { type: "camera", time: "12:00", icon: "camera" },
//           { type: "mic", time: "12:01", icon: "mic" },
//           { type: "exit", time: "12:20", icon: "exit" },
//         ],
//       },
//     ],
//   },
//   {
//     name: "Nikhil Chavda (ABC002)",
//     sessions: [
//       {
//         startTime: "12:01",
//         endTime: "12:20",
//         events: [
//           { type: "camera", time: "12:01", icon: "camera" },
//           { type: "mic", time: "12:02", icon: "mic" },
//           { type: "disconnect", time: "12:10", icon: "warning" },
//           { type: "reconnect", time: "12:12", icon: "loop" },
//           { type: "exit", time: "12:20", icon: "exit" },
//         ],
//       },
//     ],
//   },
//   {
//     name: "Ahmed Bhesaniya (ABC003)",
//     sessions: [
//       {
//         startTime: "12:05",
//         endTime: "12:20",
//         events: [
//           { type: "camera", time: "12:05", icon: "camera" },
//           { type: "mic", time: "12:06", icon: "mic" },
//           { type: "disconnect", time: "12:18", icon: "warning" },
//         ],
//       },
//     ],
//   },
// ];

// // Styled Components
// const TimelineContainer = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(4),
//   backgroundColor: theme.palette.grey[900],
//   minHeight: "100vh",
//   color: theme.palette.common.white,
// }));

// const TimeHeader = styled(Box)(({ theme }) => ({
//   position: "relative",
//   borderBottom: `2px solid ${theme.palette.grey[600]}`,
//   paddingBottom: theme.spacing(2),
//   marginBottom: theme.spacing(3),
//   height: "30px",
// }));

// const TimeMarker = styled(Typography)(({ theme }) => ({
//   position: "absolute",
//   transform: "translateX(-50%)",
//   color: theme.palette.grey[400],
//   fontSize: "0.875rem",
// }));

// const SessionLine = styled(Box)(({ theme }) => ({
//   position: "absolute",
//   height: "4px",
//   backgroundColor: theme.palette.primary.main,
// }));

// const EventIcon = styled(Box)(({ theme }) => ({
//   position: "absolute",
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   transform: "translateX(-50%)",
//   "& .MuiSvgIcon-root": {
//     backgroundColor: theme.palette.primary.main,
//     borderRadius: "50%",
//     padding: "4px",
//     width: "24px",
//     height: "24px",
//     color: theme.palette.common.white,
//   },
// }));

// // Helper Functions
// const calculateTimeRange = (participants) => {
//   const times = [];
//   participants.forEach((participant) =>
//     participant.sessions.forEach((session) => {
//       times.push(session.startTime, session.endTime);
//       session.events.forEach((event) => times.push(event.time));
//     })
//   );
//   return [...new Set(times)].sort();
// };

// const calculateOffset = (time, minTime, maxTime) => {
//   const [minHour, minMinute] = minTime.split(":").map(Number);
//   const [maxHour, maxMinute] = maxTime.split(":").map(Number);
//   const [eventHour, eventMinute] = time.split(":").map(Number);

//   const totalMinutes = (maxHour - minHour) * 60 + (maxMinute - minMinute);
//   const eventMinutes = (eventHour - minHour) * 60 + (eventMinute - minMinute);

//   return (eventMinutes / totalMinutes) * 100;
// };

// const getIconComponent = (iconType) => {
//   switch (iconType) {
//     case "camera":
//       return <CameraAltIcon />;
//     case "mic":
//       return <MicIcon />;
//     case "exit":
//       return <ExitToAppIcon />;
//     case "warning":
//       return <WarningIcon />;
//     case "loop":
//       return <LoopIcon />;
//     default:
//       return null;
//   }
// };

// const Timeline = () => {
//   const timeRange = calculateTimeRange(participants);
//   const minTime = timeRange[0];
//   const maxTime = timeRange[timeRange.length - 1];

//   return (
//     <TimelineContainer elevation={3}>
//       {/* Time Header */}
//       <TimeHeader>
//         {timeRange.map((time, index) => (
//           <TimeMarker
//             key={index}
//             sx={{ left: `${calculateOffset(time, minTime, maxTime)}%` }}
//             variant="caption"
//           >
//             {time}
//           </TimeMarker>
//         ))}
//       </TimeHeader>
//       {/* Participant Timelines */}
//       {participants.map((participant, index) => (
//         <Box key={index} sx={{ mb: 4 }}>
//           <Typography variant="subtitle2" sx={{ mb: 1, color: "grey.300" }}>
//             {participant.name}
//           </Typography>

//           {participant.sessions.map((session, sessionIndex) => (
//             <Box
//               key={sessionIndex}
//               sx={{ position: "relative", height: "48px" }}
//             >
//               {/* Session Line */}
//               <SessionLine
//                 sx={{
//                   left: `${calculateOffset(
//                     session.startTime,
//                     minTime,
//                     maxTime
//                   )}%`,
//                   width: `${
//                     calculateOffset(session.endTime, minTime, maxTime) -
//                     calculateOffset(session.startTime, minTime, maxTime)
//                   }%`,
//                 }}
//               />

//               {/* Event Icons */}
//               {session.events.map((event, eventIndex) => (
//                 <EventIcon
//                   key={eventIndex}
//                   sx={{
//                     left: `${calculateOffset(event.time, minTime, maxTime)}%`,
//                   }}
//                 >
//                   {getIconComponent(event.icon)}
//                   <Typography
//                     variant="caption"
//                     sx={{ mt: 0.5, color: "grey.400" }}
//                   >
//                     {event.time}
//                   </Typography>
//                 </EventIcon>
//               ))}
//             </Box>
//           ))}
//         </Box>
//       ))}
//     </TimelineContainer>
//   );
// };

// export default Timeline;
