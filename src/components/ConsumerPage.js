import React, { useState, useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom'; // Remove BrowserRouter as Router
import EnrollmentPage from './EnrollmentPage';
import { useLocation } from 'react-router-dom';

const ConsumerPage = () => {
  const [enrollmentButtonVisible, setEnrollmentButtonVisible] = useState(true);
  const [deadlineDate] = useState("2024-04-30");
  const [token, setToken] = useState("");
  const [Rank, setRank] = useState(0);
  const [recentDate, setrecentDate] = useState("2024-04-30");
  const [prevDate, setprevDate] = useState("2024-04-30");
  const [consumerData, setConsumerData] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const aadharNo = searchParams.get('aadharNo');

  useEffect(() => {
    // Fetch consumer data when the page loads
    fetchConsumerData();
  }, []);

  const Ranking = () => {
    setrecentDate(Date.now);
    if (recentDate === prevDate) {
      setRank(Rank + 1);
    } else {
      setprevDate(Date.now);
      setRank(1);
    }
  };

  const fetchConsumerData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/fetchConsumerByAadhar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ aadharNo: aadharNo }) // Assuming aadhaarNo is defined somewhere
      });

      if (response.ok) {
        const data = await response.json();
        setConsumerData(data);
      } else {
        console.error('Failed to fetch consumer data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching consumer data:', error);
    }
  };

  const generateRandomToken = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  useEffect(() => {
    // Generate random token once
    const randomToken = generateRandomToken();
    setToken(randomToken);
  }, []);

  return (
    <div>
      <div>
        Deadline Date: {deadlineDate}
      </div>
      {enrollmentButtonVisible ? (
        Rank >= 150 ? (<div> come next day </div>) :
          (<Link to="/enrollment">
            <button>Enrollment</button>
          </Link>)
      ) : (
        <div>
          <p>Your enrollment is confirmed!</p>
          <div>Token No.: {token}</div>
          <div>
            {/* New div with consumer ranking information */}
            <p>Consumer Ranking: {Rank}</p>
          </div>
        </div>
      )}
      <Routes>
        <Route path="/enrollment" element={<EnrollmentPage token={token} Ranking={Ranking} setEnrollmentButtonVisible={setEnrollmentButtonVisible} />} />
      </Routes>
    </div>
  );
};

export default ConsumerPage;
