import React from 'react'
import './MainMenu.css'

function MainMenu({ theme, setTheme, setShowMenu }) {
  function chooseTheme(theme) {
    setTheme(theme)
    localStorage.setItem('theme', theme)
  }
  function startGame() {
    setShowMenu(false)
  }
  return (
    <div id="menu">
      <img src="29points/assets/imgs/logo.png" alt="29 points" className="logo" />
      <label>Card theme</label>
      <div className="themes">
        <div
          className={`theme ${theme === 'bhoos' && 'selected-theme'}`}
          onClick={() => chooseTheme('bhoos')}>
          <img src="29points/assets/imgs/bhoos.png" alt="29 points" />
          <label>Bhoos</label>
        </div>
        <div
          className={`theme ${theme === 'classic' && 'selected-theme'}`}
          onClick={() => chooseTheme('classic')}>
          <img src="29points/assets/imgs/classic.png" alt="29 points" className="theme" />
          <label>Classic</label>
        </div>
      </div>
      <button onClick={startGame}>Play game</button>
    </div>
  )
}

export default MainMenu
