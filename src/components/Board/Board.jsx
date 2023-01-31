import React from 'react'
import ScoreBoard from '../ScoreBoard/ScoreBoard'
import './Board.css'
import State from '../../models/State'
import Card from '../Card/Card'
import Hand from '../Hand/Hand'

function Board() {
  let test = new State({"playerId":"gzIfvEBC","playerIds":["gzIfvEBC","Bot 0","pMAA1q7I","Bot 1"],"cards":["JD","JC","TS","8C","7C","9S","1C","KS"],"timeRemaining":0,"bidHistory":[["Bot 0",16],["pMAA1q7I",0],["Bot 1",17],["Bot 0",17],["Bot 1",0],["gzIfvEBC",0]],"handsHistory":[["Bot 0",["JH","8H","KH","7S"],"Bot 0"],["Bot 0",["7H","7C","9H","QD"],"Bot 1"],["Bot 1",["8D","1D","9D","TD"],"Bot 0"]],"played":["1H","8S","9C"],"teams":[{"players":["gzIfvEBC","pMAA1q7I"],"bid":0,"won":0},{"players":["Bot 0","Bot 1"],"bid":17,"won":9}],"trumpSuit":"H","trumpRevealed":{"hand":1,"playerId":"gzIfvEBC"}})
  var player1_cards = []
  var player2_cards = []
  var player3_cards = []
  var player4_cards = []
  for(let i=0; i<test.cards.length; i++)
    player1_cards.push(<Card card={test.cards[i]}/>)
  for(let i=0; i<test.cards.length; i++)
    player2_cards.push(<Card card={test.fully_visible ? test.cards[i] : null}/>)
  for(let i=0; i<test.cards.length; i++)
    player3_cards.push(<Card card={test.fully_visible ? test.cards[i] : null}/>)
  for(let i=0; i<test.cards.length; i++)
    player4_cards.push(<Card card={test.fully_visible ? test.cards[i] : null}/>)
  return (
    <div id='board'>
      <div className='background'>
      <ScoreBoard />
        <div className='border'>
            <div className='table'>
              <div className='team2'>
                <Hand cards={player4_cards} player="p4" key="p4"/>
                <Hand cards={player3_cards} player="p2" key="p2"/>
              </div>
              <div className='team1'>
                <Hand cards={player2_cards} player="p3" key="p3"/>
                <Hand cards={player1_cards} player="p1" key="p1"/>
              </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Board