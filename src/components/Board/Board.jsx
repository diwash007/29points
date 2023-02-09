import { React, useState } from "react";
import ScoreBoard from "../ScoreBoard/ScoreBoard";
import "./Board.css";
import State from "../../models/State";
import Action from "../../models/Action";
import Hand from "../Hand/Hand";
import { playGame, roundOver, canRevealTrump } from "../../utils/functions";
import TrumpSuit from "../TrumpSuit/TrumpSuit";
import { userId, baseUrl } from "../../utils/constants";
import RevealTrump from "../RevealTrump/RevealTrump";
import GameOver from "../GameOver/GameOver";

function Board() {
  const [state, setGameState] = useState(new State());
  if (state.game_over !== true && state.round_over !== true) {
    if (state.playerId !== userId) {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      };
      fetch(baseUrl + "play", options)
        .then((response) => response.json())
        .then((data) => {
          let new_state = playGame(
            state,
            new Action(data.card, data.revealTrump)
          );
          roundOver(new_state, setGameState);
        });
    } else {
      if (state.all_cards[0].length === 1) {
        let new_state = playGame(
          state,
          new Action(state.all_cards[0][0], null)
        );
        roundOver(new_state, setGameState);
      }
    }
  }
  return (
    <div id="board">
      <div className="background">
        {state.game_over && (
          <GameOver teams={state.teams} setGameState={setGameState} />
        )}
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
