import React, { useState } from 'react';
import '../styles.css';

function Home() {
  const [showMore, setShowMore] = useState(false);

  const handleReadMoreClick = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="home">
      <div className="left-side">
        <div className="welcome-message">
          <h1>Welcome to Magic Bites!</h1>
          <p>Experience the magic of flavors, crafted to perfection.</p>
          
          <button className="read-more" onClick={handleReadMoreClick}>
            {showMore ? 'Show Less' : 'Read More'}
          </button>

          {showMore && (
            <div className="additional-info">
              <p>
                At Magic Bites, we take pride in offering an unforgettable dining experience.
                From sizzling starters to delightful desserts, every dish is made with passion 
                and fresh ingredients. Whether you dine in or order online, we bring you the 
                best flavors, right to your table.
              </p>
              <p>
                Explore our diverse menu, enjoy exclusive deals, and let your taste buds 
                embark on a magical journey!
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="right-side">
        <img src="https://cdn.prod.website-files.com/66643a14df53b71d1ed72d08/669004b605b425bb4e5020c2_mobile-app_delivery.jpg" alt="Restaurant" className="moving-image" />
      </div>
    </div>
  );
}

export default Home;
