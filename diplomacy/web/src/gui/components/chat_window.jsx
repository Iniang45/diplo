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
  const [showHistory, setShowHistory] = useState(false); // État pour afficher ou masquer la fenêtre des anciens messages

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
          {recipientPower === "GLOBAL" ? "General" : recipientPower}{" "}
          {/* Affiche "General" si recipientPower est GLOBAL */}
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
          ref={(input) => (messageInput = input)} // Référence directe au champ de texte
        />
        <button className="send-button" onClick={handleSendMessage}>
          ➤
        </button>
      </div>
      <button
        className="history-button"
        onClick={() => setShowHistory(true)} // Affiche la fenêtre des anciens messages
      >
        View History
      </button>
      {showHistory && (
        <div className="message-history-window">
          <button
            className="close-history-button"
            onClick={() => setShowHistory(false)} // Ferme la fenêtre des anciens messages
          >
            Close
          </button>
          <div className="message-history">
            {/* Affiche les anciens messages */}
            {renderPastMessages && renderPastMessages()}
          </div>
        </div>
      )}
    </div>
  );
};
