import { useState } from 'react';
import "../styles.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BranchLogin() {
  const [branchUsername, setBranchUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/branchAuth/login', {
        branchUsername,
        password,
      });

      setSuccessMessage('Branch logged in successfully!');
      setErrorMessage('');

      console.log(response.data);

      navigate(`/branch-auth/${branchUsername}`);
    } catch (err) {
      if (err.response) {
        console.error("Error response data:", err.response.data);
        console.error("Error response status:", err.response.status);
        console.error("Error response headers:", err.response.headers);
        setErrorMessage('Failed to login. Please check your username and password.');
      } else if (err.request) {
        console.error("Error request data:", err.request);
        setErrorMessage('No response received from the server. Please try again later.');
      } else {
        console.error("Error message:", err.message);
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
      setSuccessMessage('');
    }
  };

  return (
    <div className="auth-form">
      <h2>Branch Login</h2>

      {successMessage && <p className="success-message">{successMessage}</p>}

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Branch Username"
          value={branchUsername}
          onChange={(e) => setBranchUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      <p>Don't have an account? <a href="/branch-signup">Branch Sign Up</a></p>
    </div>
  );
}

export default BranchLogin;
