import React from 'react'
import './Card.css'

function Card({card}) {
  return (
    <img src={`/assets/cards/${card}.svg`} className='player1 card' key={card} alt={card}/>
  )
}

export default Card