import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [isBranchUser, setIsBranchUser] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user && JSON.parse(user).role === 'branch') {
      setIsBranchUser(true);
    }

    const fetchMenuItems = async () => {
      const data = [
        {
          id: 1,
          name: 'Classic Burger',
          description: 'Juicy beef patty with cheese, lettuce, and tomato.',
          price: 8.99,
          imageUrl: 'https://img.delicious.com.au/9d27SNl7/del/2022/10/p89-salt-and-vinegar-crumbed-chicken-burger-176377-1.png',
        },
        {
          id: 2,
          name: 'Spicy Chicken Wings',
          description: 'Crispy wings tossed in spicy buffalo sauce.',
          price: 10.99,
          imageUrl: 'https://th.bing.com/th/id/OIP.Zun97KETf-DQXz6QHlgPLwHaJQ?rs=1&pid=ImgDetMain',
        },
        {
          id: 3,
          name: 'Pasta Alfredo',
          description: 'Creamy Alfredo sauce over fettuccine pasta.',
          price: 12.49,
          imageUrl: 'https://foxeslovelemons.com/wp-content/uploads/2021/11/Salmon-Alfredo-3.jpg',
        },
        {
          id: 4,
          name: 'Veggie Pizza',
          description: 'Loaded with bell peppers, olives, and mushrooms.',
          price: 11.99,
          imageUrl: 'https://i.pinimg.com/originals/0b/5c/45/0b5c45cea4b46402fd331765330a528d.jpg',
        },
        {
          id: 5,
          name: 'Chocolate Lava Cake',
          description: 'Warm chocolate cake with a molten center.',
          price: 6.99,
          imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4QnvkIXEVQY4Yu1QclTrQEMwfDFXKLjr8MA&s',
        },
      ];

      setMenuItems(data);
    };

    fetchMenuItems();
  }, []);

  return (
    <div className="menu-container">
      <h1>Our Menu</h1>

      <div className="menu-grid">
        {menuItems.map((item) => (
          <div key={item.id} className="menu-item">
            <img src={item.imageUrl} alt={item.name} className="menu-image" />
            <div className="menu-info">
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <p className="menu-price">${item.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      {isBranchUser && (
        <div className="navigation-links">
          <Link to="/branch-menu-management">
            <button className="manage-menu-btn">Manage Menu</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Menu;
