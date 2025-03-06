import { Routes, Route } from "react-router-dom";
import SignUp from "./components/home/signup";
import Login from "./components/home/login";
import Dashboard from "./components/home/dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;