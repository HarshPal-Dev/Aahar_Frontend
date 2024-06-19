import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Assuming you're using react-toastify for toast messages

const ConsumerLoginPage = () => {
  const [formData, setFormData] = useState({
    Aadhar: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/loginConsumer`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        // API call successful
        // Navigate to the consumer page
        navigate('/consumer');
        // Show success toast
        toast.success('Logged in successfully!');
      } else {
        // Handle API errors
        console.error('Login failed');
        // Show error toast
        toast.error('Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      // Show error toast
      toast.error('Error logging in');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Aadhar">Aadhar Number:</label>
          <input
            type="text"
            id="Aadhar"
            name="Aadhar"
            value={formData.Aadhar}
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
        <button type="submit">Log In</button>
      </form>
      
    </div>
  );
};

export default ConsumerLoginPage;
