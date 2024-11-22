



// import { BrowserRouter } from "react-router-dom";
// import { Routes, Route } from "react-router-dom";
// import SessionList from "./components/SessionList";
// import SessionTimeline from "./components/SessionTimeline";

// const App = () => {
//   return (
//     <BrowserRouter
//       future={{
//         v7_startTransition: true,
//         v7_relativeSplatPath: true,
//       }}
//     >
//       <Routes>
//         <Route path="/" element={<SessionList />} />
//         <Route path="/session/:meetingId" element={<SessionTimeline />} />
        
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;




import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import SessionList from "./components/SessionList";
import SessionTimeline from "./components/SessionTimeline";
import ParticipantDetails from "./components/ParticipantDetails";
import CreateMeeting from "./components/CreateMeeting";
import UpdateSession from "./components/UpdateSession";
import DeleteSession from "./components/DeleteSession";
import EndSession from "./components/EndSession";

const App = () => {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/" element={<SessionList />} />
        <Route path="/create" element={<CreateMeeting/>}/>
        <Route path="/update" element={<UpdateSession/>}/>
        <Route path="/delete" element={<DeleteSession/>}/>
        <Route path="/end" element={<EndSession/>}/>
        <Route path="/session/:meetingId" element={<SessionTimeline />} />
        <Route path="/session/:meetingId/participant/:participantId" element={<ParticipantDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;