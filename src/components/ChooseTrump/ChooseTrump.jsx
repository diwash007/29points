import React from 'react';
import './ChooseTrump.css'

function ChooseTrump({ state, setGameState, theme}) {
    const selectTrump = (trump) => {
        let new_state = Object.assign(
            Object.create(Object.getPrototypeOf(state)),
            state
          );
        console.log("hi")
        new_state.hiddenTrumpSuit = trump;
        console.log(new_state)
        setGameState(new_state);
    }
  return (
    <div id="choose-trump-card">
      <label>Choose trump suit</label>
      <div className="options">
        <img src={`/29points/assets/cards/${theme}/1H.png`} onClick={() => selectTrump("H")} alt="hearts" />
        <img src={`/29points/assets/cards/${theme}/1C.png`} onClick={() => selectTrump("C")} alt="clubs" />
        <img src={`/29points/assets/cards/${theme}/1D.png`} onClick={() => selectTrump("D")} alt="diamonds" />
        <img src={`/29points/assets/cards/${theme}/1S.png`} onClick={() => selectTrump("S")} alt="spades" />
      </div>
    </div>
  )
}

export default ChooseTrump