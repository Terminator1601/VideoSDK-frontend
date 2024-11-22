



//     // In your api.js file
// import axios from 'axios';

// const BASE_URL = 'http://localhost:3000'; // Ensure this matches your backend port

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

const BASE_URL = 'http://localhost:3000'; // Ensure this matches your backend port

export const fetchSessions = async (page = 1, limit = 10) => {
    try {
        const response = await axios.get(`${BASE_URL}/sessions`, {
            params: { page, limit }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching sessions:', error);
        throw error;
    }
};

export const fetchSessionDetails = async (meetingId) => {
    try {
        const response = await axios.get(`${BASE_URL}/sessions/${meetingId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching session details:', error);
        throw error;
    }
};
