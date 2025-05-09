import { useState } from 'react';
import '../styles.css';
import axios from 'axios';

function FranchiseRegistration() {
  const [franchiseName, setFranchiseName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [amount, setAmount] = useState('');
  const [noOfPersons, setNoOfPersons] = useState('');
  const [message, setMessage] = useState('');  // For success/failure messages

  const handleRegistration = async (e) => {
    e.preventDefault();

    const franchiseData = {
      franchiseName,
      phoneNumber,
      location,
      amount,
      noOfPersons,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/franchise/register', franchiseData);
      setMessage('Franchise registered successfully');
      console.log(response.data);
    } catch (err) {
      setMessage('Failed to register franchise');
      console.error(err);
    }
  };

  return (
    <div className="auth-form">
      <h2>Franchise Registration</h2>
      <form onSubmit={handleRegistration}>
        <input
          type="text"
          placeholder="Franchise Name"
          value={franchiseName}
          onChange={(e) => setFranchiseName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="No. of Persons"
          value={noOfPersons}
          onChange={(e) => setNoOfPersons(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>

      {/* Display the message */}
      {message && <p>{message}</p>}
    </div>
  );
}

export default FranchiseRegistration;
