import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function EnrollmentForm({ token, Ranking, setEnrollmentButtonVisible }) {
  const [formData, setFormData] = useState({
    name: '',
    rationCardNo: '',
    aadharNo: '',
    familyMembers: 1,
    familyDetails: [{ name: '', age: '' }],
    token: token || '' // Include token as another parameter in the form object
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFamilyMembersChange = (e) => {
    const members = parseInt(e.target.value);
    setFormData({
      ...formData,
      familyMembers: members,
      familyDetails: Array.from({ length: members }, () => ({ name: '', age: '' }))
    });
  };

  const handleFamilyDetailChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFamilyDetails = [...formData.familyDetails];
    updatedFamilyDetails[index][name] = value;
    setFormData({ ...formData, familyDetails: updatedFamilyDetails });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/submitEnrollmentForm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // API call successful
        // Navigate to the consumer page with Aadhar number as a URL parameter
        setEnrollmentButtonVisible(false);
        Ranking();
        // Enrollment visible is false
        navigate(`/consumer?aadharNo=${formData.aadharNo}`);
        // Show success toast
        toast.success('Enrolled successfully!');
      } else {
        // Handle API errors
        console.error('Enrollment failed');
        // Show error toast
        toast.error('Enrollment failed');
      }
    } catch (error) {
      console.error('Error enrolling:', error);
      // Show error toast
      toast.error('Error enrolling');
    }
  };

  return (
    <div>
      <h2>Enrollment Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="rationCardNo">Ration Card No.:</label>
          <input
            type="text"
            id="rationCardNo"
            name="rationCardNo"
            value={formData.rationCardNo}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="aadharNo">Aadhar No.:</label>
          <input
            type="text"
            id="aadharNo"
            name="aadharNo"
            value={formData.aadharNo}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="familyMembers">Number of Family Members:</label>
          <select
            id="familyMembers"
            name="familyMembers"
            value={formData.familyMembers}
            onChange={handleFamilyMembersChange}
          >
            {[...Array(10).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>{num + 1}</option>
            ))} 
          </select>
        </div>
        {formData.familyDetails.map((member, index) => (
          <div key={index}>
            <label htmlFor={`familyMemberName${index}`}>Name:</label>
            <input
              type="text"
              id={`familyMemberName${index}`}
              name="name"
              value={member.name}
              onChange={(e) => handleFamilyDetailChange(index, e)}
            />
            <label htmlFor={`familyMemberAge${index}`}>Age:</label>
            <input
              type="text"
              id={`familyMemberAge${index}`}
              name="age"
              value={member.age}
              onChange={(e) => handleFamilyDetailChange(index, e)}
            />
          </div>
        ))}
        <button type="submit">Enroll</button>
      </form>
    </div>
  );
}

export default EnrollmentForm;
