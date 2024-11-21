
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import MeetingList from './components/MeetingList';
// // import MeetingDetails from './components/MeetingDetails/index';
// import CreateMeeting from './components/CreateMeeting';
// import JoinSession from './components/JoinSession';
// import Room from './components/Room';
// import Timeline from './components/Timeline';

// function App() {
//     return (
//         <Router>
//             <JoinSession />
//             <Routes>
//                 <Route path="/" element={<MeetingList />} />
//                 <Route path="/meeting/:meetingId" element={<Timeline />} />
//                 <Route path="/create" element={<CreateMeeting />} />
//                 <Route path="/room/:meetingId" element={<Room />} />
//             </Routes>
//         </Router>
//     );
// }

// export default App;







import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import SessionList from "./components/SessionList";
import SessionTimeline from "./components/SessionTimeline";

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
        <Route path="/session/:meetingId" element={<SessionTimeline />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;