import React, { useState, useEffect } from 'react';

function Profile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const userId = 'userId_here'; // Replace with the actual user ID (e.g., from auth context)

  useEffect(() => {
    fetch(`http://localhost:5000/api/auth/get-user-orders/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        setOrders(data.user.orders);
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });
  }, []);

  return (
    <div>
      {user && (
        <div>
          <h1>Profile</h1>
          <p>Username: {user.username}</p>
          <p>Phone Number: {user.phoneNumber}</p>
          <h2>Your Orders:</h2>
          <ul>
            {orders.map((order, index) => (
              <li key={index}>
                <p>Order Date: {new Date(order.date).toLocaleString()}</p>
                <p>Total Amount: ${order.totalAmount}</p>
                <h3>Items:</h3>
                <ul>
                  {order.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      {item.name} x {item.quantity}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Profile;
