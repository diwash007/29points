import React from "react";
import { bid } from "../../utils/functions";
import "./ChooseBid.css";

function ChooseBid({ state, setGameState }) {
  let minimumBid = 16;
  let bidButtons = [];

  for (let i = minimumBid; i < 29; i++)
    bidButtons.push(
      <button
        key={i}
        onClick={() => {
          bid(i, state, setGameState);
        }}
      >
        {i}
      </button>
    );
  return (
    <div id="bidButtons">
      <label>Choose bid</label>
      <div className="options">{bidButtons}</div>
    </div>
  );
}

export default ChooseBid;
