import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudyRoom = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [timer, setTimer] = useState(25 * 60); // 25 minutes in seconds
  const [timerRunning, setTimerRunning] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get room type from navigation state (passed from Dashboard)
  const roomType = location.state?.roomType || 'Silent';

  // Pomodoro Timer Logic
  useEffect(() => {
    let interval;
    if (timerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      toast.success('Pomodoro complete! Take a break.', { autoClose: 2000 });
      setTimerRunning(false);
      setTimer(25 * 60); // Reset to 25 minutes
    }
    return () => clearInterval(interval);
  }, [timerRunning, timer]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: 'You', timestamp: new Date().toLocaleTimeString() }]);
      setNewMessage('');
      toast.info('Message sent!', { autoClose: 1000 });
    }
  };

  const togglePomodoro = () => {
    setTimerRunning(!timerRunning);
    if (!timerRunning) {
      toast.success('Pomodoro started!', { autoClose: 2000 });
    } else {
      toast.info('Pomodoro paused.', { autoClose: 2000 });
    }
  };

  const leaveRoom = () => {
    toast.info('Leaving room...', { autoClose: 2000 });
    setTimeout(() => navigate('/dashboard'), 2000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation Bar */}
      <div className="bg-[#56021F] text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">{roomType} Room</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={leaveRoom}
            className="bg-[#D17D98] text-white px-4 py-2 rounded-lg hover:bg-[#7D1C4A]"
          >
            Leave Room
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Chat Section */}
        <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-[#7D1C4A] mb-4">Chat</h2>
          <div className="h-64 overflow-y-auto mb-4">
            {messages.map((msg, index) => (
              <div key={index} className="mb-2">
                <span className="text-xs text-gray-500">{msg.timestamp} - {msg.sender}: </span>
                <span className="text-sm text-gray-700">{msg.text}</span>
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D17D98]"
            />
          </form>
        </div>

        {/* Video/Participants Section (Placeholder) */}
        <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-[#7D1C4A] mb-4">Participants</h2>
          <div className="h-64 flex items-center justify-center text-gray-500">
            <p>Video feed coming soon...</p>
          </div>
        </div>

        {/* Tools Section */}
        <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-[#7D1C4A] mb-4">Tools</h2>
          {/* Pomodoro Timer */}
          <div className="text-center mb-6">
            <p className="text-2xl font-bold text-gray-700 mb-4">{formatTime(timer)}</p>
            <button
              onClick={togglePomodoro}
              className="bg-[#D17D98] text-white px-6 py-2 rounded-lg hover:bg-[#7D1C4A]"
            >
              {timerRunning ? 'Pause' : 'Start'}
            </button>
          </div>
          {/* Whiteboard Placeholder */}
          <div className="h-32 flex items-center justify-center text-gray-500">
            <p>Whiteboard coming soon...</p>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default StudyRoom;