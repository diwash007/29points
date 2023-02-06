import React from "react";
import "./Card.css";
import Action from "../../models/Action";
import { playGame } from "../../utils/functions";

function Card({ card, index, state, setGameState }) {
  function drawCard(e) {
    
    const card = document.getElementById(e.target.id);
    // play animation
    card.classList.add("p1-draw");

    let action = new Action(e.target.id, null);
    let new_state = playGame(state, action);
    setGameState(new_state);
  }
  return (
    <img
      style={{ left: `calc(${index} * 20px)` }}
      src={`/assets/cards/${card ? card + ".svg" : "back.png"}`}
      className="card"
      id={card}
      key={card}
      alt={card}
      onClick={card && state.playerId === "You-0" ? drawCard : null}
    />
  );
}

export default Card;
