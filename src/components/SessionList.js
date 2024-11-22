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
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

const SessionList = () => {
  const [sessions, setSessions] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const itemsPerPage = 10;

  const loadSessions = async () => {
    try {
      setLoading(true);
      const data = await fetchSessions(page, itemsPerPage);
      setSessions(data.sessions);
      setTotal(data.total);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to load sessions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSessions();
  }, [page]);

  const filteredSessions = sessions.filter((session) =>
    session.meetingId.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(total / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Session List</h1>

        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search by Meeting ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-700 text-white rounded-lg py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500 text-white p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-white">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left">Meeting ID</th>
                    <th className="px-6 py-3 text-left">Start Time</th>
                    <th className="px-6 py-3 text-left">End Time</th>
                    <th className="px-6 py-3 text-left">Participants</th>
                    <th className="px-6 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredSessions.length > 0 ? (
                    filteredSessions.map((session) => (
                      <tr 
                        key={session.meetingId}
                        className="hover:bg-gray-700 transition-colors"
                      >
                        <td className="px-6 py-4">{session.meetingId}</td>
                        <td className="px-6 py-4">
                          {new Date(session.start).toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          {session.end
                            ? new Date(session.end).toLocaleString()
                            : "Ongoing"}
                        </td>
                        <td className="px-6 py-4">
                          {session.uniqueParticipantsCount}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => navigate(`/session/${session.meetingId}`)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                          >
                            View Timeline
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td 
                        colSpan={5} 
                        className="px-6 py-4 text-center text-gray-400"
                      >
                        No sessions found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-6 space-x-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="p-2 rounded-lg bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (page <= 3) {
                      pageNum = i + 1;
                    } else if (page >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = page - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`w-8 h-8 rounded-lg ${
                          page === pageNum
                            ? "bg-blue-500 text-white"
                            : "bg-gray-700 text-white hover:bg-gray-600"
                        } transition-colors`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="p-2 rounded-lg bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SessionList;
