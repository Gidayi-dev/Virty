import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Stage, Layer, Line } from 'react-konva';

const SilentRoom = () => {
  const [timer, setTimer] = useState(25 * 60); // Pomodoro timer
  const [timerRunning, setTimerRunning] = useState(false);
  const [notes, setNotes] = useState(() => localStorage.getItem('silentRoomNotes') || ''); // Load saved notes
  const [lines, setLines] = useState([]); // Whiteboard lines
  const [isDrawing, setIsDrawing] = useState(false);
  const [isWhiteboardOpen, setIsWhiteboardOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
      setTimer(25 * 60);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timer]);

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

  // Note-taking Logic
  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const saveNotes = () => {
    localStorage.setItem('silentRoomNotes', notes);
    toast.success('Notes saved!', { autoClose: 2000 });
  };

  // Whiteboard Logic
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

  const clearWhiteboard = () => {
    setLines([]);
    toast.info('Whiteboard cleared!', { autoClose: 2000 });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation Bar */}
      <div className="bg-[#56021F] text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">{roomType} Room</h1>
        <button
          onClick={leaveRoom}
          className="bg-[#D17D98] text-white px-4 py-2 rounded-lg cursor-pointer"
        >
          Leave Room
        </button>
      </div>

      {/* Main Content */}
      <div className="p-6 max-w-6xl mx-auto flex flex-col h-[calc(100vh-80px)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          {/* Left Column: Timer and Notepad */}
          <div className="flex flex-col space-y-6">
            {/* Pomodoro Timer */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h2 className="text-lg font-semibold text-[#7D1C4A] mb-4">Focus Time</h2>
              <div className="flex items-center justify-center space-x-4">
                <span className="text-4xl font-bold text-gray-700">{formatTime(timer)}</span>
                <button
                  onClick={togglePomodoro}
                  className="text-white p-3 rounded-full cursor-pointer"
                >
                  {timerRunning ? '⏸️' : '▶️'}
                </button>
              </div>
            </div>

            {/* Notepad */}
            <div className="bg-white p-6 rounded-lg shadow-md flex-grow">
              <h2 className="text-lg font-semibold text-[#7D1C4A] mb-4">Notes</h2>
              <textarea
                value={notes}
                onChange={handleNotesChange}
                placeholder="Jot down your thoughts..."
                className="w-full h-40 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D17D98] resize-none"
              />
              <button
                onClick={saveNotes}
                className="mt-4 bg-[#D17D98] text-white px-4 py-2 rounded-lg hover:bg-[#7D1C4A]"
              >
                Save Notes
              </button>
            </div>
          </div>

          {/* Right Column: Whiteboard Toggle */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-[#7D1C4A] mb-4 cursor-pointer">Whiteboard</h2>
            <button
              onClick={() => setIsWhiteboardOpen(!isWhiteboardOpen)}
              className="bg-[#D17D98] text-white px-6 py-2 rounded-lg"
            >
              {isWhiteboardOpen ? 'Close Whiteboard' : 'Open Whiteboard'}
            </button>
          </div>
        </div>
      </div>

      {/* Whiteboard Overlay */}
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
                onClick={clearWhiteboard}
                className="bg-[#D17D98] text-white px-4 py-2 rounded-lg hover:bg-[#7D1C4A] cursor-pointer"
              >
                Clear
              </button>
            </div>
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
              </Layer>
            </Stage>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" />
    </div>
  );
};

export default SilentRoom;