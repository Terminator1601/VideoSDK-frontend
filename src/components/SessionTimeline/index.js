
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSessionDetails } from "../../Api/api";
import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineContent } from "@mui/lab";
import { Typography, Box, CircularProgress, Alert } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import VideocamIcon from "@mui/icons-material/Videocam";
import ErrorIcon from "@mui/icons-material/Error";

const SessionTimeline = () => {
  const { meetingId } = useParams();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadSessionDetails = async () => {
    try {
      setLoading(true);
      const data = await fetchSessionDetails(meetingId);
      setSession(data);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to load session details");
      setSession(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSessionDetails();
  }, [meetingId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box style={{ padding: "20px" }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!session) {
    return (
      <Box style={{ padding: "20px" }}>
        <Typography variant="h6">No session found</Typography>
      </Box>
    );
  }

  return (
    <Box style={{ padding: "20px" }}>
      <Typography variant="h4">Session Timeline - {meetingId}</Typography>
      {session.participantArray && session.participantArray.length > 0 ? (
        session.participantArray.map((participant) => (
          <div key={participant.participantId}>
            <Typography variant="h5" style={{ margin: "20px 0" }}>
              {participant.name} ({participant.participantId})
            </Typography>
            <Timeline>
              {participant.events.mic && participant.events.mic.map((event, index) => (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot color="primary">
                      <MicIcon />
                    </TimelineDot>
                  </TimelineSeparator>
                  <TimelineContent>
                    Mic: {new Date(event.start).toLocaleTimeString()} -{" "}
                    {new Date(event.end).toLocaleTimeString()}
                  </TimelineContent>
                </TimelineItem>
              ))}
              {participant.events.webcam && participant.events.webcam.map((event, index) => (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot color="secondary">
                      <VideocamIcon />
                    </TimelineDot>
                  </TimelineSeparator>
                  <TimelineContent>
                    Webcam: {new Date(event.start).toLocaleTimeString()} -{" "}
                    {new Date(event.end).toLocaleTimeString()}
                  </TimelineContent>
                </TimelineItem>
              ))}
              {participant.events.errors && participant.events.errors.map((error, index) => (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot color="error">
                      <ErrorIcon />
                    </TimelineDot>
                  </TimelineSeparator>
                  <TimelineContent>
                    Error: {new Date(error.start).toLocaleTimeString()} - {error.message}
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </div>
        ))
      ) : (
        <Typography variant="body1">No participants found in this session</Typography>
      )}
    </Box>
  );
};

export default SessionTimeline;