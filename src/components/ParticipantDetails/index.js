import React from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import {
  Camera,
  Mic,
  Clock,
  Calendar,
  ArrowLeft,
  AlertCircle,
  User,
  Network,
  Activity
} from "lucide-react";

const ParticipantDetails = () => {
  const location = useLocation();
  const { meetingId, participantId } = useParams();
  const navigate = useNavigate();
  const participant = location.state?.participant;

  if (!participant) {
    return (
      <div className="min-h-screen bg-gray-900 p-8 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 text-red-500">
            <h2 className="text-lg font-semibold mb-2">Error Loading Participant Details</h2>
            <p>Unable to load participant information. Please try accessing this page through the session timeline.</p>
          </div>
        </div>
      </div>
    );
  }

  const formatDuration = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationMs = end - start;
    const minutes = Math.floor(durationMs / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (hours === 0) {
      return `${minutes} minutes`;
    }
    return `${hours}h ${remainingMinutes}m`;
  };

  const calculateTotalDuration = () => {
    if (!participant.timelog?.length) return "N/A";
    
    let totalMs = 0;
    participant.timelog.forEach(log => {
      const start = new Date(log.start);
      const end = new Date(log.end);
      totalMs += end - start;
    });
    
    const minutes = Math.floor(totalMs / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    return `${hours}h ${remainingMinutes}m`;
  };

  const getEventStats = (eventType) => {
    const events = participant.events[eventType] || [];
    let totalDuration = 0;
    let count = 0;

    events.forEach(event => {
      const start = new Date(event.start);
      const end = new Date(event.end);
      totalDuration += end - start;
      count++;
    });

    const minutes = Math.floor(totalDuration / (1000 * 60));
    
    return {
      count,
      duration: minutes > 0 ? `${minutes}m` : "0m"
    };
  };

  const micStats = getEventStats("mic");
  const cameraStats = getEventStats("webcam");

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">
      <div className="max-w-4xl mx-auto">
        {/* Header with back button */}
        <div className="mb-8 flex items-center">
          <button
            onClick={() => navigate(`/session/${meetingId}`)}
            className="text-gray-400 hover:text-white flex items-center transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Timeline
          </button>
        </div>

        {/* Participant header */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex items-center mb-4">
            <User className="w-8 h-8 text-blue-400 mr-3" />
            <h1 className="text-2xl font-semibold">
              {participant.name || "Unknown Participant"}
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center text-gray-300">
              <Clock className="w-5 h-5 mr-2" />
              <span>Total Duration: {calculateTotalDuration()}</span>
            </div>
            <div className="flex items-center text-gray-300">
              <Activity className="w-5 h-5 mr-2" />
              <span>Session ID: {meetingId}</span>
            </div>
            <div className="flex items-center text-gray-300">
              <Network className="w-5 h-5 mr-2" />
              <span>Participant ID: {participantId}</span>
            </div>
          </div>
        </div>

        {/* Activity Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Mic className="w-6 h-6 text-blue-400 mr-2" />
              <h2 className="text-xl font-semibold">Microphone Activity</h2>
            </div>
            <div className="space-y-2">
              <p className="text-gray-300">Times Used: {micStats.count}</p>
              <p className="text-gray-300">Total Duration: {micStats.duration}</p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Camera className="w-6 h-6 text-purple-400 mr-2" />
              <h2 className="text-xl font-semibold">Camera Activity</h2>
            </div>
            <div className="space-y-2">
              <p className="text-gray-300">Times Used: {cameraStats.count}</p>
              <p className="text-gray-300">Total Duration: {cameraStats.duration}</p>
            </div>
          </div>
        </div>

        {/* Session Timeline */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex items-center mb-4">
            <Calendar className="w-6 h-6 text-green-400 mr-2" />
            <h2 className="text-xl font-semibold">Session Timeline</h2>
          </div>
          <div className="space-y-4">
            {participant.timelog?.map((log, index) => (
              <div
                key={index}
                className="border-l-2 border-green-500 pl-4 py-2"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">
                      {new Date(log.start).toLocaleTimeString()}
                    </p>
                    <p className="text-white">Joined Session</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">
                      {new Date(log.end).toLocaleTimeString()}
                    </p>
                    <p className="text-white">Left Session</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  Duration: {formatDuration(log.start, log.end)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Connection Issues */}
        {participant.events.disconnect && participant.events.disconnect.length > 0 && (
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <AlertCircle className="w-6 h-6 text-red-400 mr-2" />
              <h2 className="text-xl font-semibold">Connection Issues</h2>
            </div>
            <div className="space-y-3">
              {participant.events.disconnect.map((event, index) => (
                <div
                  key={index}
                  className="border-l-2 border-red-500 pl-4 py-2"
                >
                  <p className="text-sm text-gray-400">
                    {new Date(event.time).toLocaleTimeString()}
                  </p>
                  <p className="text-white">Connection Lost</p>
                  {event.reason && (
                    <p className="text-sm text-gray-400 mt-1">
                      Reason: {event.reason}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParticipantDetails;