import React from 'react';
import { FaApple, FaGoogle } from 'react-icons/fa';

const SignUpForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(to right, rgb(204, 203, 199), rgb(241, 230, 158))' }}>
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl">
        {/* Image Section */}
        <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: 'url(./assets/SideImage)' }}></div>
        
        {/* Form Section */}
        <div className="w-1/2 p-8">
          <h1 className="text-2xl font-bold mb-6">Create an account</h1>
          <p className="mb-6">Sign up and get 30-day free trial</p>
          
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="fullname">Full name</label>
              <input
                type="text"
                id="fullname"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Amélie Laurent"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="amélielaurent7622@gmail.com"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-orange-300 text-white py-2 rounded-lg hover:bg-orange-500"
            >
              Submit
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm">Or sign up with</p>
            <div className="flex justify-center space-x-4 mt-4">
              <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center">
                <FaApple className="mr-2" />
                <span>Apple</span>
              </button>
              <button className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center">
                <FaGoogle className="mr-2" />
                <span>Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;