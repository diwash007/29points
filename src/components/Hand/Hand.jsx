import React from 'react'
import './Hand.css'
import Card from '../Card/Card'

function Hand({ cards, player, state, setGameState, theme }) {
  const playerCards = []
  for (let i = 0; i < cards.length; i++)
    playerCards.push(
      <Card
        card={player === 'p1' || state.fullyVisible ? cards[i] : null}
        index={i}
        state={state}
        setGameState={setGameState}
        key={cards[i]}
        theme={theme}
      />
    )
  return (
    <div
      className={`${player} hand`}
      id={player}
      key={player}
      style={{ width: `calc(56px + ${cards.length - 1} * 20px)` }}>
      {playerCards}
    </div>
  )
}

export default Hand
