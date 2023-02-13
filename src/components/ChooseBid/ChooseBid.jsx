import React from "react";
import "./ChooseBid.css";

function ChooseBid() {
  let minimumBid = 16;
  let bidButtons = [];

  const bid = (i) => {
    console.log(i);
  };
  
  for (let i = minimumBid; i < 29; i++)
    bidButtons.push(
      <button
        key={i}
        onClick={() => {
          bid(i);
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
