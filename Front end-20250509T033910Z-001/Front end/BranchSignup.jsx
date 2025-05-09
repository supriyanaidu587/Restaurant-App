import { useState } from 'react';
import '../styles.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BranchSignup() {
  const [branchUsername, setBranchUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [password, setPassword] = useState('');
  const [numOfEmployees, setNumOfEmployees] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!isValidPhoneNumber(phoneNumber)) {
      setMessage('Please enter a valid phone number');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/branchAuth/register', {
        branchUsername,
        phoneNumber,
        location,
        password,
        numOfEmployees,
      });
      setMessage('Branch signed up and logged in successfully!');
      console.log(response.data);

      navigate(`/branch-auth/${branchUsername}`);
    } catch (err) {
      setMessage('Failed to sign up');
      console.error(err);
    }
  };

  return (
    <div className="auth-form">
      <h2>Branch Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Branch Username"
          value={branchUsername}
          onChange={(e) => setBranchUsername(e.target.value)}
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
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Number of Employees"
          value={numOfEmployees}
          onChange={(e) => setNumOfEmployees(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default BranchSignup;
