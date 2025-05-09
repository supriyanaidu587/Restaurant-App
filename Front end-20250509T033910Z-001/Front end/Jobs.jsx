import React, { useState } from "react";
import axios from "axios";
import "../styles.css";

function JobRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    age: "",
    role: "",
    branchLocation: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/job-registration/submit",
        formData
      );
      setMessage(response.data.message);
      // Reset form fields after submission
      setFormData({
        name: "",
        phoneNumber: "",
        age: "",
        role: "",
        branchLocation: "",
      });
    } catch (error) {
      setMessage("Failed to submit the registration. Please try again.");
      console.error("Error submitting job registration:", error);
    }
  };

  return (
    <div className="job-registration">
      <h1>Job Registration</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your Full Name"
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            placeholder="Your Phone Number"
          />
        </div>

        <div className="form-group">
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            placeholder="Your Age"
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            placeholder="Your Desired Role"
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            id="branchLocation"
            name="branchLocation"
            value={formData.branchLocation}
            onChange={handleChange}
            required
            placeholder="Your Preferred Branch Location"
          />
        </div>

        <button type="submit">Submit Registration</button>
      </form>

      {/* Display submission message */}
      {message && <p>{message}</p>}
    </div>
  );
}

export default JobRegistration;
