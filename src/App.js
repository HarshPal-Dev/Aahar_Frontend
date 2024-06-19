import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import ConsumerSignupPage from './components/ConsumerSignupPage';
import ConsumerPage from './components/ConsumerPage';
import AdminPage from './components/AdminPage';
import AboutUsPage from './components/AboutUsPage';
import ConsumerLoginPage from './components/ConsumerLoginPage';
import AdminLoginPage from './components/AdminLoginPage';
function App() {
  const [isConsumerLoggedIn, setConsumerLoggedIn] = useState(false);
  const [isAdminLoggedIn, setAdminLoggedIn] = useState(false);
  const navigate = useNavigate(); // Import and use useNavigate hook

  const handleConsumerLogin = () => {
    setConsumerLoggedIn(true);
    navigate('/consumer'); // Navigate to '/consumer' after login
  };

  const handleAdminLogin = () => {
    setAdminLoggedIn(true);
    navigate('/admin'); // Navigate to '/admin' after login
  };

  return (
   
      <div>
        <Routes>
          <Route exact path="/" element={<HomePage 
            onConsumerSignup={() => navigate('/consumer/signup')}
            onAdminLogin={() => navigate('/admin/login')}
            onConsumerLogin={() => navigate('/consumer/login')}
          />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/consumer/signup" element={<ConsumerSignupPage handleConsumerLogin={handleConsumerLogin} />} />
          <Route path="/admin/login" element={<AdminLoginPage handleAdminLogin={handleAdminLogin} />} />
          <Route path="/consumer/login" element={<ConsumerLoginPage handleConsumerLogin={handleConsumerLogin} />} />
          {isConsumerLoggedIn && <Route path="/consumer" element={<ConsumerPage />} />}
          {isAdminLoggedIn && <Route path="/admin" element={<AdminPage />} />}
        </Routes>
      </div>
   
  );
}
export default App;