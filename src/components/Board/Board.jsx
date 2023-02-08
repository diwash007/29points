import { React, useState } from "react";
import ScoreBoard from "../ScoreBoard/ScoreBoard";
import "./Board.css";
import State from "../../models/State";
import Action from "../../models/Action";
import Hand from "../Hand/Hand";
import { playGame, tallyRound, canRevealTrump, clearTable } from "../../utils/functions";
import TrumpSuit from "../TrumpSuit/TrumpSuit";
import { userId } from "../../utils/constants";
import RevealTrump from "../RevealTrump/RevealTrump";

function Board() {
  const [state, setGameState] = useState(new State());
  if (state.game_over !== true && state.round_over !== true) {
    if (state.playerId !== userId) {
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
            new_state = tallyRound(new_state);
            setTimeout(function () {
              new_state = clearTable(new_state);
              new_state.round_over = false;
              setGameState(new_state);
            }, 10000);
          }
        });
    } else {
      if (state.all_cards[0].length === 1)
        setGameState(playGame(state, new Action(state.all_cards[0][0], null)));
    }
  }
  return (
    <div id="board">
      <div className="background">
        <ScoreBoard teams={state.teams} />
        <TrumpSuit state={state} />
        {state.played.length > 0 &&
          state.playerId === userId &&
          !state.trumpRevealed &&
          canRevealTrump(state) && (
            <RevealTrump state={state} setGameState={setGameState} />
          )}
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
