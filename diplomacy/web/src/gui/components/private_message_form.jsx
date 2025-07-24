import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./private_message_form.css";

export const PrivateMessageForm = ({
  connectedUsers,
  sendPrivateMessage, // Remplace onSendPrivateMessage par sendPrivateMessage
  gameInstance, // Instance du jeu pour récupérer les messages privés
}) => {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [privateMessages, setPrivateMessages] = useState([]); // État pour les messages privés

  // Charger les messages privés au montage du composant
  useEffect(() => {
    if (gameInstance) {
      const messages = gameInstance.getPrivateMessages(); // Appel à la méthode de game.js
      setPrivateMessages(messages);
    }
  }, [gameInstance]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!message) {
      alert("Please select a recipient and enter a message.");
      return;
    }
    sendPrivateMessage(recipient, message); // Appelle sendPrivateMessage
    setMessage(""); // Clear the message input after sending
  };

  return (
    <div className="private-message-form">
      <h4>Send a Private Message</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="private-recipient-select">Select recipient:</label>
          <select
            id="private-recipient-select"
            className="form-control"
            value={recipient}
            onChange={(event) => setRecipient(event.target.value)}
          >
            <option value="" disabled>
              Select a user
            </option>
            {connectedUsers && connectedUsers.length > 0 ? (
              connectedUsers.map((username, index) => (
                <option key={index} value={username}>
                  {username}
                </option>
              ))
            ) : (
              <option disabled>Loading...</option>
            )}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="private-message-input">Message:</label>
          <textarea
            id="private-message-input"
            className="form-control"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Enter your message here..."
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Send
        </button>
      </form>

      <h4>Private Messages</h4>
      <div className="private-messages-list">
        {privateMessages.length > 0 ? (
          privateMessages.map((msg, index) => (
            <div key={index} className="private-message">
              <strong>{msg.sender}:</strong> {msg.body}
            </div>
          ))
        ) : (
          <p>No private messages yet.</p>
        )}
      </div>
    </div>
  );
};

PrivateMessageForm.propTypes = {
  connectedUsers: PropTypes.arrayOf(PropTypes.string).isRequired,
  sendPrivateMessage: PropTypes.func.isRequired, // Remplace onSendPrivateMessage
  gameInstance: PropTypes.object.isRequired, // Instance du jeu
};
