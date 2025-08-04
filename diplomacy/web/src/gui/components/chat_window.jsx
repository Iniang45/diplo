import React, { useState } from "react";
import "./chat_window.css";

export const ChatWindow = ({
  controlledPower,
  recipientPower,
  sendMessage,
  renderPastMessages, // Prop pour afficher les anciens messages
  onClose, // Prop pour fermer la fenêtre
  textColors, // Prop pour les couleurs des textes
}) => {
  let messageInput = null;

  const handleSendMessage = () => {
    const message = messageInput.value.trim();
    if (message) {
      sendMessage(recipientPower, message); // Utilise la méthode sendMessage existante
      messageInput.value = ""; // Réinitialise le champ de message après l'envoi
    }
  };

  return (
    <div className="message-window">
      <div className="message-header">
        <span
          className="controlled-power"
          style={{ color: textColors.controlledPower }}
        >
          {controlledPower} (you)
        </span>
        <span className="arrow">→</span>
        <span
          className="recipient-power"
          style={{ color: textColors.recipientPower }}
        >
          {recipientPower === "GLOBAL" ? "General" : recipientPower}
        </span>
        <button className="close-chat-button" onClick={onClose}>
          Close
        </button>
      </div>
      <div className="message-input-container">
        <input
          type="text"
          className="message-input"
          placeholder="Send Message"
          ref={(input) => (messageInput = input)}
        />
        <button className="send-button" onClick={handleSendMessage}>
          ➤
        </button>
      </div>
    </div>
  );
};
