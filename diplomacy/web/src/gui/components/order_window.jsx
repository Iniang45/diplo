import React from "react";
import PropTypes from "prop-types";
import { Button } from "./button";
import "./order_window.css";

export class Order_window extends React.Component {
  render() {
    const orderEntries = this.props.orders
      ? Object.entries(this.props.orders)
      : null;
    let display = null;

    if (orderEntries) {
      if (orderEntries.length) {
        orderEntries.sort((a, b) => a[1].order.localeCompare(b[1].order));
        display = (
          <div className="container order-list">
            {orderEntries.map((entry, index) => (
              <div
                className={
                  `row order-entry entry-${1 + (index % 2)} ` +
                  (entry[1].local ? "local" : "server")
                }
                key={index}
              >
                <div className="col align-self-center order">
                  <span className="order-string">{entry[1].order}</span>
                  {entry[1].local ? (
                    ""
                  ) : (
                    <span className="order-mark"> [S]</span>
                  )}
                </div>
                <div className="col remove-button">
                  <Button
                    title="Remove"
                    onClick={() => {
                      this.props.onRemove(this.props.name, entry[1]); // Transmet directement l'objet `order`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        );
      } else {
        display = <div className="empty-orders">No orders available</div>;
      }
    } else {
      display = <div className="no-orders">No orders loaded</div>;
    }

    return (
      <div className="orders-window">
        <div className="title">
          <span
            className="name"
            style={{
              color: this.props.powerNameColor,
              flex: 1,
              textAlign: "center",
            }}
          >
            {this.props.name}
          </span>
          <button
            className="update-orders-button"
            onClick={this.props.onUpdate} // Appelle la méthode setOrders
          >
            Update
          </button>
          <button className="close-button" onClick={this.props.onClose}>
            Close
          </button>
        </div>
        {display}
      </div>
    );
  }
}

Order_window.propTypes = {
  name: PropTypes.string.isRequired,
  orders: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired, // Accepte les objets ou tableaux
  wait: PropTypes.bool,
  onRemove: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired, // Ajoute cette ligne
  powerNameColor: PropTypes.string, // Ajoute cette ligne
};
