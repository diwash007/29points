import React from 'react'
import './MainMenu.css'

function MainMenu({ theme, setTheme, setShowMenu, bot, setBot, delay, setDelay }) {
  function chooseTheme(theme) {
    setTheme(theme)
    localStorage.setItem('theme', theme)
  }
  function startGame() {
    setShowMenu(false)
  }
  return (
    <div id="menu">
      <img src="/29points/assets/imgs/logo.png" alt="29 points" className="logo" />
      <label>Card theme</label>
      <div className="themes">
        <div
          className={`theme ${theme === 'bhoos' && 'selected-theme'}`}
          onClick={() => chooseTheme('bhoos')}>
          <img src="/29points/assets/imgs/bhoos.png" alt="29 points" />
          <label>Bhoos</label>
        </div>
        <div
          className={`theme ${theme === 'classic' && 'selected-theme'}`}
          onClick={() => chooseTheme('classic')}>
          <img src="/29points/assets/imgs/classic.png" alt="29 points" className="theme" />
          <label>Classic</label>
        </div>
      </div>
      <table>
        <tbody>
          <tr className="bots">
            <td>
              <label>Bot level:</label>
            </td>
            <td>
              <select
                className="select"
                value={bot}
                onChange={(e) => {
                  setBot(e.target.value)
                }}>
                <option value="noob">Noob</option>
                <option value="pro">Pro</option>
                <option value="hacker" disabled>
                  Hacker
                </option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Delay:</td>
            <td>
              <input
                type="number"
                className="delayInput"
                min={1}
                max={10}
                value={delay}
                onChange={(e) => {
                  setDelay(e.target.value)
                }}
              />
              s
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={startGame}>Play game</button>
    </div>
  )
}

export default MainMenu
