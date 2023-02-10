import React from 'react';
import './ChooseTrump.css'

function ChooseTrump({ state, setGameState}) {
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
        <img src="/29points/assets/cards/2H.svg" onClick={() => selectTrump("H")} alt="hearts" />
        <img src="/29points/assets/cards/2C.svg" onClick={() => selectTrump("C")} alt="clubs" />
        <img src="/29points/assets/cards/2D.svg" onClick={() => selectTrump("D")} alt="diamonds" />
        <img src="/29points/assets/cards/2S.svg" onClick={() => selectTrump("S")} alt="spades" />
      </div>
    </div>
  )
}

export default ChooseTrump