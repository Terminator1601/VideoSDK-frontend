import React, { useState, useEffect } from 'react';
import { fetchSessions, deleteSession } from '../../Api/api';

const DeleteSession = () => {
    const [sessions, setSessions] = useState([]);
    const [selectedMeetingId, setSelectedMeetingId] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Fetch all sessions
    useEffect(() => {
        const loadSessions = async () => {
            setFetching(true);
            setError(null);
            try {
                const data = await fetchSessions(1, 10);
                console.log('Fetched sessions:', data);
                setSessions(Array.isArray(data) ? data : []);
            } catch (err) {
                setError('Failed to fetch sessions. Please try again later.');
                console.error(err);
            } finally {
                setFetching(false);
            }
        };
        loadSessions();
    }, []);

    // Handle session deletion
    const handleDelete = async () => {
        if (!selectedMeetingId) {
            setError('Please select a meeting to delete.');
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            await deleteSession(selectedMeetingId);
            setSuccess('Session deleted successfully!');
            setSessions((prev) =>
                prev.filter((session) => session.meetingId !== selectedMeetingId)
            ); // Remove deleted session from state
            setSelectedMeetingId(''); // Reset selection
        } catch (err) {
            setError('Failed to delete session. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Delete Session</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {success && <div className="text-green-500 mb-4">{success}</div>}

            {fetching ? (
                <p>Loading sessions...</p>
            ) : (
                <select
                    value={selectedMeetingId}
                    onChange={(e) => setSelectedMeetingId(e.target.value)}
                    className="w-full p-2 bg-gray-700 text-white rounded-md mb-4"
                >
                    <option value="">Select a Meeting</option>
                    {sessions.length > 0 ? (
                        sessions.map((session) => (
                            <option key={session.meetingId} value={session.meetingId}>
                                {session.meetingId} -{' '}
                                {session.start ? new Date(session.start).toLocaleString() : 'No start date'}
                            </option>
                        ))
                    ) : (
                        <option disabled>No sessions available</option>
                    )}
                </select>
            )}

            <button
                onClick={handleDelete}
                className="w-full p-2 bg-red-600 text-white rounded-md"
                disabled={loading || fetching}
            >
                {loading ? 'Deleting...' : 'Delete Session'}
            </button>
        </div>
    );
};

export default DeleteSession;