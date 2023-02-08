import React from "react";
import { weWon } from "../../utils/functions";
import "./GameOver.css";
import State from "../../models/State";

function GameOver({ teams, setGameState }) {
  return (
    <div id="summary">
      <div className="result">
        <span>You {weWon(teams) ? "Win" : "Lose"}</span>
      </div>
      <div className="options">
        <button onClick={() => setGameState(new State())}>Play again</button>
        <button>Main Menu</button>
      </div>
    </div>
  );
}

export default GameOver;
