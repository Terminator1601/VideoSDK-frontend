// import React, { useState } from "react";
// // import axios from "axios";
// import "tailwindcss/tailwind.css"
// import { addParticipantToSession } from '../../Api/api';

// const ParticipantJoinForm = () => {
//   const [participantId, setParticipantId] = useState("");
//   const [name, setName] = useState("");
//   const [sessionId, setSessionId] = useState("");
//   const [message, setMessage] = useState("");

//   const handleJoin = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     if (!participantId || !name || !sessionId) {
//         setMessage("All fields are required.");
//         return;
//     }

//     try {
//         const participantData = { participantId, name };
//         const response = await addParticipantToSession(sessionId, participantData);

//         setMessage(`Successfully joined! Welcome, ${response.name}.`);
//         setParticipantId("");
//         setName("");
//         setSessionId("");
//     } catch (error) {
//         const errorMessage =
//             error.response?.data?.message || "Failed to join the session.";
//         setMessage(errorMessage);
//     }
// };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
//         <h1 className="text-2xl font-semibold text-gray-800 text-center">
//           Join a Session
//         </h1>
//         <form onSubmit={handleJoin} className="mt-6 space-y-4">
//           <div>
//             <label htmlFor="sessionId" className="block text-gray-700">
//               Session ID
//             </label>
//             <input
//               id="sessionId"
//               type="text"
//               placeholder="Enter session ID"
//               value={sessionId}
//               onChange={(e) => setSessionId(e.target.value)}
//               className="w-full mt-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//           </div>
//           <div>
//             <label htmlFor="participantId" className="block text-gray-700">
//               Participant ID
//             </label>
//             <input
//               id="participantId"
//               type="text"
//               placeholder="Enter participant ID"
//               value={participantId}
//               onChange={(e) => setParticipantId(e.target.value)}
//               className="w-full mt-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//           </div>
//           <div>
//             <label htmlFor="name" className="block text-gray-700">
//               Name
//             </label>
//             <input
//               id="name"
//               type="text"
//               placeholder="Enter your name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full mt-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
//           >
//             Join Session
//           </button>
//         </form>
//         {message && (
//           <p
//             className={`mt-4 text-center ${
//               message.includes("Successfully")
//                 ? "text-green-500"
//                 : "text-red-500"
//             }`}
//           >
//             {message}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ParticipantJoinForm;






import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router
import "tailwindcss/tailwind.css";
import { addParticipantToSession } from "../../Api/api";

const ParticipantJoinForm = () => {
  const [participantId, setParticipantId] = useState("");
  const [name, setName] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // Initialize useNavigate

  const handleJoin = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!participantId || !name || !sessionId) {
      setMessage("All fields are required.");
      return;
    }

    try {
      const participantData = { participantId, name };
      const response = await addParticipantToSession(sessionId, participantData);

      setMessage(`Successfully joined! Welcome, ${response.name}.`);

      // Redirect to /room with the session ID
      setTimeout(() => {
        navigate(`/room/${sessionId}`); // Corrected dynamic path
      }, 1000); // Optional delay for better user experience

      // Clear form fields
      setParticipantId("");
      setName("");
      setSessionId("");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to join the session.";
      setMessage(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800 text-center">
          Join a Session
        </h1>
        <form onSubmit={handleJoin} className="mt-6 space-y-4">
          <div>
            <label htmlFor="sessionId" className="block text-gray-700">
              Session ID
            </label>
            <input
              id="sessionId"
              type="text"
              placeholder="Enter session ID"
              value={sessionId}
              onChange={(e) => setSessionId(e.target.value)}
              className="w-full mt-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="participantId" className="block text-gray-700">
              Participant ID
            </label>
            <input
              id="participantId"
              type="text"
              placeholder="Enter participant ID"
              value={participantId}
              onChange={(e) => setParticipantId(e.target.value)}
              className="w-full mt-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Join Session
          </button>
        </form>
        {message && (
          <p
            className={`mt-4 text-center ${
              message.includes("Successfully")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ParticipantJoinForm;
