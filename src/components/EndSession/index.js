import React, { useState } from 'react';
import { endSession } from '../../Api/api';

const EndSession = ({ meetingId }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleEndSession = async () => {
        setLoading(true);
        try {
            await endSession(meetingId);
            setSuccess('Session ended successfully!');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">End Session</h2>
            {error && <div className="text-red-500">{error}</div>}
            {success && <div className="text-green-500">{success}</div>}
            <button
                onClick={handleEndSession}
                className="w-full p-2 bg-orange-600 text-white rounded-md"
                disabled={loading}
            >
                {loading ? 'Ending...' : 'End Session'}
            </button>
        </div>
    );
};

export default EndSession;
