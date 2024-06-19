import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ConsumerSignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    aadharNo: '',
    mobileNo: '',
    rationNo: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/signupConsumer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        const data = await response.json();
        // Navigate to the consumer page with Aadhaar number as a query parameter
        navigate(`/consumer?aadhaarNo=${data.aadharNo}`);
        // Show success toast
        toast.success('Signed up successfully!');
      } else {
        // Handle API errors
        console.error('Sign up failed');
        // Show error toast
        toast.error('Sign up failed');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      // Show error toast
      toast.error('Error signing up');
    }
  };


  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="aadharNo">Aadhar Number:</label>
          <input
            type="text"
            id="aadharNo"
            name="aadharNo"
            value={formData.aadharNo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="mobileNo">Mobile Number:</label>
          <input
            type="tel"
            id="mobileNo"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="rationNo">Ration Number:</label>
          <input
            type="text"
            id="rationNo"
            name="rationNo"
            value={formData.rationNo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default ConsumerSignupPage;
