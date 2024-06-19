import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Card = ({ enrollmentData }) => {
  const [tokenNo, setTokenNo] = useState('');
  const [isTokenCorrect, setIsTokenCorrect] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleTokenNoChange = (event) => {
    setTokenNo(event.target.value);
  };

  const handleSubmit = () => {
    if (tokenNo === enrollmentData.tokenNo) {
      setIsTokenCorrect(true);
      toast.success('Token number matched successfully');
      setFormSubmitted(true);
    } else {
      toast.error('Incorrect token number entered');
    }
  };

  useEffect(() => {
    const submitRationDelivery = async () => {
      if (isTokenCorrect && formSubmitted) {
        try {
          const response = await fetch(`${process.env.REACT_APP_BASE_URL}/createRationDelivery`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(enrollmentData)
          });
          if (response.ok) {
            toast.success('Ration delivery created successfully');
          } else {
            toast.error('Failed to create ration delivery');
          }
        } catch (error) {
          console.error('Error creating ration delivery:', error);
          toast.error('Error creating ration delivery');
        }
      }
    };

    submitRationDelivery();
  }, [isTokenCorrect, formSubmitted, enrollmentData]);

  return (
    <div>
      <h1>Enrollment Verification</h1>
      <div>
        {enrollmentData.name}
      </div>
      <div>
        {enrollmentData.rationCardNo}
      </div>
      <div>
        {enrollmentData.aadharNo}
      </div>
      <div>
        {enrollmentData.familyMembers}
      </div>

      {isTokenCorrect ? (
        <div>
          <img src="/verified-logo.png" alt="Verified" />
        </div>
      ) : (
        <div>
          <div>
            <label htmlFor="tokenNo">Enter Token Number:</label>
            <input 
              type="text" 
              id="tokenNo" 
              value={tokenNo} 
              onChange={handleTokenNoChange} 
              required 
            />
          </div>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Card;
