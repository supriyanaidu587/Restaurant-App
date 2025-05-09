import React, { useState, useEffect } from 'react';

function JobApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      const response = await fetch('/api/job/applications');
      const data = await response.json();
      setApplications(data);
      setLoading(false);
    };
    fetchApplications();
  }, []);

  const handleApproval = async (applicationId) => {
    await fetch(`/api/job/approve/${applicationId}`, { method: 'POST' });
    setApplications(applications.filter(app => app.id !== applicationId)); // Remove approved app
  };

  const handleRejection = async (applicationId) => {
    await fetch(`/api/job/reject/${applicationId}`, { method: 'POST' });
    setApplications(applications.filter(app => app.id !== applicationId)); // Remove rejected app
  };

  return (
    <div>
      <h1>Job Applications</h1>
      {loading ? <p>Loading...</p> : (
        <ul>
          {applications.map((application) => (
            <li key={application.id}>
              <h3>{application.name}</h3>
              <p>{application.details}</p>
              <button onClick={() => handleApproval(application.id)}>Approve</button>
              <button onClick={() => handleRejection(application.id)}>Reject</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default JobApplications;
