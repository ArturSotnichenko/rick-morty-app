import React from "react";
import './CharacterCard.css'

function CharacterCard({ character, onClick }) {
  return (
    <div className="character-card" 
    onClick={() => onClick(character)}>
      
      <div className="character-card-img">
        <img src={character.image} alt={character.name} />
      </div>
      <p>{character.name}</p>
    </div>
  );
}

export default CharacterCard
