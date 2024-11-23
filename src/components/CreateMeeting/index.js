


// import React, { useState } from 'react';
// import axios from 'axios';
// import "tailwindcss/tailwind.css"

// const BASE_URL = 'http://localhost:5000';

// const CreateMeeting = () => {
//     const [meetingData, setMeetingData] = useState({
//         meetingId: '',
//         start: '',
//         end: '',
//     });
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setMeetingData(prev => ({
//             ...prev,
//             [name]: value,
//         }));
//         // Clear messages when user starts typing
//         setError('');
//         setSuccess('');
//     };

//     const validateTimes = () => {
//         const startTime = new Date(meetingData.start);
//         const endTime = new Date(meetingData.end);
//         if (endTime <= startTime) {
//             setError('End time must be after start time');
//             return false;
//         }
//         return true;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         if (!validateTimes()) {
//             return;
//         }

//         setLoading(true);
//         setError('');
//         setSuccess('');

//         try {
//             const response = await axios.post(`${BASE_URL}/sessions/start`, {
//                 meetingId: meetingData.meetingId,
//                 start: new Date(meetingData.start).toISOString(),
//                 end: new Date(meetingData.end).toISOString(),
//             });

//             setSuccess('Meeting created successfully!');
//             setMeetingData({ meetingId: '', start: '', end: '' });
            
//         } catch (err) {
//             setError(
//                 err.response?.data?.message || 
//                 'Failed to create meeting. Please try again.'
//             );
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//             <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
//                 <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//                     Create New Meeting
//                 </h1>
                
//                 {error && (
//                     <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg">
//                         {error}
//                     </div>
//                 )}
                
//                 {success && (
//                     <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg">
//                         {success}
//                     </div>
//                 )}

//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div>
//                         <label className="block text-gray-700 font-medium mb-1">
//                             Meeting ID
//                         </label>
//                         <input
//                             type="text"
//                             name="meetingId"
//                             value={meetingData.meetingId}
//                             onChange={handleChange}
//                             required
//                             className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             placeholder="Enter meeting ID"
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-gray-700 font-medium mb-1">
//                             Start Time
//                         </label>
//                         <input
//                             type="datetime-local"
//                             name="start"
//                             value={meetingData.start}
//                             onChange={handleChange}
//                             required
//                             className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-gray-700 font-medium mb-1">
//                             End Time
//                         </label>
//                         <input
//                             type="datetime-local"
//                             name="end"
//                             value={meetingData.end}
//                             onChange={handleChange}
//                             required
//                             className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                     </div>

//                     <button
//                         type="submit"
//                         disabled={loading}
//                         className={`w-full py-2 rounded-lg text-white font-medium transition-colors duration-200 
//                             ${loading 
//                                 ? 'bg-blue-300 cursor-not-allowed' 
//                                 : 'bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
//                             }`}
//                     >
//                         {loading ? 'Creating...' : 'Create Meeting'}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default CreateMeeting;







import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "tailwindcss/tailwind.css";

const BASE_URL = 'http://localhost:5000';

const CreateMeeting = () => {
    const [meetingData, setMeetingData] = useState({
        meetingId: '',
        start: '',
        end: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMeetingData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setError('');
        setSuccess('');
    };

    const validateTimes = () => {
        const startTime = new Date(meetingData.start);
        const endTime = new Date(meetingData.end);
        if (endTime <= startTime) {
            setError('End time must be after start time');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateTimes()) return;

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await axios.post(`${BASE_URL}/sessions/start`, {
                meetingId: meetingData.meetingId,
                start: new Date(meetingData.start).toISOString(),
                end: new Date(meetingData.end).toISOString(),
            });

            setSuccess('Meeting created successfully!');
            setMeetingData({ meetingId: '', start: '', end: '' });
            setTimeout(() => navigate('/meetings'), 1500); // Redirect after success
        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Failed to create meeting. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Create New Meeting
                </h1>
                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg">
                        {success}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Meeting ID
                        </label>
                        <input
                            type="text"
                            name="meetingId"
                            value={meetingData.meetingId}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter meeting ID"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Start Time
                        </label>
                        <input
                            type="datetime-local"
                            name="start"
                            value={meetingData.start}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            End Time
                        </label>
                        <input
                            type="datetime-local"
                            name="end"
                            value={meetingData.end}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 rounded-lg text-white font-medium transition-colors duration-200 ${
                            loading
                                ? 'bg-blue-300 cursor-not-allowed'
                                : 'bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        }`}
                    >
                        {loading ? 'Creating...' : 'Create Meeting'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateMeeting;
