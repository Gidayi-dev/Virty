import { Routes, Route } from "react-router-dom";
import SignUp from "./components/home/signup";
import Login from "./components/home/login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;