import React from "react";
import "./Card.css";

function Card({ card, index }) {
  function drawCard(e) {
    let card = document.getElementById(e.target.id);
    card.classList.add("player1card");
  }
  return (
    <img
      style={{ left: `calc(${index} * 20px)` }}
      src={`/assets/cards/${card ? card + ".svg" : "back.png"}`}
      className="card"
      id={card}
      key={card}
      alt={card}
      onClick={drawCard}
    />
  );
}

export default Card;
