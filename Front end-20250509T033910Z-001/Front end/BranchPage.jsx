import { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles.css";

function BranchPage() {
  const [menu, setMenu] = useState([]);
  const [newMenuItem, setNewMenuItem] = useState({
    _id: "",
    name: "",
    price: "",
    image: "",
  });
  const [loading, setLoading] = useState({ menu: true });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/menuRoutes/all');
      setMenu(response.data);
      setLoading({ menu: false });
    } catch (err) {
      if (err.response) {
        setMessage(`Error: ${err.response.data.message}`);
        console.error("Server Error: ", err.response.data);
      } else if (err.request) {
        setMessage("Error: No response from server.");
        console.error("Request Error: ", err.request);
      } else {
        setMessage("Error: Something went wrong.");
        console.error("General Error: ", err.message);
      }
      setLoading({ menu: false });
    }
  };

  const handleMenuSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/menuRoutes/update', {
        name: newMenuItem.name,
        price: newMenuItem.price,
        image: newMenuItem.image,
        _id: newMenuItem._id,
      });

      const result = response.data;
      if (result.message === "Menu updated successfully") {
        if (newMenuItem._id) {
          setMenu(menu.map(item => item._id === newMenuItem._id ? result.menuItem : item));
        } else {
          setMenu([...menu, result.menuItem]);
        }
        setNewMenuItem({ _id: "", name: "", price: "", image: "" });
        setMessage("Menu item added successfully!");
      }
    } catch (err) {
      if (err.response) {
        setMessage(`Error: ${err.response.data.message}`);
        console.error("Server Error: ", err.response.data);
      } else if (err.request) {
        setMessage("Error: No response from server.");
        console.error("Request Error: ", err.request);
      } else {
        setMessage("Error: Something went wrong.");
        console.error("General Error: ", err.message);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMenuItem({ ...newMenuItem, [name]: value });
  };

  const handleDeleteItem = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/menuItems/${id}`);
      const result = response.data;
      if (result.message === "Menu item deleted successfully") {
        setMenu(menu.filter(item => item._id !== id));
        setMessage("Menu item deleted successfully!");
      }
    } catch (err) {
      if (err.response) {
        setMessage(`Error: ${err.response.data.message}`);
        console.error("Server Error: ", err.response.data);
      } else if (err.request) {
        setMessage("Error: No response from server.");
        console.error("Request Error: ", err.request);
      } else {
        setMessage("Error: Something went wrong.");
        console.error("General Error: ", err.message);
      }
    }
  };

  return (
    <div className="branch-page">
      <h1>Menu Management</h1>

      {message && <p className="message">{message}</p>}

      <div className="form-container">
        <h3>Add New Menu Item</h3>
        <form onSubmit={handleMenuSubmit}>
          <input
            type="text"
            placeholder="Menu Item Name"
            name="name"
            value={newMenuItem.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            placeholder="Price"
            name="price"
            value={newMenuItem.price}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            name="image"
            value={newMenuItem.image}
            onChange={handleInputChange}
          />
          <button type="submit">
            {newMenuItem._id ? "Update Menu" : "Add Menu Item"}
          </button>
        </form>

        <button onClick={() => setNewMenuItem({ _id: "", name: "", price: "", image: "" })}>
          Add New Menu Item
        </button>
      </div>

      <h3>Current Menu</h3>
      {loading.menu ? (
        <p>Loading menu items...</p>
      ) : (
        <ul className="menu-list">
          {menu.length === 0 ? (
            <p>No menu items available.</p>
          ) : (
            menu.map((item) => (
              <li key={item._id} className="menu-item">
                <p>{item.name} - ${item.price}</p>
                {item.image && <img src={item.image} alt={item.name} width="100" />}
                <div className="menu-actions">
                  <button className="edit-btn" onClick={() => setNewMenuItem(item)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDeleteItem(item._id)}>Delete</button>
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export default BranchPage;
