import React from "react";
import "./Card.css";
import Action from "../../models/Action";
import { tallyRound, playGame } from "../../utils/functions";

function Card({ card, index, state, setGameState }) {
  function drawCard(e) {
    const card = document.getElementById(e.target.id);
    // play animation
    card.classList.add("player1card");

    let action = new Action({ card: e.target.id });

    let new_state = playGame(state, action);

    // add card to played
    state.played.push(e.target.id);

    if (new_state.played.length === 4) new_state = tallyRound(new_state);

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
      onClick={card && state.player_id === "You-0" ? drawCard : null}
    />
  );
}

export default Card;
