import { card_rank, powers } from "./constants";

const shuffle = function (array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

const getSuitCards = (cards, card_suit) => {
  return cards.filter((card) => card[1] === card_suit);
};

const getHandPower = (cards) => {
  let power = 0;
  for (let i = 0; i < cards.length; i++) power += powers[cards[i][0]];
  return power;
};

const rankCards = function(cards) {
  let cards_rank = {};
  for (let i = 0; i < cards.lenght; i++) {
    cards_rank[cards[i]] = card_rank[cards[i][0]];
  }
  return Object.keys(cards_rank).sort(function (a, b) {
    return cards_rank[b] - cards_rank[a];
  });
};

export { shuffle, getSuitCards, getHandPower, rankCards };
