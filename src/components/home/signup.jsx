import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaApple, FaGoogle } from 'react-icons/fa';

const SignUp = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    toast.success('Account created successfully!', { autoClose: 2000 });
    setTimeout(() => navigate('/login'), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(to right, rgb(204, 203, 199), rgb(241, 230, 158))' }}>
      <div className="flex bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-4xl">
        <div
          className="w-1/2 bg-cover bg-center rounded-2xl"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/904616/pexels-photo-904616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
          }}
        ></div>

        <div className="w-1/2 p-8">
          <h1 className="text-2xl font-bold mb-2 text-center text-gray-400">Create an account</h1>
          <p className="text-center mb-6">
            <a href="/login">Already have an account? Sign In</a>
          </p>

          <form onSubmit={handleSignUp}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="fullname">
                Full name
              </label>
              <input
                type="text"
                id="fullname"
                className="w-full px-3 py-2 rounded-xl cursor-pointer border"
                placeholder="Amélie Laurent"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 rounded-xl cursor-pointer border"
                placeholder="amélielaurent7622@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 rounded-xl cursor-pointer border"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-300 text-white py-2 rounded-xl hover:bg-orange-500 cursor-pointer"
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm">Or sign up with</p>
            <div className="flex justify-center space-x-4 mt-4">
              <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center cursor-pointer">
                <FaApple className="mr-2" />
                <span>Apple</span>
              </button>
              <button className="bg-gray-600 text-white px-4 py-2 rounded-xl flex items-center cursor-pointer">
                <FaGoogle className="mr-2" />
                <span>Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default SignUp;