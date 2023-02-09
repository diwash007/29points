import React from "react";
import "./Card.css";
import Action from "../../models/Action";
import { clearTable, playGame, tallyRound } from "../../utils/functions";
import { userId } from "../../utils/constants";

function Card({ card, index, state, setGameState }) {
  function drawCard(e) {

    let action = new Action(e.target.id, null);
    let new_state = playGame(state, action);
    setGameState(new_state);
    if (new_state.played.length === 4) {
      new_state.round_over = true;
      new_state = tallyRound(new_state);
      setTimeout(function () {
        new_state = clearTable(new_state);
        new_state.round_over = false;
        setGameState(new_state);
      }, 2000);
    }
  }
  return (
    <img
      style={{
        left: `calc(${index} * 20px)`,
        cursor: card && state.playerId === userId ? "pointer" : "default",
      }}
      src={`/29points/assets/cards/${card ? card + ".svg" : "back.png"}`}
      className="card"
      id={card}
      key={card}
      alt={card}
      onClick={
        card && state.playerId === userId && !state.round_over ? drawCard : null
      }
    />
  );
}

export default Card;
