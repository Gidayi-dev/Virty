import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const [timerRunning, setTimerRunning] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const navigate = useNavigate();

  // Placeholder user data (replace with real data later)
  const user = { name: 'Amélie', studyHours: 12, tasksCompleted: 8, goals: { completed: 3, total: 5 } };

  const handleLogout = () => {
    toast.info('Logging out...', { autoClose: 2000 });
    setTimeout(() => navigate('/login'), 2000);
  };

  const togglePomodoro = () => {
    setTimerRunning(!timerRunning);
    if (!timerRunning) {
      toast.success('Pomodoro started! 25 minutes of focus.', { autoClose: 2000 });
    } else {
      toast.info('Pomodoro paused.', { autoClose: 2000 });
    }
  };

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
      toast.success('Task added!', { autoClose: 2000 });
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    toast.info(updatedTasks[index].completed ? 'Task completed!' : 'Task unmarked.', { autoClose: 2000 });
  };

  const joinRoom = (roomType, path) => {
    toast.success(`Joining ${roomType} room...`, { autoClose: 2000 });
    setTimeout(() => navigate(path, { state: { roomType } }), 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation Bar */}
      <div className="bg-[#7D1C4A] text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Virtual Study Room</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm">Hello, {user.name}</span>
          <button
            onClick={handleLogout}
            className="bg-[#D17D98] text-white px-4 py-2 rounded-lg hover:bg-[#7D1C4A]"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 max-w-5xl mx-auto">
        {/* Welcome Message */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-[#7D1C4A]">Welcome to Your Dashboard</h2>
          <p className="text-gray-600">Stay productive and study smarter!</p>
        </div>

        {/* Study Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-sm text-gray-600">Study Hours (Week)</p>
            <p className="text-3xl font-bold text-[#7D1C4A]">{user.studyHours}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-sm text-gray-600">Tasks Completed</p>
            <p className="text-3xl font-bold text-[#7D1C4A]">{user.tasksCompleted}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-sm text-gray-600">Goals Achieved</p>
            <p className="text-3xl font-bold text-[#7D1C4A]">{user.goals.completed}/{user.goals.total}</p>
          </div>
        </div>

        {/* Study Rooms */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-lg font-semibold text-[#7D1C4A] mb-4">Join a Study Room</h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => joinRoom('Silent', '/silent-room')}
              className="bg-[#D17D98] text-white px-6 py-2 rounded-lg hover:bg-[#7D1C4A]"
            >
              Silent Room
            </button>
            <button
              onClick={() => joinRoom('Group', '/group-room')}
              className="bg-[#D17D98] text-white px-6 py-2 rounded-lg hover:bg-[#7D1C4A]"
            >
              Group Room
            </button>
            <button
              onClick={() => joinRoom('Custom', '/custom-room')}
              className="bg-[#D17D98] text-white px-6 py-2 rounded-lg hover:bg-[#7D1C4A]"
            >
              Create Room
            </button>
          </div>
        </div>

        {/* Productivity Tools */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pomodoro Timer */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-[#7D1C4A] mb-4">Pomodoro Timer</h2>
            <div className="text-left">
              <p className="text-2xl font-bold text-gray-700 mb-4">{timerRunning ? '25:00' : 'Stopped'}</p>
              <button
                onClick={togglePomodoro}
                className="bg-[#D17D98] text-white px-6 py-2 rounded-lg hover:bg-[#7D1C4A]"
              >
                {timerRunning ? 'Pause' : 'Start'}
              </button>
            </div>
          </div>

          {/* Task List */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-[#7D1C4A] mb-4">Quick Tasks</h2>
            <form onSubmit={addTask} className="mb-4">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a task"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D17D98]"
              />
            </form>
            <ul className="max-h-32 overflow-y-auto">
              {tasks.map((task, index) => (
                <li key={index} className="flex items-center py-1">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(index)}
                    className="mr-2 h-4 w-4 text-[#D17D98] border-gray-300 rounded focus:ring-[#D17D98]"
                  />
                  <span
                    className={`text-sm text-gray-700 ${task.completed ? 'line-through text-gray-400' : ''}`}
                  >
                    {task.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default Dashboard;