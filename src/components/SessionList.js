import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSessions } from "../Api/api";
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Pagination } from "@mui/material";

const SessionList = () => {
  const [sessions, setSessions] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Initialize the navigate function

  const loadSessions = async () => {
    try {
      const data = await fetchSessions(page, 10); // 10 sessions per page
      setSessions(data.sessions);
      setTotal(data.total);
      setError(null); // Clear previous errors
    } catch (err) {
      setError(err.message || "Failed to load sessions.");
    }
  };

  useEffect(() => {
    loadSessions();
  }, [page]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Session List</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Meeting ID</TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>End Time</TableCell>
            <TableCell>Participants</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sessions.map((session) => (
            <TableRow key={session.meetingId}>
              <TableCell>{session.meetingId}</TableCell>
              <TableCell>{new Date(session.start).toLocaleString()}</TableCell>
              <TableCell>{session.end ? new Date(session.end).toLocaleString() : "Ongoing"}</TableCell>
              <TableCell>{session.uniqueParticipantsCount}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/session/${session.meetingId}`)} // Navigate to the session timeline
                >
                  View Timeline
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        count={Math.ceil(total / 10)}
        page={page}
        onChange={(event, value) => setPage(value)}
      />
    </div>
  );
};

export default SessionList;