import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Card from './Card'; // Assuming you have this component defined

function EnrollmentPage() {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/fetchEnrollmentsSortedByTime`);
        if (response.ok) {
          const data = await response.json();
          setEnrollments(data);
          toast.success('Enrollments fetched successfully');
        } else {
          console.error('Failed to fetch enrollments');
          toast.error('Failed to fetch enrollments');
        }
      } catch (error) {
        console.error('Error fetching enrollments:', error);
        toast.error('Error fetching enrollments');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Enrollments</h2>
      {enrollments.map((enrollment, index) => (
        <Card key={index} data={enrollment} rank={index} />
      ))}
    </div>
  );
}

export default EnrollmentPage;
