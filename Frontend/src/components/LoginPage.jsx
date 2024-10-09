import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("trying to loggin ")
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
        const response = await axios.post('http://localhost:4000/login', { email, password });
        console.log("Login successful!");
        toast.success("Logged in successfully!");
    } catch (error) {
      setError('Login failed: ' + (error.response?.data?.error || 'Internal server error'));
      toast.error('Login failed: ' + (error.response?.data?.error || 'Internal server error'));
    }
    console.log('Logging in with', { email, password });

    
    setError('');
   
  };

  return (
    <div className='h-full w-full relative bg-gray-200'>
      <div className='h-80 w-1/4 absolute inset-0 left-1/3 top-60 border-2 bg-white shadow-lg rounded-lg p-8'>
        <h2 className='text-xl font-bold mb-4 text-center'>Login</h2>
        {error && <p className='text-red-500 text-center'>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
        
            <input
              type='email'
              id='email'
              value={email}
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
              className='w-full p-2 border border-gray-300 rounded'
              required
            />
          </div>
          <div className='mb-4'>
          
            <input
              type='password'
              id='password'
              value={password}
              placeholder='password'
              onChange={(e) => setPassword(e.target.value)}
              className='w-full p-2 border border-gray-300 rounded'
              required
            />
          </div>
          <button
            type='submit'
            className='w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700'
          >
            Login
          </button>
        </form>
        <div className='mt-4 text-center'>
          <p>
            Don't have an account? <a href='/signup' className='text-blue-600'>Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
