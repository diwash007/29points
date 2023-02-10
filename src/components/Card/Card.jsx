import React from "react";
import "./Card.css";
import Action from "../../models/Action";
import { getLegalCards, playGame, roundOver } from "../../utils/functions";
import { userId } from "../../utils/constants";

function Card({ card, index, state, setGameState }) {
  let isLegalCard = getLegalCards(state).includes(card);
  function drawCard(e) {
    let action = new Action(e.target.id, null);
    let new_state = playGame(state, action);
    roundOver(new_state, setGameState);
  }
  return (
    <img
      style={{
        left: `calc(${index} * 20px)`,
        cursor: card && state.playerId === userId ? "pointer" : "default",
      }}
      src={`/29points/assets/cards/${card ? card + ".svg" : "back.png"}`}
      className={`card ${isLegalCard ? "legal-card" : ""}`}
      id={card}
      key={card}
      alt="playing card"
      onClick={
        card &&
        state.playerId === userId &&
        !state.round_over &&
        isLegalCard
          ? drawCard
          : null
      }
    />
  );
}

export default Card;
