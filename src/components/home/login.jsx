import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login validation
    if (email === "user@example.com" && password === "password123") {
      toast.success("Signed in successfully!", { autoClose: 2000 });
      setTimeout(() => navigate("/home"), 2000); // Redirect after toast
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "linear-gradient(to right, #56021F, #7D1C4A)" }}
    >
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">
          Login to Your Account
        </h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#D17D98] outline-none"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#D17D98] outline-none"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#7D1C4A] text-white py-2 rounded-2xl hover:bg-[#56021F] cursor-pointer"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          Don't have an account? <a href="/signup" className="text-[#7D1C4A]">Sign Up</a>
        </p>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default Login;
