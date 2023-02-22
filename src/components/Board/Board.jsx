import { React, useEffect, useState } from 'react'
import ScoreBoard from '../ScoreBoard/ScoreBoard'
import './Board.css'
import Action from '../../models/Action'
import Hand from '../Hand/Hand'
import { playGame, roundOver, canRevealTrump, bid, getLegalCards } from '../../utils/functions'
import TrumpSuit from '../TrumpSuit/TrumpSuit'
import { userId, baseUrl } from '../../utils/constants'
import RevealTrump from '../RevealTrump/RevealTrump'
import GameOver from '../GameOver/GameOver'
import { cacheImages, dprint } from '../../utils/utils'
import ChooseTrump from '../ChooseTrump/ChooseTrump'
import BidHolder from '../BidHolder/BidHolder'
import ChooseBid from '../ChooseBid/ChooseBid'
import MainMenu from '../MainMenu/MainMenu'
import Inspiration from '../Inspiration/Inspiration'
import { useGameState, useSetGameState } from '../../contexts/StateContext'
import { useTheme } from '../../contexts/ThemeContext'

function Board() {
  const [showMenu, setShowMenu] = useState(true)
  const [bot, setBot] = useState('pro')
  const [delay, setDelay] = useState(1)
  const state = useGameState()
  const setGameState = useSetGameState()
  const theme = useTheme()

  useEffect(() => {
    cacheImages()
  }, [])

  if (state.bidWinner !== null && state.hiddenTrumpSuit === null && state.bidWinner !== userId) {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state)
    }
    fetch(baseUrl + 'chooseTrump', options)
      .then((response) => response.json())
      .then((data) => {
        const newState = Object.assign(Object.create(Object.getPrototypeOf(state)), state)
        newState.hiddenTrumpSuit = data.suit
        newState.dealCards()
        dprint(`Trump selected: ${data.suit} - ${state.bidWinner}`)
        setGameState(newState)
      })
  }

  if (state.bidWinner === null) {
    if (state.playerId !== userId) {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state)
      }
      setTimeout(() => {
        fetch(baseUrl + 'bid', options)
          .then((response) => response.json())
          .then((data) => {
            bid(data.bid, state, setGameState)
          })
      }, delay * 1000)
    }
  }
  if (state.gameOver !== true && state.roundOver !== true && state.bidWinner) {
    if (state.playerId !== userId) {
      switch (bot) {
        case 'pro': {
          state.delay = delay
          const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(state)
          }
          fetch(baseUrl + 'play', options)
            .then((response) => response.json())
            .then((data) => {
              const newState = playGame(state, new Action(data.card, data.revealTrump), theme)
              roundOver(newState, setGameState)
            })
          break
        }
        case 'noob': {
          setTimeout(() => {
            const legalCards = getLegalCards(state)
            const CardToPlay = legalCards[Math.floor(Math.random() * legalCards.length)]
            const newState = playGame(state, new Action(CardToPlay, null), theme)
            roundOver(newState, setGameState)
          }, delay * 1000)

          break
        }
        case 'hacker': {
          state.hacker = true
          state.delay = delay
          const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(state)
          }
          fetch(baseUrl + 'play', options)
            .then((response) => response.json())
            .then((data) => {
              const newState = playGame(state, new Action(data.card, data.revealTrump), theme)
              roundOver(newState, setGameState)
            })
          break
        }
      }
    } else {
      if (state.allCards[0].length === 1) {
        setTimeout(() => {
          const newState = playGame(state, new Action(state.allCards[0][0], null), theme)
          roundOver(newState, setGameState)
        }, delay * 1000)
      }
    }
  }

  return (
    <div id="board">
      <Inspiration />
      <div className="background">
        <div className="border">
          <div className="table">
            {showMenu && (
              <MainMenu
                setShowMenu={setShowMenu}
                bot={bot}
                setBot={setBot}
                delay={delay}
                setDelay={setDelay}
              />
            )}
            <>
              <BidHolder />

              {state.gameOver && <GameOver setShowMenu={setShowMenu} />}
              <ScoreBoard />
              <TrumpSuit />
              {state.played.length > 0 &&
                state.playerId === userId &&
                !state.trumpRevealed &&
                canRevealTrump(state) &&
                !state.roundOver && <RevealTrump />}

              {!state.hiddenTrumpSuit && state.bidWinner === userId && <ChooseTrump />}

              {state.playerId === userId && state.bidWinner === null && <ChooseBid />}
              <div className="team2">
                <Hand cards={state.allCards[1]} player="p2" key="p2" />
                <Hand cards={state.allCards[3]} player="p4" key="p4" />
              </div>
              <div className="team1">
                <Hand cards={state.allCards[2]} player="p3" key="p3" />
                <Hand cards={state.allCards[0]} player="p1" key="p1" />
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Board
