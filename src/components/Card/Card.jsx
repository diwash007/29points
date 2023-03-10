import React from 'react'
import './Card.css'
import Action from '../../models/Action'
import { getLegalCards, playGame, roundOver } from '../../utils/functions'
import { userId } from '../../utils/constants'
import { useGameState, useSetGameState } from '../../contexts/StateContext'
import { useTheme } from '../../contexts/ThemeContext'

function Card({ card, index }) {
  const state = useGameState()
  const setGameState = useSetGameState()
  const theme = useTheme()
  const isLegalCard = getLegalCards(state).includes(card)
  function drawCard(e) {
    const action = new Action(e.target.id, null)
    const newState = playGame(state, action, theme)
    roundOver(newState, setGameState)
  }
  return (
    theme && (
      <img
        style={{
          left: `calc(${index} * 20px)`,
          cursor: card && state.playerId === userId ? 'pointer' : 'default'
        }}
        src={`/29points/assets/cards/${theme}/${card ? card + '.png' : 'back.png'}`}
        className={`card ${
          card &&
          state.playerId === userId &&
          !state.roundOver &&
          isLegalCard &&
          state.hiddenTrumpSuit
            ? 'legal-card'
            : ''
        }`}
        id={card}
        key={card}
        alt="playing card"
        onClick={
          card &&
          state.playerId === userId &&
          !state.roundOver &&
          isLegalCard &&
          state.hiddenTrumpSuit
            ? drawCard
            : null
        }
      />
    )
  )
}

export default Card
