import React, { useState, useEffect, useRef } from "react";

import CharacterCard from './CharacterCard'
import ToTop from "./ToTop";

import { BASE_URL } from "../constans";

import './CharacterList.css'


function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const isFirstRun = useRef(true); 
  //применяес для для хранения значения isFirstRun, которое позволяет нам отслеживать, выполняется ли useEffect в первый раз.

  useEffect(() => {
    setLoading(true);
    fetch(`${BASE_URL}/character?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        // если это первый запрос, то заменяем characters на новый массив с данными
        // если это следующие запросы, то добавляем данные к существующему массиву characters
        setCharacters((prevCharacters) =>
          page === 1 ? data.results : [...prevCharacters, ...data.results]
        );
        setLoading(false);
      });
  }, [page]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    function handleScroll() {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        !loading
      ) {
        setPage((prev) => prev + 1);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  const renderedCharacters = characters.slice(0, page * 20);

  function handleCharacterClick(character) {
    setSelectedCharacter(character);
  }

  return (

    <div className="character-list">
      {renderedCharacters.map((character) => (
        <CharacterCard
          key={character.id}
          character={character}
          onClick={handleCharacterClick}
        />
        
      ))}
      <ToTop/>

      {loading && <p>Loading...</p>}
      
      {selectedCharacter && (
        <div className="modal" >
          <div className="modal-content">
            <span className="close">
              <div className="close-btn" onClick={() => setSelectedCharacter(null)}>&times;</div>
            </span>
            <div className="modal-character">
              <div className="modal-character-img">
                <img src={selectedCharacter.image} alt={selectedCharacter.name} />
              </div>
              <div className="modal-character-info">
                <h1>{selectedCharacter.name}</h1>
                <div className="modal-character-info-blocks">
                <div className="modal-character-info-block block1">
                <p>Status: {selectedCharacter.status}</p>
                <p>Species: {selectedCharacter.species}</p>
                <p>Gender: {selectedCharacter.gender}</p>   
                </div>
                <div className="modal-character-info-block block2">
                <p>Location: {selectedCharacter.location.name}</p>
                <p>Origin: {selectedCharacter.origin.name}</p>
                <p>Appearance: {`Episode ${selectedCharacter.episode[0].split('/').pop()}`}</p>
                </div>
                </div>
                
                
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CharacterList;