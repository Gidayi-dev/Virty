import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Stage, Layer, Line, Text } from 'react-konva';

const StudyRoom = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [timer, setTimer] = useState(25 * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [lines, setLines] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isWhiteboardOpen, setIsWhiteboardOpen] = useState(false);
  const [textContent, setTextContent] = useState('');
  const [texts, setTexts] = useState([]);
  const [participants, setParticipants] = useState([
    { name: 'You', micOn: true, camOn: true },
    { name: 'John', micOn: true, camOn: true },
    { name: 'Gidayi', micOn: true, camOn: true },
    { name: 'You', micOn: true, camOn: true },
    { name: 'John', micOn: true, camOn: true },
    { name: 'Gidayi', micOn: true, camOn: true },
    { name: 'You', micOn: true, camOn: true },
    { name: 'John', micOn: true, camOn: true },
    { name: 'Gidayi', micOn: true, camOn: true },
  ]);
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

  // Whiteboard Logic
  const handleMouseDown = (e) => {
    const pos = e.target.getStage().getPointerPosition();
    if (isErasing) {
      setLines((prev) =>
        prev.filter((line) => {
          const points = line.points;
          for (let i = 0; i < points.length - 1; i += 2) {
            const x = points[i];
            const y = points[i + 1];
            if (Math.hypot(x - pos.x, y - pos.y) < 15) return false;
          }
          return true;
        })
      );
    } else {
      setIsDrawing(true);
      setLines([...lines, { points: [pos.x, pos.y] }]);
    }
  };

  const handleMouseMove = (e) => {
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    if (isDrawing && !isErasing) {
      let lastLine = lines[lines.length - 1];
      lastLine.points = lastLine.points.concat([point.x, point.y]);
      setLines([...lines.slice(0, -1), lastLine]);
    } else if (isErasing) {
      setLines((prev) =>
        prev.filter((line) => {
          const points = line.points;
          for (let i = 0; i < points.length - 1; i += 2) {
            const x = points[i];
            const y = points[i + 1];
            if (Math.hypot(x - point.x, y - point.y) < 15) return false;
          }
          return true;
        })
      );
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const toggleMic = (index) => {
    setParticipants((prev) =>
      prev.map((p, i) => (i === index ? { ...p, micOn: !p.micOn } : p))
    );
    toast.info(`${participants[index].name} ${participants[index].micOn ? 'unmuted' : 'muted'} mic`, { autoClose: 1000 });
  };

  const toggleCam = (index) => {
    setParticipants((prev) =>
      prev.map((p, i) => (i === index ? { ...p, camOn: !p.camOn } : p))
    );
    toast.info(`${participants[index].name} ${participants[index].camOn ? 'turned off' : 'turned on'} camera`, { autoClose: 1000 });
  };

  const addTextToWhiteboard = (e) => {
    e.preventDefault();
    if (textContent.trim()) {
      setTexts([...texts, { text: textContent, x: 50, y: texts.length * 30 + 50 }]);
      setTextContent('');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation Bar */}
      <div className="bg-[#56021F] text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">{roomType} Room</h1>
        <button
          onClick={leaveRoom}
          className="bg-[#D17D98] text-white px-4 py-2 rounded-lg hover:bg-[#7D1C4A]"
        >
          Leave Room
        </button>
      </div>

      {roomType === 'Group' ? (
        <>
          {/* Group Room Toolbar */}
          <div className="absolute top-16 right-6 flex items-center space-x-4 bg-white p-2 rounded-lg shadow-md z-20">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-700">{formatTime(timer)}</span>
              <button
                onClick={togglePomodoro}
                className="text-white p-2 rounded-full bg-[#D17D98] hover:bg-[#7D1C4A]"
              >
                {timerRunning ? '⏸️' : '▶️'}
              </button>
            </div>
            <div className="relative group">
              <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="text-[#7D1C4A] p-2 rounded-full cursor-pointer hover:bg-[#F4CCE9]"
              >
                💬
              </button>
              <span className="absolute hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2 -top-8 left-1/2 transform -translate-x-1/2">
                Chat
              </span>
            </div>
            <div className="relative group">
              <button
                onClick={() => setIsWhiteboardOpen(!isWhiteboardOpen)}
                className="text-[#7D1C4A] p-2 rounded-full cursor-pointer hover:bg-[#F4CCE9]"
              >
                ✏️
              </button>
              <span className="absolute hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2 -top-8 left-1/2 transform -translate-x-1/2">
                Whiteboard
              </span>
            </div>
          </div>

          {/* Group Room Main Content */}
          <div className="p-6 max-w-6xl mx-auto flex flex-col h-[calc(100vh-80px)]">
            <div className="flex-grow bg-white p-6 rounded-lg shadow-md overflow-y-auto">
              <h2 className="text-lg font-semibold text-[#7D1C4A] mb-4">Participants</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {participants.map((participant, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 p-4 rounded-lg flex flex-col items-center justify-center relative"
                  >
                    <div className="w-16 h-16 bg-[#D17D98] rounded-full flex items-center justify-center text-white text-2xl mb-2">
                      {participant.name[0]}
                    </div>
                    <span className="text-[#7D1C4A] font-semibold">{participant.name}</span>
                    <div className="flex space-x-2 mt-2">
                      <button
                        onClick={() => toggleMic(index)}
                        className={`p-2 rounded-full ${participant.micOn ? 'text-[#7D1C4A] cursor-pointer hover:bg-[#F4CCE9]' : 'text-gray-400 bg-gray-200'}`}
                      >
                        {participant.micOn ? '🎙️' : '🔇'}
                      </button>
                      <button
                        onClick={() => toggleCam(index)}
                        className={`p-2 rounded-full ${participant.camOn ? 'text-[#7D1C4A] cursor-pointer hover:bg-[#F4CCE9]' : 'text-gray-400 bg-gray-200'}`}
                      >
                        {participant.camOn ? '🎥' : '📷'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Group Room Chat Panel */}
          {isChatOpen && (
            <div className="fixed top-24 right-6 w-80 bg-white p-6 rounded-lg shadow-lg h-[calc(100vh-96px)] z-10">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-[#7D1C4A]">Chat</h2>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="text-[#7D1C4A] cursor-pointer hover:text-[#D17D98]"
                >
                  ✕
                </button>
              </div>
              <div className="h-[70%] overflow-y-auto mb-4">
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
          )}

          {/* Group Room Whiteboard */}
          {isWhiteboardOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
              <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 h-3/4 relative">
                <button
                  onClick={() => setIsWhiteboardOpen(false)}
                  className="absolute top-2 right-2 text-[#7D1C4A] cursor-pointer hover:text-[#D17D98]"
                >
                  ✕
                </button>
                <h3 className="text-lg font-semibold text-[#7D1C4A] mb-4">Whiteboard</h3>
                <div className="flex items-center space-x-4 mb-4">
                  <button
                    onClick={() => setIsErasing(false)}
                    className={`p-2 rounded-full ${!isErasing ? 'bg-[#D17D98] text-white' : 'text-[#7D1C4A] hover:bg-[#F4CCE9]'}`}
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => setIsErasing(true)}
                    className={`p-2 rounded-full ${isErasing ? 'bg-[#D17D98] text-white' : 'text-[#7D1C4A] hover:bg-[#F4CCE9]'}`}
                  >
                    🧹
                  </button>
                </div>
                <form onSubmit={addTextToWhiteboard} className="mb-4">
                  <input
                    type="text"
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    placeholder="Type text here..."
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D17D98]"
                  />
                </form>
                <Stage
                  width={800}
                  height={500}
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
                    {texts.map((textObj, i) => (
                      <Text
                        key={i}
                        x={textObj.x}
                        y={textObj.y}
                        text={textObj.text}
                        fontSize={20}
                        fill="#7D1C4A"
                      />
                    ))}
                  </Layer>
                </Stage>
              </div>
            </div>
          )}
        </>
      ) : (
        /* Silent Room */
        <div className="p-6 max-w-6xl mx-auto flex flex-col h-[calc(100vh-80px)] justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-lg font-semibold text-[#7D1C4A] mb-4">Focus Time</h2>
            <div className="flex items-center justify-center space-x-4">
              <span className="text-4xl font-bold text-gray-700">{formatTime(timer)}</span>
              <button
                onClick={togglePomodoro}
                className="bg-[#D17D98] text-white p-3 rounded-full hover:bg-[#7D1C4A]"
              >
                {timerRunning ? '⏸️' : '▶️'}
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4">A quiet space for individual study.</p>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" />
    </div>
  );
};

export default StudyRoom;