import {React, useState} from "react";
import ScoreBoard from "../ScoreBoard/ScoreBoard";
import "./Board.css";
import State from "../../models/State";
import Card from "../Card/Card";
import Hand from "../Hand/Hand";

function Board() {
  const [state, setGameState] = useState(new State());

  var player1_cards = [];
  var player2_cards = [];
  var player3_cards = [];
  var player4_cards = [];

  for (let i = 0; i < state.all_cards[0].length; i++)
    player1_cards.push(
      <Card
        card={state.all_cards[0][i]}
        index={i}
        state = {state}
        setGameState = {setGameState}
        key={state.all_cards[0][i]}
      />
    );
  for (let i = 0; i < state.all_cards[1].length; i++)
    player2_cards.push(
      <Card
        card={state.fully_visible ? state.all_cards[1][i] : null}
        index={i}
        state = {state}
        setGameState = {setGameState}
        key={state.all_cards[1][i]}
      />
    );
  for (let i = 0; i < state.all_cards[2].length; i++)
    player3_cards.push(
      <Card
        card={state.fully_visible ? state.all_cards[2][i] : null}
        index={i}
        state = {state}
        setGameState = {setGameState}
        key={state.all_cards[2][i]}
      />
    );
  for (let i = 0; i < state.all_cards[3].length; i++)
    player4_cards.push(
      <Card
        card={state.fully_visible ? state.all_cards[3][i] : null}
        index={i}
        state = {state}
        setGameState = {setGameState}
        key={state.all_cards[3][i]}
      />
    );

  return (
    <div id="board">
      <div className="background">
        <ScoreBoard />
        <div className="border">
          <div className="table">
            <div className="team2">
              <Hand cards={player4_cards} player="p4" key="p4" />
              <Hand cards={player3_cards} player="p2" key="p2" />
            </div>
            <div className="team1">
              <Hand cards={player2_cards} player="p3" key="p3" />
              <Hand cards={player1_cards} player="p1" key="p1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Board;
