import React, { useState, useEffect } from 'react';

function UpdateMagicCards() {
  const [cards, setCards] = useState([]);
  const [newCard, setNewCard] = useState('');
  
  useEffect(() => {
    const fetchCards = async () => {
      const response = await fetch('/api/magic-cards');
      const data = await response.json();
      setCards(data);
    };
    fetchCards();
  }, []);

  const handleAddCard = async () => {
    const response = await fetch('/api/magic-cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cardName: newCard }),
    });
    const newMagicCard = await response.json();
    setCards([...cards, newMagicCard]);
    setNewCard('');
  };

  return (
    <div>
      <h1>Update Magic Cards</h1>
      <input 
        type="text" 
        value={newCard} 
        onChange={(e) => setNewCard(e.target.value)} 
        placeholder="Add new magic card" 
      />
      <button onClick={handleAddCard}>Add Card</button>
      <ul>
        {cards.map((card) => (
          <li key={card.id}>{card.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UpdateMagicCards;
