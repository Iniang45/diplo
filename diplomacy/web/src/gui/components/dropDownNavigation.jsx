import React from "react";
import Octicon, { Person } from "@primer/octicons-react";
import PropTypes from "prop-types";
import "./dropDownNavigation.css";
export const DropdownNavigation = ({ navigation, username }) => {
  if (!navigation || navigation.length === 0) {
    return null; // Si aucune navigation n'est disponible, ne rien afficher
  }

  return (
    <div className="dropdown">
      <button
        className="dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <span>
          <u>{username}</u>
          <Octicon icon={Person} />
        </span>
      </button>
      <div
        className="dropdown-menu dropdown-menu-right"
        aria-labelledby="dropdownMenuButton"
      >
        {navigation.map((nav, index) => {
          const navTitle = nav[0];
          const navAction = nav[1];
          return (
            <span key={index} className="dropdown-item" onClick={navAction}>
              {navTitle}
            </span>
          );
        })}
      </div>
    </div>
  );
};

DropdownNavigation.propTypes = {
  navigation: PropTypes.array.isRequired,
  username: PropTypes.string,
};
