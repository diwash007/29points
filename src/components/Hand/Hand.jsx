import React from "react";
import './Hand.css'

function Hand({ cards, player }) {
  return <div className={`${player} hand`} key={player} style={{width: `calc(56px + ${cards.length - 1} * 20px)`}}>{cards}</div>;
}

export default Hand;
