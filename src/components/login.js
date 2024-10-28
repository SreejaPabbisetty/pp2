// src/components/Login.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './login.css';
import Scroll from './scroll'; 

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    userType: 'USER' // Default user type
  });

  const [monitoringData, setMonitoringData] = useState({
    userId: '',
    monitoringPassword: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleMonitoringChange = (e) => {
    const { name, value } = e.target;
    setMonitoringData({ ...monitoringData, [name]: value });
  };

  const handleUserTypeChange = (type) => {
    setLoginData({ ...loginData, userType: type });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', loginData);
      console.log('Login successful:', response.data);
      setErrorMessage(''); // Reset error message on success
      // Handle successful login (e.g., redirect or show success message)
    } catch (error) {
      const message = error.response ? error.response.data : error.message;
      setErrorMessage(message); // Set error message to state
      console.error('Error during login:', message);
    }
  };

  const handleMonitoringSubmit = (e) => {
    e.preventDefault();
    console.log('Parental Monitoring submitted:', monitoringData);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <div className="user-type-container">
          <div 
            className={`user-type-button ${loginData.userType === 'USER' ? 'active' : ''}`}
            onClick={() => handleUserTypeChange('USER')}
          >
            USER
          </div>
          <div 
            className={`user-type-button ${loginData.userType === 'ADMIN' ? 'active' : ''}`}
            onClick={() => handleUserTypeChange('ADMIN')}
          >
            ADMIN
          </div>
          <div className={`indicator ${loginData.userType}`} />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleLoginSubmit}>
          <div className="form-group">
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
        <p>
          New user? <Link to="/signup">Signup</Link> | <Link to="/forgot-password">Forgot Password?</Link>
        </p>
      </div>

      <div className="monitoring-container">
        <h2>Parental Monitoring</h2>
        <form onSubmit={handleMonitoringSubmit}>
          <div className="form-group">
            <label>
              User ID:
              <input
                type="text"
                name="userId"
                value={monitoringData.userId}
                onChange={handleMonitoringChange}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Password:
              <input
                type="password"
                name="monitoringPassword"
                value={monitoringData.monitoringPassword}
                onChange={handleMonitoringChange}
                required
              />
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <Scroll />
    </div>
  );
};

export default Login;
