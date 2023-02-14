import React from 'react'
import './ScoreBoard.css'

function ScoreBoard({ teams }) {
  return (
    <div id="scoreboard">
      <div className="player-score">
        <div></div>
        <span>{teams[0].won}</span>
      </div>
      <div className="enemy-score">
        <div></div>
        <span>{teams[1].won}</span>
      </div>
    </div>
  )
}

export default ScoreBoard
