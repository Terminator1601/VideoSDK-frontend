// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import MeetingList from './components/MeetingList';
// import MeetingDetails from './components/MeetingDetails ';
// import CreateMeeting from './components/CreateMeeting';

// function App() {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/" element={<MeetingList />} />
//                 <Route path="/meeting/:meetingId" element={<MeetingDetails />} />
//                 <Route path="/create" element={<CreateMeeting />} />
//             </Routes>
//         </Router>
//     );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MeetingList from './components/MeetingList';
import MeetingDetails from './components/MeetingDetails';
import CreateMeeting from './components/CreateMeeting';
import JoinSession from './components/JoinSession';
import Room from './components/Room';

function App() {
    return (
        <Router>
            <JoinSession />
            <Routes>
                <Route path="/" element={<MeetingList />} />
                <Route path="/meeting/:meetingId" element={<MeetingDetails />} />
                <Route path="/create" element={<CreateMeeting />} />
                <Route path="/room/:meetingId" element={<Room />} />
            </Routes>
        </Router>
    );
}

export default App;
