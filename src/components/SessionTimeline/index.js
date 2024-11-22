











// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { fetchSessionDetails } from "../../Api/api";
// import {
//   Box,
//   Paper,
//   Typography,
//   CircularProgress,
//   Alert,
// } from "@mui/material";
// import {
//   Mic as MicIcon,
//   VideocamOutlined as CameraIcon,
//   ExitToApp as ExitIcon,
//   Warning as WarningIcon,
//   Loop as RefreshIcon,
// } from "@mui/icons-material";

// const TimelineContainer = ({ children }) => (
//   <Paper
//     sx={{
//       bgcolor: "grey.900",
//       minHeight: "100vh",
//       p: 4,
//       color: "common.white",
//     }}
//   >
//     {children}
//   </Paper>
// );

// const TimeHeader = ({ timeMarkers }) => (
//   <Box
//     sx={{
//       position: "relative",
//       borderBottom: "2px solid",
//       borderColor: "grey.600",
//       pb: 2,
//       mb: 3,
//       height: "32px",
//     }}
//   >
//     {timeMarkers.map((time, index) => (
//       <Typography
//         key={index}
//         variant="caption"
//         sx={{
//           position: "absolute",
//           left: `${time.offset}%`,
//           transform: "translateX(-50%)",
//           color: "grey.400",
//         }}
//       >
//         {time.label}
//       </Typography>
//     ))}
//   </Box>
// );

// const EventIcon = ({ type, offset, time }) => {
//   const getIcon = () => {
//     switch (type) {
//       case "mic":
//         return <MicIcon />;
//       case "camera":
//         return <CameraIcon />;
//       case "exit":
//         return <ExitIcon />;
//       case "warning":
//         return <WarningIcon />;
//       case "reconnect":
//         return <RefreshIcon />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <Box
//       sx={{
//         position: "absolute",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         left: `${offset}%`,
//         transform: "translateX(-50%)",
//         "& .MuiSvgIcon-root": {
//           bgcolor: "primary.main",
//           borderRadius: "50%",
//           p: 0.5,
//           width: 24,
//           height: 24,
//           color: "common.white",
//         },
//       }}
//     >
//       {getIcon()}
//       <Typography
//         variant="caption"
//         sx={{
//           mt: 0.5,
//           color: "grey.400",
//         }}
//       >
//         {time}
//       </Typography>
//     </Box>
//   );
// };

// const ParticipantTimeline = ({ participant, sessionStart, sessionEnd }) => {
//   const calculateOffset = (time) => {
//     const eventTime = new Date(time);
//     const duration = new Date(sessionEnd) - new Date(sessionStart);
//     return ((eventTime - new Date(sessionStart)) / duration) * 100;
//   };

//   const events = [];

//   // Add mic events
//   participant.events.mic.forEach((event) => {
//     events.push({
//       type: "mic",
//       time: new Date(event.start).toLocaleTimeString(),
//       offset: calculateOffset(event.start),
//     });
//   });

//   // Add webcam events
//   participant.events.webcam.forEach((event) => {
//     events.push({
//       type: "camera",
//       time: new Date(event.start).toLocaleTimeString(),
//       offset: calculateOffset(event.start),
//     });
//   });

//   return (
//     <Box sx={{ mb: 4 }}>
//       <Typography
//         variant="subtitle2"
//         sx={{ mb: 1, color: "grey.300" }}
//       >
//         {participant.name || "Unknown Participant"}
//       </Typography>
//       <Box sx={{ position: "relative", height: "48px" }}>
//         <Box
//           sx={{
//             position: "absolute",
//             height: "4px",
//             bgcolor: "primary.main",
//             left: "0%",
//             width: "100%",
//           }}
//         />
//         {events.map((event, index) => (
//           <EventIcon
//             key={index}
//             type={event.type}
//             offset={event.offset}
//             time={event.time}
//           />
//         ))}
//       </Box>
//     </Box>
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
//       <Box p={2}>
//         <Alert severity="error">{error}</Alert>
//       </Box>
//     );
//   }

//   if (!session) {
//     return (
//       <Box p={2}>
//         <Typography variant="h6">No session found</Typography>
//       </Box>
//     );
//   }

//   const timeMarkers = [
//     { label: new Date(session.start).toLocaleTimeString(), offset: 0 },
//     { label: new Date(session.end).toLocaleTimeString(), offset: 100 },
//   ];

