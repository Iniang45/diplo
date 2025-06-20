import React, { useState } from "react";
import PropTypes from "prop-types";
import "./bandeau.css";
import chat from "./chat_bubble.png"; // Assuming the chat icon is in this path

export const BandeauAdversaire = ({
  powerName,
  troopCount,
  color,
  controller, // Ajout de la prop controller
  isWaiting,
  onOpenMessages,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`bandeau ${isExpanded ? "expanded" : ""}`}
      style={{ backgroundColor: color }} // Applique la couleur
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Icône de chat */}
      {isExpanded && (
        <img
          className="bandeau-chat-icon"
          src={chat}
          alt="Chat"
          onClick={() => onOpenMessages(powerName)} // Envoie le message à l'adversaire
        />
      )}
      {/* Conteneur central avec texte et boutons */}
      <div className="bandeau-center">
        {isExpanded && (
          <>
            <div className="bandeau-info">
              <strong>Power:</strong> {powerName}
              <div className="bandeau-troops">{troopCount}</div>
            </div>
            <div className="bandeau-controller">{controller}</div>
            <button
              className={`btn btn-waiting ${
                isWaiting ? "waiting-active" : "waiting-inactive"
              }`}
              disabled
            >
              Waiting
            </button>
          </>
        )}
      </div>
      {!isExpanded && (
        <div className="bandeau-initials">
          {powerName.substr(0, 2).toUpperCase()}
        </div>
      )}
    </div>
  );
};

BandeauAdversaire.propTypes = {
  powerName: PropTypes.string.isRequired,
  troopCount: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired, // Couleur associée à la puissance
  controller: PropTypes.string.isRequired, // Ajout de la prop controller
  isWaiting: PropTypes.bool.isRequired,
  onOpenMessages: PropTypes.func.isRequired,
};
