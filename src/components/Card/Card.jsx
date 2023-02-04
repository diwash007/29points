import React from "react";
import "./Card.css";

function Card({ card, index, state, setGameState }) {
  function drawCard(e) {
    const card = document.getElementById(e.target.id);
    card.classList.add("player1card");
    state.played.push(e.target.id);

    const new_state = Object.assign(Object.create(Object.getPrototypeOf(state)), state);

    // new_state.all_cards[0] = new_state.all_cards[0].filter(item => item !== e.target.id)

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
      onClick={card && state.player_id === "You-0" ? drawCard: null}
    />
  );
}

export default Card;
