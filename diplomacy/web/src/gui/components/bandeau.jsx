import React, { useState } from "react";
import PropTypes from "prop-types";
import "./bandeau.css";
import chat from "./chat_bubble.png"; // Assuming the chat icon is in this path
import { Order_window } from "./order_window"; // Import du composant OrdersWindow

export const Bandeau = ({
  powerName,
  troopCount,
  color,
  onDeleteOrders,
  onSetWait,
  onOpenMessages,
  orders, // Ajout des ordres en prop
  onRemoveOrder, // Ajout de la fonction pour supprimer un ordre
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showOrdersWindow, setShowOrdersWindow] = useState(false); // État pour afficher OrdersWindow

  return (
    <div
      className={`bandeau ${isExpanded ? "expanded" : ""}`}
      style={{ backgroundColor: color }} // Applique la couleur
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Icône de chat */}
      {isExpanded && (
        <div className="bandeau-chat-container">
          <img
            className="bandeau-chat-icon"
            src={chat}
            alt="Chat"
            onClick={() => onOpenMessages(powerName)} // Envoie le message à l'adversaire
          />
          <span className="bandeau-chat-label">General</span>{" "}
          {/* Texte sous l'icône */}
        </div>
      )}
      {/* Conteneur central avec texte et boutons */}
      <div className="bandeau-center">
        {isExpanded && (
          <>
            <div className="bandeau-info">
              <strong>Power:</strong> {powerName}
              <div className="bandeau-troops">{troopCount}</div>
            </div>
            <button className="btn btn-reset" onClick={onDeleteOrders}>
              Reset
            </button>
            <button className="btn btn-waiting" onClick={onSetWait}>
              Waiting
            </button>
            <button
              className="btn btn-orders"
              onClick={() => setShowOrdersWindow(true)} // Affiche OrdersWindow
            >
              Orders
            </button>
          </>
        )}
      </div>
      {!isExpanded && (
        <div className="bandeau-initials">
          {powerName.substr(0, 2).toUpperCase()}
        </div>
      )}
      {/* Affichage de OrdersWindow */}
      {showOrdersWindow && (
        <Order_window
          name={powerName}
          orders={orders} // Passe les données directement sans transformation
          wait={false}
          onRemove={onRemoveOrder}
          onClose={() => setShowOrdersWindow(false)}
        />
      )}
    </div>
  );
};

Bandeau.propTypes = {
  powerName: PropTypes.string.isRequired,
  troopCount: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired, // Couleur associée à la puissance
  onDeleteOrders: PropTypes.func.isRequired,
  onSetWait: PropTypes.func.isRequired,
  onOpenMessages: PropTypes.func.isRequired,
  orders: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired, // Accepte les objets ou tableaux
  onRemoveOrder: PropTypes.func.isRequired, // Ajout de la fonction pour supprimer un ordre
};
