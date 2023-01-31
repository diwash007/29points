import React from 'react'
import './Card.css'

function Card({card}) {
  function drawCard(e) {
    let card = document.getElementById(e.target.id);
    card.style.position = "absolute";
    card.style.top = "60%"
    card.style.right = "50%"
    card.style.transform = `translate(50%, -50%)`;
  }
  return (
    <img src={`/assets/cards/${card ? card + ".svg" : "back.png"}`} className='card' id={card} key={card} alt={card} onClick={drawCard}/>
  )
}

export default Card