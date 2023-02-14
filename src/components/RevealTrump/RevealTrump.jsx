import React from 'react';
import { revealTrump } from '../../utils/functions';
import './RevealTrump.css';

function RevealTrump({ state, setGameState }) {
  return (
    <img
      id="reveal-trump"
      src="/29points/assets/imgs/reveal-trump.png"
      alt="reveal trump"
      onClick={() => setGameState(revealTrump(state))}
    />
  );
}

export default RevealTrump;
