import React from 'react';
import PropTypes from 'prop-types';

export const PhaseChangeButton = ({ targetPhase, onChangePhase, disabled, imageSrc, altText,className }) => {
    return (
        <button
            className={`btn phase-change-button ${className}`}
            onClick={(event) => {
                console.log(imageSrc)
                event.preventDefault(); // Empêche le comportement par défaut
                if (onChangePhase) {
                    onChangePhase(targetPhase); // Passe la phase cible à la méthode
                } else {
                    console.error('onChangePhase is not defined');
                }
            }}
            disabled={disabled}
            style={{ padding: 0, border: 'none', background: 'none' }} // Supprime les styles par défaut du bouton
        >
            <img
                src={imageSrc}
                alt={altText || 'Phase Change'}
            />
        </button>
    );
};

PhaseChangeButton.propTypes = {
    targetPhase: PropTypes.string, // La phase cible
    onChangePhase: PropTypes.func.isRequired, // Fonction appelée lors du clic
    disabled: PropTypes.bool, // Indique si le bouton est désactivé
    imageSrc: PropTypes.string.isRequired, // Source de l'image
    altText: PropTypes.string, // Texte alternatif pour l'image
    id: PropTypes.string, // ID du bouton
    className: PropTypes.string // Classe CSS supplémentaire
};

PhaseChangeButton.defaultProps = {
    disabled: false, // Par défaut, le bouton est activé
    altText: 'Phase Change', // Texte alternatif par défaut
    className: '' // Classe CSS par défaut
};

