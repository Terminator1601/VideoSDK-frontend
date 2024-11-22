

// import axios from 'axios';

// const BASE_URL = 'http://localhost:5000'; // Ensure this matches your backend port

// export const fetchSessions = async (page = 1, limit = 10) => {
//     try {
//         const response = await axios.get(`${BASE_URL}/sessions`, {
//             params: { page, limit }
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching sessions:', error);
//         throw error;
//     }
// };

// export const fetchSessionDetails = async (meetingId) => {
//     try {
//         const response = await axios.get(`${BASE_URL}/sessions/${meetingId}`);
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching session details:', error);
//         throw error;
//     }
// };






import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

// Create axios instance with default config
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Get all sessions with pagination
const fetchSessions = async (page = 1, limit = 10) => {
    try {
        const response = await api.get('/sessions', {
            params: { page, limit }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching sessions:', error);
        throw error;
    }
};

// Get details of a specific session
const fetchSessionDetails = async (meetingId) => {
    try {
        const response = await api.get(`/sessions/${meetingId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching session details:', error);
        throw error;
    }
};

// Create a new session/meeting
const createSession = async (meetingData) => {
    try {
        const response = await api.post('/sessions/start', {
            meetingId: meetingData.meetingId,
            start: new Date(meetingData.start).toISOString(),
            end: new Date(meetingData.end).toISOString(),
        });
        return response.data;
    } catch (error) {
        console.error('Error creating session:', error);
        throw error;
    }
};

// Update an existing session
const updateSession = async (meetingId, updateData) => {
    try {
        const response = await api.put(`/sessions/${meetingId}`, updateData);
        return response.data;
    } catch (error) {
        console.error('Error updating session:', error);
        throw error;
    }
};

// Delete a session
const deleteSession = async (meetingId) => {
    try {
        const response = await api.delete(`/sessions/${meetingId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting session:', error);
        throw error;
    }
};

// End an active session
const endSession = async (meetingId) => {
    try {
        const response = await api.post(`/sessions/${meetingId}/end`);
        return response.data;
    } catch (error) {
        console.error('Error ending session:', error);
        throw error;
    }
};

// Get active sessions
const fetchActiveSessions = async () => {
    try {
        const response = await api.get('/sessions/active');
        return response.data;
    } catch (error) {
        console.error('Error fetching active sessions:', error);
        throw error;
    }
};

// Error handler helper
const handleApiError = (error) => {
    const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
    console.error('API Error:', error);
    throw new Error(errorMessage);
};


// Add a participant to a specific session
const addParticipantToSession = async (meetingId, participantData) => {
    try {
        const response = await api.post(`/sessions/${meetingId}/participants`, participantData);
        return response.data;
    } catch (error) {
        console.error('Error adding participant to session:', error);
        throw error;
    }
};


// Create an API object with all methods
const apiService = {
    fetchSessions,
    fetchSessionDetails,
    createSession,
    updateSession,
    deleteSession,
    addParticipantToSession,
    endSession,
    fetchActiveSessions,
    handleApiError,
};

// Named exports for individual functions
export {
    fetchSessions,
    fetchSessionDetails,
    addParticipantToSession,
    createSession,
    updateSession,
    deleteSession,
    endSession,
    fetchActiveSessions,
    handleApiError,
};

// Default export of the complete service
export default apiService;