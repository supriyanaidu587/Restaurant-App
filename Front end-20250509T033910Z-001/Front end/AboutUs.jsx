// AboutUs.jsx
import React from "react";
import "../styles.css";  

function AboutUs() {
  return (
    <div className="about-us">
      <h1>About Us</h1>
      <p>Welcome to our restaurant! We’re delighted to have you here. We aim to provide a unique dining experience with the finest quality food and exceptional service.</p>

      <section className="mission">
        <h2>Our Mission</h2>
        <p>Our mission is to create memorable moments through food. We believe that dining is not just about eating; it's about enjoying the experience, the company, and the flavors. Whether it's a casual meal or a special occasion, we aim to make every visit unforgettable.</p>
      </section>

      <section className="history">
        <h2>Our History</h2>
        <p>Founded in 2005, our restaurant started as a small local eatery with a dream of providing high-quality, freshly prepared dishes. Over the years, we’ve grown into a beloved spot for food enthusiasts, thanks to our commitment to authenticity and innovation in every dish we serve.</p>
      </section>

      <section className="history">
        <h2>Our Values</h2>
        <p>
          <li><strong>Quality</strong>: We use only the finest ingredients, sourced locally when possible, to ensure every dish is of the highest standard.</li>
          <li><strong>Community</strong>: We are proud to be a part of this community and believe in supporting local farmers and businesses.</li>
          <li><strong>Innovation</strong>: We constantly experiment with new flavors and techniques to create dishes that are both delicious and unique.</li>
          <li><strong>Hospitality</strong>: Providing exceptional service is at the heart of what we do. Our goal is to make every guest feel like part of our family.</li>
        </p>
      </section>

      <section className="team">
        <h2>Meet Our Team</h2>
        <p>Our restaurant is built on the passion and dedication of our team members, who work tirelessly to create a welcoming environment and a dining experience like no other. Here are some of the faces behind the magic:</p>
        <ul>
          <li>
            <strong>John Doe</strong> - Head Chef  
            <p>John is the mastermind behind our menu, bringing over 15 years of culinary expertise and a passion for fresh ingredients.</p>
          </li>
          <li>
            <strong>Jane Smith</strong> - Restaurant Manager  
            <p>Jane ensures that everything runs smoothly, from overseeing daily operations to making sure every guest has a wonderful experience.</p>
          </li>
          <li>
            <strong>Mark Johnson</strong> - Sous Chef  
            <p>Mark assists in the kitchen, helping bring our creative dishes to life with his skills and culinary artistry.</p>
          </li>
        </ul>
      </section>

      <section className="contact-info">
        <h2>Contact Us</h2>
        <p>If you have any questions, feel free to reach out. We would love to hear from you!</p>
        <p><strong>Email:</strong> info@ourrestaurant.com</p>
        <p><strong>Phone:</strong> (123) 456-7890</p>
        <p><strong>Address:</strong> 123 Delicious Street, Food City</p>
      </section>
    </div>
  );
}

export default AboutUs;
