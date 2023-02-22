import React from 'react'
import { useGameState, useSetGameState } from '../../contexts/StateContext'
import { bid } from '../../utils/functions'
import './ChooseBid.css'

function ChooseBid() {
  const state = useGameState()
  const setGameState = useSetGameState()
  const minimumBid = state.bidState.bid
  const bidButtons = []

  for (let i = minimumBid + 1; i < 29; i++)
    bidButtons.push(
      <button
        key={i}
        onClick={() => {
          bid(i, state, setGameState)
        }}>
        {i}
      </button>
    )
  bidButtons.push(
    <button
      key={'pass'}
      onClick={() => {
        bid(0, state, setGameState)
      }}>
      {' '}
      Pass{' '}
    </button>
  )
  return (
    <div id="bidButtons">
      <label>Choose bid</label>
      <div className="options">{bidButtons}</div>
    </div>
  )
}

export default ChooseBid
