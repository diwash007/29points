import { React, useState } from "react";
import ScoreBoard from "../ScoreBoard/ScoreBoard";
import "./Board.css";
import State from "../../models/State";
import Action from "../../models/Action";
import Hand from "../Hand/Hand";
import { playGame, tallyRound } from "../../utils/functions";
import TrumpSuit from "../TrumpSuit/TrumpSuit";

function Board() {
  const [state, setGameState] = useState(new State());
  if (
    state.playerId !== "You-0" &&
    state.game_over !== true &&
    state.round_over !== true
  ) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state),
    };
    fetch("http://localhost:8001/play", options)
      .then((response) => response.json())
      .then((data) => {
        let new_state = playGame(
          state,
          new Action(data.card, data.revealTrump)
        );
        setGameState(new_state);
        if (new_state.played.length === 4) {
          new_state.round_over = true;
          setTimeout(function () {
            new_state = tallyRound(new_state);
            new_state.round_over = false;
            setGameState(new_state);
          }, 3000);
        }
      });
  }
  return (
    <div id="board">
      <div className="background">
        <ScoreBoard teams={state.teams}/>
        <TrumpSuit state={state} />
        <div className="border">
          <div className="table">
            <div className="team2">
              <Hand
                cards={state.all_cards[1]}
                player="p2"
                key="p2"
                state={state}
                setGameState={setGameState}
              />
              <Hand
                cards={state.all_cards[3]}
                player="p4"
                key="p4"
                state={state}
                setGameState={setGameState}
              />
            </div>
            <div className="team1">
              <Hand
                cards={state.all_cards[2]}
                player="p3"
                key="p3"
                state={state}
                setGameState={setGameState}
              />
              <Hand
                cards={state.all_cards[0]}
                player="p1"
                key="p1"
                state={state}
                setGameState={setGameState}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Board;
