import React, { useState, useEffect } from "react";
import '../styles.css';  // Import the CSS file for styles

function OrderNow() {
  const [menu, setMenu] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentOption, setPaymentOption] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [tableNumber, setTableNumber] = useState("");
  const [branchName, setBranchName] = useState("");
  const [orderHistory, setOrderHistory] = useState([]);
  const [userId, setUserId] = useState("actual_user_id");

  useEffect(() => {
    fetch("http://localhost:5000/api/getmenuitems")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMenu(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching menu items:", error);
      });
  }, []);

  const handleQuantityChange = (itemId, quantity) => {
    setSelectedItems((prevItems) => {
      const updatedItems = [...prevItems];
      const existingItemIndex = updatedItems.findIndex((item) => item._id === itemId);

      if (existingItemIndex > -1) {
        updatedItems[existingItemIndex].quantity = quantity;
      } else {
        updatedItems.push({ _id: itemId, quantity });
      }
      return updatedItems;
    });
  };

  const handleCancelItem = (itemId) => {
    setSelectedItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
  };

  const calculateTotalAmount = () => {
    let totalAmount = 0;
    selectedItems.forEach((item) => {
      const menuItem = menu.find((menuItem) => menuItem._id === item._id);
      if (menuItem) {
        totalAmount += menuItem.price * item.quantity;
      }
    });
    return totalAmount;
  };

  const handlePlaceOrderForItem = (itemId) => {
    const quantity = prompt("Enter the quantity for this item:");
    if (quantity && !isNaN(quantity) && quantity > 0) {
      handleQuantityChange(itemId, parseInt(quantity));
    } else {
      alert("Please enter a valid quantity");
    }
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
  };

  const handlePaymentOption = (option) => {
    setPaymentOption(option);

    if (option === "online") {
      const totalAmount = calculateTotalAmount();
      const receiptData = {
        totalAmount,
        items: selectedItems,
      };
      setReceipt(receiptData);
    } else if (option === "offline") {
      setReceipt(null);
    }
  };

  const handleTableNumberChange = (e) => {
    setTableNumber(e.target.value);
  };

  const handleBranchNameChange = (e) => {
    setBranchName(e.target.value);
  };

  const handleOfflineReceipt = () => {
    const offlineReceiptData = {
      tableNumber,
      branchName,
      items: selectedItems,
    };
    setReceipt(offlineReceiptData);
  };

  return (
    <div className="order-container">
      <h1 className="header">Menu</h1>
      <div className="menu-row">
        {menu.map((item) => (
          <div key={item._id} className="menu-item">
            <img src={item.image} alt={item.name} className="item-image" />
            <div className="item-info">
              <p className="item-name">{item.name}</p>
              <p className="item-price">${item.price}</p>
            </div>
            <button className="order-button" onClick={() => handlePlaceOrderForItem(item._id)}>Place Order</button>
            {selectedItems.some((selectedItem) => selectedItem._id === item._id) && (
              <div className="item-quantity">
                <p>Quantity: {selectedItems.find((selectedItem) => selectedItem._id === item._id).quantity}</p>
                <button className="cancel-button" onClick={() => handleCancelItem(item._id)}>Cancel</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedItems.length > 0 && !orderPlaced && (
        <button className="final-order-button" onClick={handlePlaceOrder}>Place Final Order</button>
      )}

      {orderPlaced && (
        <div className="payment-options">
          <h2>Payment Options</h2>
          <button className="payment-button" onClick={() => handlePaymentOption("online")}>Pay Online</button>
          <button className="payment-button" onClick={() => handlePaymentOption("offline")}>Pay Offline</button>
        </div>
      )}

      {paymentOption === "offline" && (
        <div className="offline-payment">
          <h3>Offline Payment</h3>
          <label>
            Table Number:
            <input
              type="number"
              className="input-field"
              placeholder="Enter Table Number"
              value={tableNumber}
              onChange={handleTableNumberChange}
            />
          </label>
          <br />
          <label>
            Branch Name:
            <input
              type="text"
              className="input-field"
              placeholder="Enter Branch Name"
              value={branchName}
              onChange={handleBranchNameChange}
            />
          </label>
          <br />
          <button className="generate-receipt-button" onClick={handleOfflineReceipt}>Generate Offline Receipt</button>
        </div>
      )}

      {receipt && (
        <div className="receipt">
          <h3>Receipt</h3>
          {receipt.totalAmount && <p>Total Amount: ${receipt.totalAmount}</p>}
          {!receipt.totalAmount && (
            <p>
              Branch: {receipt.branchName}, Table: {receipt.tableNumber}
            </p>
          )}
          <p>Items:</p>
          <ul>
            {receipt.items.map((item) => (
              <li key={item._id}>
                {item.quantity} x {menu.find((menuItem) => menuItem._id === item._id).name}
              </li>
            ))}
          </ul>
          {receipt.totalAmount && <p>Total: ${receipt.totalAmount}</p>}
        </div>
      )}
    </div>
  );
}

export default OrderNow;
