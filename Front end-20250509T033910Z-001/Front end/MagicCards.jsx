import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function MagicDeals() {
  const [magicDeals, setMagicDeals] = useState([]);
  const [isBranchUser, setIsBranchUser] = useState(false);
  const [newDeal, setNewDeal] = useState("");

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user && JSON.parse(user).role === 'branch') {
      setIsBranchUser(true);
    }

    // Simulated API response
    const fetchMagicDeals = async () => {
      const data = [
        { id: 1, title: 'BOGO Burger Deal', text: 'Buy one burger, get one free!', imageUrl: 'https://img.delicious.com.au/9d27SNl7/del/2022/10/p89-salt-and-vinegar-crumbed-chicken-burger-176377-1.png', description: 'Limited time offer on all burgers.' },
        { id: 2, title: '20% Off Pasta', text: 'Get 20% off on all pasta dishes.', imageUrl: 'https://foxeslovelemons.com/wp-content/uploads/2021/11/Salmon-Alfredo-3.jpg', description: 'Enjoy a delicious pasta meal at a discount!' },
        { id: 3, title: 'Family Pizza Combo', text: 'Large Pizza + 2 Drinks + Garlic Bread', imageUrl: 'https://i.pinimg.com/originals/0b/5c/45/0b5c45cea4b46402fd331765330a528d.jpg', description: 'Perfect combo for the whole family!' },
        { id: 4, title: 'Free Dessert with Any Meal', text: 'Get a free dessert with any main course.', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4QnvkIXEVQY4Yu1QclTrQEMwfDFXKLjr8MA&s', description: 'Sweeten your meal with this special offer!' }
      ];
      setMagicDeals(data);
    };

    fetchMagicDeals();
  }, []);

  const handleAddDeal = async () => {
    if (!newDeal) return;

    const updatedDeals = [
      ...magicDeals, 
      { id: magicDeals.length + 1, title: 'New Deal', text: newDeal, imageUrl: 'https://source.unsplash.com/500x300/?food', description: 'A newly added magic deal.' }
    ];
    setMagicDeals(updatedDeals);
    setNewDeal("");
  };

  return (
    <div className="magic-deals-container">
      <h1>🔥 Magic Deals</h1>

      <div className="deals-grid">
        {magicDeals.length > 0 ? (
          magicDeals.map((deal) => (
            <div key={deal.id} className="magic-deal">
              <img src={deal.imageUrl} alt={deal.title} className="deal-image" />
              <div className="deal-details">
                <h2>{deal.title}</h2>
                <p><strong>Offer:</strong> {deal.text}</p>
                <p><strong>Description:</strong> {deal.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No magic deals available.</p>
        )}
      </div>

      {isBranchUser && (
        <div className="add-magic-deal">
          <input
            type="text"
            value={newDeal}
            onChange={(e) => setNewDeal(e.target.value)}
            placeholder="Add new deal..."
          />
          <button onClick={handleAddDeal}>Add Deal</button>
        </div>
      )}

      <div className="navigation-links">
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
}

export default MagicDeals;
