import React from "react";
import { ClipLoader } from "react-spinners";
import { dprint } from "../../utils/utils";
import "./ChooseTrump.css";

function ChooseTrump({ state, setGameState, theme, isLoading }) {
  const selectTrump = (trump) => {
    let new_state = Object.assign(
      Object.create(Object.getPrototypeOf(state)),
      state
    );
    new_state.hiddenTrumpSuit = trump;
    new_state.deal_cards();
    dprint(`Trump selected: ${trump} - ${state.playerId}`);
    setGameState(new_state);
  };
  return (
    <div id="choose-trump-card">
      <label>Choose trump suit</label>
      {isLoading ? (
        <ClipLoader color="white" />
      ) : (
        <div className="options">
          <img
            src={`/29points/assets/cards/${theme}/1H.png`}
            onClick={() => selectTrump("H")}
            alt="hearts"
          />
          <img
            src={`/29points/assets/cards/${theme}/1C.png`}
            onClick={() => selectTrump("C")}
            alt="clubs"
          />
          <img
            src={`/29points/assets/cards/${theme}/1D.png`}
            onClick={() => selectTrump("D")}
            alt="diamonds"
          />
          <img
            src={`/29points/assets/cards/${theme}/1S.png`}
            onClick={() => selectTrump("S")}
            alt="spades"
          />
        </div>
      )}
    </div>
  );
}

export default ChooseTrump;
