import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MeetingList from './components/MeetingList';
import MeetingDetails from './components/MeetingDetails ';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MeetingList />} />
                <Route path="/meeting/:meetingId" element={<MeetingDetails />} />
            </Routes>
        </Router>
    );
}

export default App;
