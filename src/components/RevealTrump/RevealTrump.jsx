import React from 'react'
import { useGameState, useSetGameState } from '../../contexts/StateContext'
import { revealTrump } from '../../utils/functions'
import './RevealTrump.css'

function RevealTrump() {
  const state = useGameState()
  const setGameState = useSetGameState()
  return (
    <img
      id="reveal-trump"
      src="/29points/assets/imgs/reveal-trump.png"
      alt="reveal trump"
      onClick={() => setGameState(revealTrump(state))}
    />
  )
}

export default RevealTrump
