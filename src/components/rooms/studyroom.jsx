import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Stage, Layer, Line } from 'react-konva';

const StudyRoom = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [timer, setTimer] = useState(25 * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [lines, setLines] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const roomType = location.state?.roomType || 'Silent';

  useEffect(() => {
    let interval;
    if (timerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      toast.success('Pomodoro complete! Take a break.', { autoClose: 2000 });
      setTimerRunning(false);
      setTimer(25 * 60);
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

  // Whiteboard Drawing Logic
  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    setLines([...lines.slice(0, -1), lastLine]);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <div className="min-h-screen bg-white">
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

      <div className="p-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
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

        <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-[#7D1C4A] mb-4">Participants</h2>
          <div className="h-64 flex items-center justify-center text-gray-500">
            <p>Video feed coming soon...</p>
          </div>
        </div>

        <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-[#7D1C4A] mb-4">Tools</h2>
          <div className="text-center mb-6">
            <p className="text-2xl font-bold text-gray-700 mb-4">{formatTime(timer)}</p>
            <button
              onClick={togglePomodoro}
              className="bg-[#D17D98] text-white px-6 py-2 rounded-lg hover:bg-[#7D1C4A]"
            >
              {timerRunning ? 'Pause' : 'Start'}
            </button>
          </div>
          <div className="mb-6">
            <h3 className="text-md font-semibold text-[#7D1C4A] mb-2">Whiteboard</h3>
            <Stage
              width={300}
              height={200}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              className="border border-gray-300 rounded-lg"
            >
              <Layer>
                {lines.map((line, i) => (
                  <Line
                    key={i}
                    points={line.points}
                    stroke="#7D1C4A"
                    strokeWidth={2}
                    tension={0.5}
                    lineCap="round"
                  />
                ))}
              </Layer>
            </Stage>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default StudyRoom;