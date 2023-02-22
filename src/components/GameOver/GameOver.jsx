import React, { useEffect } from 'react'
import { weWon } from '../../utils/functions'
import './GameOver.css'
import State from '../../models/State'
import { useGameState, useSetGameState } from '../../contexts/StateContext'
import { useMenu } from '../../contexts/SettingContext'

function GameOver() {
  const state = useGameState()
  const setGameState = useSetGameState()
  const teams = state.teams
  const { setShowMenu } = useMenu()

  let plays = parseInt(localStorage.getItem('plays'))
  let wins = parseInt(localStorage.getItem('wins'))
  plays = plays ? plays + 1 : 1
  if (weWon(teams)) wins = wins ? wins + 1 : 1

  useEffect(() => {
    localStorage.setItem('wins', wins)
    localStorage.setItem('plays', plays)
    // eslint-disable-next-line
  }, []);

  return (
    <div id="summary">
      <div className="result">
        <span>You {weWon(teams) ? 'Win' : 'Lose'}</span>
      </div>
      <table className="stats">
        <tbody>
          <tr>
            <td>Played:</td>
            <td>{plays || 0}</td>
          </tr>
          <tr>
            <td>Won:</td>
            <td>{wins || 0}</td>
          </tr>
          <tr>
            <td>Win %:</td>
            <td>{wins && plays ? ((wins / plays) * 100).toFixed(1) : 0}%</td>
          </tr>
        </tbody>
      </table>
      <div className="options">
        <button
          onClick={() => {
            for (let i = 1; i <= 4; i++) document.getElementById(`p${i}-bid`).innerHTML = ''
            setGameState(new State())
          }}>
          Play again
        </button>
        <button
          onClick={() => {
            setShowMenu(true)
            for (let i = 1; i <= 4; i++) document.getElementById(`p${i}-bid`).innerHTML = ''
            setGameState(new State())
          }}>
          Main Menu
        </button>
      </div>
    </div>
  )
}

export default GameOver