//   return (
//     <TimelineContainer>
//       <Typography variant="h6" sx={{ mb: 3, color: "common.white" }}>
//         Participant Event Timeline
//       </Typography>
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
  Tooltip,
} from "@mui/material";
import {
  Mic as MicIcon,
  VideocamOutlined as CameraIcon,
  Error as ErrorIcon,
  Login as JoinIcon,
  Logout as LeaveIcon,
  WifiOff as DisconnectIcon,
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

const EventIcon = ({ type, offset, time, tooltip }) => {
  const getIcon = () => {
    switch (type) {
      case "mic":
        return <MicIcon />;
      case "camera":
        return <CameraIcon />;
      case "error":
        return <ErrorIcon sx={{ color: "error.main" }} />;
      case "join":
        return <JoinIcon sx={{ color: "success.main" }} />;
      case "leave":
        return <LeaveIcon />;
      case "disconnect":
        return <DisconnectIcon sx={{ color: "error.main" }} />;
      default:
        return null;
    }
  };

  return (
    <Tooltip title={tooltip || time}>
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          left: `${offset}%`,
          transform: "translateX(-50%)",
          "& .MuiSvgIcon-root": {
            bgcolor: type === "error" || type === "disconnect" ? "error.dark" : "primary.main",
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
    </Tooltip>
  );
};

const ParticipantTimeline = ({ participant, sessionStart, sessionEnd }) => {
  const calculateOffset = (time) => {
    const eventTime = new Date(time);
    const duration = new Date(sessionEnd) - new Date(sessionStart);
    return ((eventTime - new Date(sessionStart)) / duration) * 100;
  };

  const createEventSegments = (events, color) =>
    events.map((event, index) => {
      const startOffset = calculateOffset(event.start);
      const endOffset = calculateOffset(event.end);

      return (
        <Box
          key={`${event.type}-${index}`}
          sx={{
            position: "absolute",
            height: "100%",
            bgcolor: color,
            top: 0,
            left: `${startOffset}%`,
            width: `${endOffset - startOffset}%`,
            zIndex: 1,
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
      <Box
        sx={{
          position: "absolute",
          height: "100%",
          bgcolor: "success.main",
          opacity: 0.3,
          top: 0,
          left: `${startOffset}%`,
          width: `${endOffset - startOffset}%`,
          zIndex: 0,
        }}
      />
    );
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="subtitle2" sx={{ mb: 1, color: "grey.300" }}>
        {participant.name || "Unknown Participant"}
      </Typography>
      <Box
        sx={{
          position: "relative",
          height: "4px",
          bgcolor: "grey.700",
        }}
      >
        {/* Presence segment */}
        {createPresenceSegment()}

        {/* Media events segments */}
        {createEventSegments(participant.events.mic, "primary.main")}
        {createEventSegments(participant.events.webcam, "secondary.main")}

        {/* Join/Leave events */}
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

        {/* Media events */}
        {participant.events.mic.map((event, index) => (
          <EventIcon
            key={`mic-${index}`}
            type="mic"
            offset={calculateOffset(event.start)}
            time={new Date(event.start).toLocaleTimeString()}
            tooltip={`${event.type === 'mute' ? 'Muted' : 'Unmuted'}: ${participant.name}`}
          />
        ))}
        {participant.events.webcam.map((event, index) => (
          <EventIcon
            key={`camera-${index}`}
            type="camera"
            offset={calculateOffset(event.start)}
            time={new Date(event.start).toLocaleTimeString()}
            tooltip={`Camera ${event.type === 'off' ? 'Off' : 'On'}: ${participant.name}`}
          />
        ))}

        {/* Error events */}
        {participant.events.errors?.map((error, index) => (
          <EventIcon
            key={`error-${index}`}
            type="error"
            offset={calculateOffset(error.timestamp)}
            time={new Date(error.timestamp).toLocaleTimeString()}
            tooltip={`Error: ${error.message}`}
          />
        ))}

        {/* Disconnection events */}
        {participant.events.disconnections?.map((disconnect, index) => (
          <EventIcon
            key={`disconnect-${index}`}
            type="disconnect"
            offset={calculateOffset(disconnect.timestamp)}
            time={new Date(disconnect.timestamp).toLocaleTimeString()}
            tooltip={`Disconnected: ${disconnect.reason}`}
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