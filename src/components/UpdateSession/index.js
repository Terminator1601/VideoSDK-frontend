import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { updateSession } from '../../Api/api';

const UpdateSession = () => {
    const { meetingId } = useParams();
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const updatedSession = { start, end };
            await updateSession(meetingId, updatedSession);
            setSuccess('Session updated successfully!');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Update Session</h2>
            {error && <div className="text-red-500">{error}</div>}
            {success && <div className="text-green-500">{success}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="datetime-local"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                    className="w-full p-2 bg-gray-700 text-white rounded-md"
                    required
                />
                <input
                    type="datetime-local"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                    className="w-full p-2 bg-gray-700 text-white rounded-md"
                    required
                />
                <button
                    type="submit"
                    className="w-full p-2 bg-yellow-500 text-white rounded-md"
                    disabled={loading}
                >
                    {loading ? 'Updating...' : 'Update Session'}
                </button>
            </form>
        </div>
    );
};

export default UpdateSession;
