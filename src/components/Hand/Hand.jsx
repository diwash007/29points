import React from "react";
import "./Hand.css";
import Card from "../Card/Card";

function Hand({ cards, player, state, setGameState, theme }) {
  let player_cards = [];
  for (let i = 0; i < cards.length; i++)
    player_cards.push(
      <Card
        card={player === "p1" || state.fully_visible ? cards[i] : null}
        index={i}
        state={state}
        setGameState={setGameState}
        key={cards[i]}
        theme={theme}
      />
    );
  return (
    <div
      className={`${player} hand`}
      id={player}
      key={player}
      style={{ width: `calc(56px + ${cards.length - 1} * 20px)` }}
    >
      {player_cards}
    </div>
  );
}

export default Hand;
