// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { fetchSessions } from "../Api/api";
// import { Table, TableBody, TableCell, TableHead, TableRow, Button, Pagination } from "@mui/material";

// const SessionList = () => {
//   const [sessions, setSessions] = useState([]);
//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(0);
//   const [error, setError] = useState(null);

//   const navigate = useNavigate(); // Initialize the navigate function

//   const loadSessions = async () => {
//     try {
//       const data = await fetchSessions(page, 10); // 10 sessions per page
//       setSessions(data.sessions);
//       setTotal(data.total);
//       setError(null); // Clear previous errors
//     } catch (err) {
//       setError(err.message || "Failed to load sessions.");
//     }
//   };

//   useEffect(() => {
//     loadSessions();
//   }, [page]);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Session List</h1>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Meeting ID</TableCell>
//             <TableCell>Start Time</TableCell>
//             <TableCell>End Time</TableCell>
//             <TableCell>Participants</TableCell>
//             <TableCell>Actions</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {sessions.map((session) => (
//             <TableRow key={session.meetingId}>
//               <TableCell>{session.meetingId}</TableCell>
//               <TableCell>{new Date(session.start).toLocaleString()}</TableCell>
//               <TableCell>{session.end ? new Date(session.end).toLocaleString() : "Ongoing"}</TableCell>
//               <TableCell>{session.uniqueParticipantsCount}</TableCell>
//               <TableCell>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={() => navigate(`/session/${session.meetingId}`)} // Navigate to the session timeline
//                 >
//                   View Timeline
//                 </Button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//       <Pagination
//         count={Math.ceil(total / 10)}
//         page={page}
//         onChange={(event, value) => setPage(value)}
//       />
//     </div>
//   );
// };

// export default SessionList;





import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSessions } from "../Api/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Pagination,
  TextField,
  CircularProgress,
  Box,
  Paper,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark", // Enable dark mode
    background: {
      default: "#121212", // Dark background
      paper: "#1e1e1e",   // Dark paper background
    },
    text: {
      primary: "#ffffff", // Light text
      secondary: "#b0b0b0", // Light secondary text
    },
    primary: {
      main: "#90caf9", // Light blue
    },
    secondary: {
      main: "#ffeb3b", // Yellow for accent
    },
  },
});

const SessionList = () => {
  const [sessions, setSessions] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState(""); // For filtering sessions
  const [loading, setLoading] = useState(false); // Loading state

  const navigate = useNavigate(); // Initialize the navigate function

  const loadSessions = async () => {
    try {
      setLoading(true); // Start loading
      const data = await fetchSessions(page, 10); // 10 sessions per page
      setSessions(data.sessions);
      setTotal(data.total);
      setError(null); // Clear previous errors
    } catch (err) {
      setError(err.message || "Failed to load sessions.");
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    loadSessions();
  }, [page]);

  const filteredSessions = sessions.filter((session) =>
    session.meetingId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <Paper
        sx={{
          padding: 3,
          margin: "20px auto",
          maxWidth: 1000,
          backgroundColor: "background.paper",
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          Session List
        </Typography>

        {/* Search Bar */}
        <TextField
          label="Search by Meeting ID"
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ marginBottom: 3 }}
          color="primary"
        />

        {/* Error Message */}
        {error && (
          <Typography color="error" sx={{ marginBottom: 2 }}>
            {error}
          </Typography>
        )}

        {/* Loading Spinner */}
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
            <CircularProgress color="primary" />
          </Box>
        ) : (
          <>
            {/* Table */}
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: "text.primary" }}>Meeting ID</TableCell>
                  <TableCell sx={{ color: "text.primary" }}>Start Time</TableCell>
                  <TableCell sx={{ color: "text.primary" }}>End Time</TableCell>
                  <TableCell sx={{ color: "text.primary" }}>Participants</TableCell>
                  <TableCell sx={{ color: "text.primary" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredSessions.length > 0 ? (
                  filteredSessions.map((session) => (
                    <TableRow key={session.meetingId}>
                      <TableCell sx={{ color: "text.primary" }}>{session.meetingId}</TableCell>
                      <TableCell sx={{ color: "text.primary" }}>
                        {new Date(session.start).toLocaleString()}
                      </TableCell>
                      <TableCell sx={{ color: "text.primary" }}>
                        {session.end
                          ? new Date(session.end).toLocaleString()
                          : "Ongoing"}
                      </TableCell>
                      <TableCell sx={{ color: "text.primary" }}>
                        {session.uniqueParticipantsCount}
                      </TableCell>
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
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ color: "text.secondary" }}>
                      No sessions found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {/* Pagination */}
            <Box display="flex" justifyContent="center" marginTop={3}>
              <Pagination
                count={Math.ceil(total / 10)}
                page={page}
                onChange={(event, value) => setPage(value)}
                color="primary"
              />
            </Box>
          </>
        )}
      </Paper>
    </ThemeProvider>
  );
};

export default SessionList;
