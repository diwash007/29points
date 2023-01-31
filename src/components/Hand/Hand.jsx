import React from "react";
import './Hand.css'

function Hand({ cards, player }) {
  return <div className={player}>{cards}</div>;
}

export default Hand;
