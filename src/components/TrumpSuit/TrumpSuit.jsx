import React from "react";
import "./TrumpSuit.css";

function TrumpSuit({ state }) {
  let trumpSuit =
    state.trumpRevealed || state.playerId === state.bid_winner
      ? `1${state.trumpSuit}.svg`
      : "back.png";
  return (
    <div id="trump-board">
      <img
        src={`/29points/assets/cards/${trumpSuit}`}
        width="500px"
        height="500px"
        alt="trump suit"
      />
    </div>
  );
}

export default TrumpSuit;
