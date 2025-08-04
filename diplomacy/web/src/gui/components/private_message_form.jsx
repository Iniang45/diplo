import React, { useState } from "react";
import PropTypes from "prop-types";
import "./private_message_form.css";

export const PrivateMessageForm = ({
  connectedUsers,
  sendPrivateMessage,
  gameInstance,
  username,
  privateMessageUpdate,
}) => {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const privateMessages = gameInstance.getPrivateMessages(username);
  const visibleMessages = privateMessages; 

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!message) {
      alert("Please select a recipient and enter a message.");
      return;
    }
    sendPrivateMessage(recipient, message);
    setMessage("");
  };

  return (
    <div className="private-message-form">
      <h4>messages privés</h4>
      <form onSubmit={handleSubmit} className="pm-form">
        <div className="form-group" style={{ display: "flex", flexDirection: "column", marginBottom: 10 }}>
          <label htmlFor="private-recipient-select" style={{ marginBottom: 4, fontWeight: 500 }}>To :</label>
          <select
            id="private-recipient-select"
            className="form-control"
            value={recipient}
            onChange={(event) => setRecipient(event.target.value)}
          >
            <option value="" disabled>
              Sélectionner un utilisateur
            </option>
            {connectedUsers && connectedUsers.length > 0 ? (
              connectedUsers.map((username, index) => (
                <option key={index} value={username}>
                  {username}
                </option>
              ))
            ) : (
              <option disabled>Chargement...</option>
            )}
          </select>
        </div>
        <div className="form-group" style={{ display: "flex", flexDirection: "column", marginBottom: 10 }}>
          <label htmlFor="private-message-input" style={{ marginBottom: 4, fontWeight: 500 }}>Message :</label>
          <textarea
            id="private-message-input"
            className="form-control"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Écris ton message ici..."
            rows={3}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Envoyer
        </button>
      </form>

      <h4>Messages privés</h4>
      <div className="private-messages-list">
        {visibleMessages.length > 0 ? (
          visibleMessages.map((msg, index) => (
            <div
              key={index}
              className={
                "pm-bubble " +
                (msg.sender === username
                  ? "pm-bubble-sent"
                  : "pm-bubble-received")
              }
            >
              <div className="pm-bubble-header">
                <span className="pm-avatar">
                  {msg.sender.charAt(0).toUpperCase()}
                </span>
                <span className="pm-sender">
                  {msg.sender === username ? "Moi" : msg.sender}
                </span>
              </div>
              <div className="pm-bubble-body">{msg.message}</div>
            </div>
          ))
        ) : (
          <p className="pm-empty">Aucun message privé pour l’instant.</p>
        )}
      </div>
    </div>
  );
};

PrivateMessageForm.propTypes = {
  connectedUsers: PropTypes.arrayOf(PropTypes.string).isRequired,
  sendPrivateMessage: PropTypes.func.isRequired,
  gameInstance: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  privateMessageUpdate: PropTypes.number.isRequired,
};
