import React from 'react';
function HomePage({ onConsumerSignup, onAdminSignup ,onAdminLogin,onConsumerLogin}) {
  return (
    <div>
      <h1>Welcome to Our Website!</h1>
      <p>Please sign up as a:</p>
      <button onClick={onConsumerLogin}>Consumer</button>
      <button onClick={onAdminLogin}>Admin</button>
    </div>
  );
}

export default HomePage;