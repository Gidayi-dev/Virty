import { Routes, Route } from "react-router-dom";
import SignUp from "./components/home/signup";
import Login from "./components/home/login";
import Dashboard from "./components/home/dashboard";
import StudyRoom from "./components/rooms/studyroom"; // Group Room
import SilentRoom from "./components/rooms/silentroom"; // Import SilentRoom (adjust path if needed)

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/group-room" element={<StudyRoom />} />
      <Route path="/silent-room" element={<SilentRoom />} />
      <Route path="/custom-room" element={<StudyRoom />} /> {/* Placeholder for Custom Room */}
    </Routes>
  );
}

export default App;