import React from 'react'
import { userId } from '../../utils/constants'
import './TrumpSuit.css'

function TrumpSuit({ state }) {
  const trumpSuit = state.trumpRevealed
    ? `1${state.trumpSuit}.png`
    : userId === state.bidWinner && state.hiddenTrumpSuit
    ? `1${state.hiddenTrumpSuit}.png`
    : 'back.png'
  return (
    <div id="trump-board">
      <img
        src={`/29points/assets/cards/classic/${trumpSuit}`}
        width="500px"
        height="500px"
        alt="trump suit"
        style={{
          boxShadow: state.trumpRevealed ? ' 0 0 5px 5px lightgreen' : ''
        }}
      />
    </div>
  )
}

export default TrumpSuit
