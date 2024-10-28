// src/components/Signup.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './signup.css';
import Scroll from './scroll'; 

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userType: 'USER' // Default user type
  });

  const [monitoringData, setMonitoringData] = useState({
    userId: '',
    monitoringPassword: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMonitoringChange = (e) => {
    const { name, value } = e.target;
    setMonitoringData({ ...monitoringData, [name]: value });
  };

  const handleUserTypeChange = (type) => {
    setFormData({ ...formData, userType: type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/signup', formData);
      console.log('Signup successful:', response.data);
      setErrorMessage(''); // Reset error message on success
      // Handle successful signup (e.g., redirect or show success message)
    } catch (error) {
      const message = error.response ? error.response.data : error.message;
      setErrorMessage(message); // Set error message to state
      console.error('Error during signup:', message);
    }
  };

  const handleMonitoringSubmit = (e) => {
    e.preventDefault();
    console.log('Parental Monitoring submitted:', monitoringData);
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>Sign Up</h2>
        <div className="user-type-container">
          <div 
            className={`user-type-button ${formData.userType === 'USER' ? 'active' : ''}`}
            onClick={() => handleUserTypeChange('USER')}
          >
            USER
          </div>
          <div 
            className={`user-type-button ${formData.userType === 'ADMIN' ? 'active' : ''}`}
            onClick={() => handleUserTypeChange('ADMIN')}
          >
            ADMIN
          </div>
          <div className={`indicator ${formData.userType}`} />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
        <p>
          Already registered? <Link to="/login">Login</Link>
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

export default Signup;
