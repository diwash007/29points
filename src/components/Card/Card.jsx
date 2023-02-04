import React from "react";
import "./Card.css";

function Card({ card, index, state, setGameState }) {
  function drawCard(e) {
    let card = document.getElementById(e.target.id);
    state.played.push(e.target.id);
    setGameState(state);
    card.classList.add("player1card");
  }
  return (
    <img
      style={{ left: `calc(${index} * 20px)` }}
      src={`/assets/cards/${card ? card + ".svg" : "back.png"}`}
      className="card"
      id={card}
      key={card}
      alt={card}
      onClick={card && state.player_id === "You-0" ? drawCard: null}
    />
  );
}

export default Card;
