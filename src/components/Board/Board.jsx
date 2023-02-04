import { React, useState } from "react";
import ScoreBoard from "../ScoreBoard/ScoreBoard";
import "./Board.css";
import State from "../../models/State";
import Hand from "../Hand/Hand";

function Board() {
  const [state, setGameState] = useState(new State());
  
  return (
    <div id="board">
      <div className="background">
        <ScoreBoard />
        <div className="border">
          <div className="table">
            <div className="team2">
              <Hand cards={state.all_cards[3]} player="p4" key="p4" state={state} setGameState={setGameState} />
              <Hand cards={state.all_cards[1]} player="p2" key="p2" state={state} setGameState={setGameState} />
            </div>
            <div className="team1">
              <Hand cards={state.all_cards[2]} player="p3" key="p3" state={state} setGameState={setGameState} />
              <Hand cards={state.all_cards[0]} player="p1" key="p1" state={state} setGameState={setGameState} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Board;
