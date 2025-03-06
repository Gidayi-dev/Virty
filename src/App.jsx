import { Routes, Route } from "react-router-dom";
import SignUp from "./components/home/signup";
import Login from "./components/home/login";
import Dashboard from "./components/home/dashboard";
import StudyRoom from "./components/rooms/studyroom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/studyroom" element={<StudyRoom />} />
    </Routes>
  );
}

export default App;