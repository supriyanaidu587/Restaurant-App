import { Link, useNavigate } from 'react-router-dom';
import '../styles.css';
import { useState, useEffect } from 'react';

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isBranchUser, setIsBranchUser] = useState(false);
  const [branches, setBranches] = useState([]);
  const [loadingBranches, setLoadingBranches] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);
      const parsedUser = JSON.parse(user);
      if (parsedUser.role === 'branch') {
        setIsBranchUser(true);
      }
    } else {
      setIsAuthenticated(false);
      setIsBranchUser(false);
    }
  }, []);

  useEffect(() => {
    setLoadingBranches(true);
    fetch("http://localhost:5000/api/branch-collection/getbranchcollection")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setBranches(data);
        } else {
          console.error("Unexpected response format:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching branches:", error);
      })
      .finally(() => {
        setLoadingBranches(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setIsBranchUser(false);
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">🍔 Magic Bites</Link>
      </div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/magic-cards">Magic Cards</Link>
        <Link to="/jobs">Jobs</Link>
        <Link to="/franchise">Franchise</Link>

        {!isBranchUser && (
          <>
            <Link to="/about-us">About Us</Link>
            <Link to="/contact-us">Contact Us</Link>
            <Link to="/order-now">Order Now</Link>
          </>
        )}

        <div className="branch-dropdown">
          <button className="dropdown-btn">
            Branches ▾
          </button>
          <div className="dropdown-content">
            {loadingBranches ? (
              <p>Loading branches...</p>
            ) : (
              <>
                <Link to="/branch-login">Branch Login</Link>
                {branches.length > 0 ? (
                  branches.slice(1).map((branch) => (
                    <Link to={`/branch/${branch.branchUsername}`} key={branch._id}>
                      {branch.branchUsername} - {branch.location}
                    </Link>
                  ))
                ) : (
                  <p>No branches found</p>
                )}
              </>
            )}
          </div>
        </div>

        {!isAuthenticated ? (
          <Link to="/login" className="auth-button">Login / Sign Up</Link>
        ) : (
          <button onClick={handleLogout} className="auth-button">
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;
