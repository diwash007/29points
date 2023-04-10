import { React } from 'react'
import ScoreBoard from '../ScoreBoard/ScoreBoard'
import './Board.css'
import Action from '../../models/Action'
import Bot from '../../models/Bot'
import Hand from '../Hand/Hand'
import { playGame, roundOver, canRevealTrump } from '../../utils/functions'
import TrumpSuit from '../TrumpSuit/TrumpSuit'
import { userId } from '../../utils/constants'
import RevealTrump from '../RevealTrump/RevealTrump'
import GameOver from '../GameOver/GameOver'
import ChooseTrump from '../ChooseTrump/ChooseTrump'
import BidHolder from '../BidHolder/BidHolder'
import ChooseBid from '../ChooseBid/ChooseBid'
import MainMenu from '../MainMenu/MainMenu'
import Inspiration from '../Inspiration/Inspiration'
import { useGameState, useSetGameState } from '../../contexts/StateContext'
import { useTheme } from '../../contexts/ThemeContext'
import { useMenu } from '../../contexts/SettingContext'

function Board() {
  const { showMenu, setShowMenu, bot, delay } = useMenu()
  const state = useGameState()
  const setGameState = useSetGameState()
  const theme = useTheme()

  if (state.bidWinner !== null && state.hiddenTrumpSuit === null && state.bidWinner !== userId) {
    Bot.chooseTrump(state, setGameState)
  }

  if (state.bidWinner === null) {
    if (state.playerId !== userId) {
      Bot.bid(state, setGameState, delay)
    }
  }
  if (state.gameOver !== true && state.roundOver !== true && state.bidWinner) {
    if (state.playerId !== userId) {
      Bot.play(bot, state, setGameState, delay, theme)
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
      {showMenu && <MainMenu />}
      <div className="background">
        <div className="border">
          <div className="table">
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
