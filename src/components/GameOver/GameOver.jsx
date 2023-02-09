import React, { useEffect } from "react";
import { weWon } from "../../utils/functions";
import "./GameOver.css";
import State from "../../models/State";

function GameOver({ teams, setGameState }) {
  let plays = parseInt(localStorage.getItem("plays"));
  let wins = parseInt(localStorage.getItem("wins"));
  plays = plays ? plays + 1 : 1;
  if (weWon(teams)) wins = wins ? wins + 1 : 1;

  useEffect(() => {
    localStorage.setItem("wins", wins);
    localStorage.setItem("plays", plays);
    // eslint-disable-next-line
  }, []);

  return (
    <div id="summary">
      <div className="result">
        <span>You {weWon(teams) ? "Win" : "Lose"}</span>
      </div>
      <table className="stats">
        <tbody>
          <tr>
            <td>Played:</td>
            <td>{plays ? plays : 0}</td>
          </tr>
          <tr>
            <td>Won:</td>
            <td>{wins ? wins : 0}</td>
          </tr>
          <tr>
            <td>Win %:</td>
            <td>{wins && plays ? ((wins / plays) * 100).toFixed(1) : 0}%</td>
          </tr>
        </tbody>
      </table>
      <div className="options">
        <button onClick={() => setGameState(new State())}>Play again</button>
        <button>Main Menu</button>
      </div>
    </div>
  );
}

export default GameOver;
