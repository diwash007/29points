import React from "react";
import "./ScoreBoard.css";

function ScoreBoard() {
  return (
    <div id="scoreboard">
      <div className="player-score">
        <div></div>
        <span>0</span>
      </div>
      <div className="enemy-score">
        <div></div>
        <span>0</span>
      </div>
    </div>
  );
}

export default ScoreBoard;
