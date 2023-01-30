import React from 'react'
import ScoreBoard from '../ScoreBoard/ScoreBoard'
import './Board.css'

function Board() {
  return (
    <div id='board'>
      <div className='background'>
      <ScoreBoard />
        <div className='border'>
            <div className='table'>

            </div>
        </div>
        </div>
    </div>
  )
}

export default Board