import React from 'react'
import './Hand.css'
import Card from '../Card/Card'
import { useGameState } from '../../contexts/StateContext'
import { useTheme } from '../../contexts/ThemeContext'

function Hand({ cards, player }) {
  const state = useGameState()
  const theme = useTheme()
  const playerCards = []
  for (let i = 0; i < cards.length; i++)
    playerCards.push(
      <Card
        card={player === 'p1' || state.fullyVisible ? cards[i] : null}
        index={i}
        key={cards[i]}
        theme={theme}
      />
    )
  return (
    <div
      className={`${player} hand`}
      id={player}
      key={player}
      style={{
        width: `calc(${window.innerWidth <= 660 ? '42' : '56'}px + ${cards.length - 1} * 20px)`
      }}>
      {playerCards}
    </div>
  )
}

export default Hand
