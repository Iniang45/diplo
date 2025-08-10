import React, { useState } from "react";
import PropTypes from "prop-types";
import "./bandeau.css";
import chat from "./chat_bubble.png"; // Assuming the chat icon is in this path
import { Order_window as OrderWindow } from "./order_window"; // Import du composant OrdersWindow

export const Bandeau = ({
  powerName,
  troopCount,
  color,
  onDeleteOrders,
  onVoteDraw, // Nouvelle prop pour voter pour un draw
  onOpenMessages,
  orders, // Ajout des ordres en prop
  onRemoveOrder, // Ajout de la fonction pour supprimer un ordre
  setOrders,
  currentVote, // Ajout de la prop pour le vote actuel
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showOrdersWindow, setShowOrdersWindow] = useState(false); // État pour afficher OrdersWindow

  return (
    <>
      <div
        className={`bandeau ${isExpanded ? "expanded" : ""}`}
        style={{ backgroundColor: color }}
        onMouseEnter={() => {
          if (!showOrdersWindow) setIsExpanded(true);
        }}
        onMouseLeave={() => {
          if (!showOrdersWindow) setIsExpanded(false);
        }}
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
              <button
                className={`btn btn-draw ${
                  currentVote === "neutral"
                    ? "hover-neutral"
                    : currentVote === "yes"
                    ? "hover-yes"
                    : "hover-no"
                }`}
                onClick={onVoteDraw} // Appelle la méthode vote
              >
                {currentVote === "neutral"
                  ? "Vote for Draw"
                  : currentVote === "yes"
                  ? "Cancel Draw Vote"
                  : "Set Neutral"}
              </button>
              <button
                className="btn btn-orders"
                onClick={() => {
                  setIsExpanded(false);
                  setShowOrdersWindow(true);
                }} // Affiche OrdersWindow
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
      </div>
      {/* Affichage de OrdersWindow EN DEHORS du bandeau */}
      {showOrdersWindow && (
        <OrderWindow
          name={powerName}
          orders={orders}
          wait={false}
          onRemove={onRemoveOrder}
          onClose={() => setShowOrdersWindow(false)}
          powerNameColor={color} // Ajoute cette ligne
          onUpdate={setOrders}
        />
      )}
    </>
  );
};

Bandeau.propTypes = {
  powerName: PropTypes.string.isRequired,
  troopCount: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired, // Couleur associée à la puissance
  onDeleteOrders: PropTypes.func.isRequired,
  onVoteDraw: PropTypes.func.isRequired, // Ajout de la prop pour voter pour un draw
  onOpenMessages: PropTypes.func.isRequired,
  orders: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired, // Accepte les objets ou tableaux
  onRemoveOrder: PropTypes.func.isRequired, // Ajout de la fonction pour supprimer un ordre
  setOrders: PropTypes.func, // Ajout de la prop pour mettre à jour les ordres
  currentVote: PropTypes.string.isRequired, // Ajout de la prop pour le vote actuel
};
