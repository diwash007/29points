import { React, useEffect, useState } from 'react'
import ScoreBoard from '../ScoreBoard/ScoreBoard'
import './Board.css'
import State from '../../models/State'
import Action from '../../models/Action'
import Hand from '../Hand/Hand'
import { playGame, roundOver, canRevealTrump, bid, getLegalCards } from '../../utils/functions'
import TrumpSuit from '../TrumpSuit/TrumpSuit'
import { userId, baseUrl } from '../../utils/constants'
import RevealTrump from '../RevealTrump/RevealTrump'
import GameOver from '../GameOver/GameOver'
import { cacheImages, dprint } from '../../utils/utils'
import { ClipLoader } from 'react-spinners'
import ChooseTrump from '../ChooseTrump/ChooseTrump'
// import ChooseBid from '../ChooseBid/ChooseBid'
import BidHolder from '../BidHolder/BidHolder'
import ChooseBid from '../ChooseBid/ChooseBid'
import MainMenu from '../MainMenu/MainMenu'

function Board() {
  const [state, setGameState] = useState(new State())
  const [isLoading, setIsLoading] = useState(true)
  const [theme, setTheme] = useState('')
  const [showMenu, setShowMenu] = useState(true)
  const [bot, setBot] = useState('pro')
  const [delay, setDelay] = useState(1)

  document.documentElement.requestFullscreen()

  useEffect(() => {
    const cardTheme = localStorage.getItem('theme')
    if (!cardTheme) localStorage.setItem('theme', 'bhoos')
    setTheme(cardTheme || 'bhoos')
  }, [theme])

  useEffect(() => {
    cacheImages(setIsLoading)
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
        const newState = playGame(state, new Action(state.allCards[0][0], null), theme)
        roundOver(newState, setGameState)
      }
    }
  }

  return (
    <div id="board">
      <div className="background">
        <div className="border">
          <div className="table">
            {showMenu && (
              <MainMenu
                setShowMenu={setShowMenu}
                theme={theme}
                setTheme={setTheme}
                bot={bot}
                setBot={setBot}
                delay={delay}
                setDelay={setDelay}
              />
            )}
            <>
              <BidHolder />
              {isLoading ? (
                <ClipLoader color="white" />
              ) : (
                <>
                  {state.gameOver && (
                    <GameOver
                      teams={state.teams}
                      setGameState={setGameState}
                      setShowMenu={setShowMenu}
                    />
                  )}
                  <ScoreBoard teams={state.teams} />
                  <TrumpSuit state={state} />
                  {state.played.length > 0 &&
                    state.playerId === userId &&
                    !state.trumpRevealed &&
                    canRevealTrump(state) &&
                    !state.roundOver && <RevealTrump state={state} setGameState={setGameState} />}

                  {!state.hiddenTrumpSuit && state.bidWinner === userId && (
                    <ChooseTrump
                      state={state}
                      setGameState={setGameState}
                      theme={theme}
                      isLoading={isLoading}
                    />
                  )}

                  {state.playerId === userId && state.bidWinner === null && (
                    <ChooseBid state={state} setGameState={setGameState} />
                  )}
                  <div className="team2">
                    <Hand
                      cards={state.allCards[1]}
                      player="p2"
                      key="p2"
                      state={state}
                      setGameState={setGameState}
                      theme={theme}
                    />
                    <Hand
                      cards={state.allCards[3]}
                      player="p4"
                      key="p4"
                      state={state}
                      setGameState={setGameState}
                      theme={theme}
                    />
                  </div>
                  <div className="team1">
                    <Hand
                      cards={state.allCards[2]}
                      player="p3"
                      key="p3"
                      state={state}
                      setGameState={setGameState}
                      theme={theme}
                    />
                    <Hand
                      cards={state.allCards[0]}
                      player="p1"
                      key="p1"
                      state={state}
                      setGameState={setGameState}
                      theme={theme}
                    />
                  </div>
                </>
              )}
            </>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Board
