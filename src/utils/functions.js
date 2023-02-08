import { userId } from "./constants";
import { getSuitCards, getHandPower, rankCards } from "./utils";

const tallyRound = (prev_state) => {

  let state = Object.assign(
    Object.create(Object.getPrototypeOf(prev_state)),
    prev_state
  );
  let history = [];
  let starter =
    state.handsHistory.length !== 0
      ? state.handsHistory.at(-1)[2]
      : state.playerId;
  let starter_idx = state.playerIds.indexOf(starter);
  starter = state.playerIds[starter_idx];
  history.push(starter);
  history.push(state.played);

  let played_ranked = rankCards(state.played);
  let winning_card = null;

  var i = 0,
    len = played_ranked.length;

  if (!state.trumpRevealed) {
    let curr_suit = state.played[0][1];
    for (i = 0; i < len; i++) {
      if (played_ranked[i][1] === curr_suit) {
        winning_card = played_ranked[i];
        break;
      }
    }
  } else {
    let trump_played = getSuitCards(played_ranked, state.trumpSuit);

    if (trump_played.length === 0) {
      let curr_suit = state.played[0][1];
      for (i = 0; i < len; i++) {
        if (played_ranked[i][1] === curr_suit) {
          winning_card = played_ranked[i];
          break;
        }
      }
    } else {
      winning_card = trump_played[0];
    }
  }
  let points = getHandPower(state.played);
  let winning_card_idx = state.played.indexOf(winning_card);
  let winner = state.playerIds[(starter_idx + winning_card_idx) % 4];
  history.push(winner);
  state.handsHistory.push(history);

  if (state.teams[0]["players"].includes(winner))
    state.teams[0]["won"] += points;
  else state.teams[1]["won"] += points;

  state.playerId = winner;
  console.log(`round over: winner is ${winner} -> ${winning_card}`);

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (state.all_cards[i].includes(state.played[j])) state.all_cards[i] = state.all_cards[i].filter(item => item !== state.played[j])
    }
  }

  state.cards = state.all_cards[state.playerIds.indexOf(winner)];
  state.played.length = 0;
  document.getElementsByClassName("p1-draw")[0].style.display = "none";
  for (let i = 2; i < 5; i++) {
    const card = document.getElementById(`p${i}`);
    card.firstChild.src = `/assets/cards/back.png`;
    card.firstChild.classList.remove(`p${i}-draw`);
  }

  if (state.handsHistory.length === 8) state.game_over = true;
  return state;
};

const playGame = (state, action) => {

  let new_state = Object.assign(
    Object.create(Object.getPrototypeOf(state)),
    state
  );

  let curr_playerIdx = new_state.playerIds.indexOf(new_state.playerId)

  if (action.reveal_trump) {
    return revealTrump(new_state);
  } else {
    new_state.played.push(action.card);
    if (new_state.playerId !== userId) {
      const card = document.getElementById(`p${curr_playerIdx + 1}`);
      card.firstChild.src = `/assets/cards/${action.card}.svg`;
      card.firstChild.classList.add(`p${curr_playerIdx + 1}-draw`);
    }

  }
  console.log(`${new_state.playerId} -> ${action.card}`);
  new_state.playerId = new_state.playerIds[(curr_playerIdx + 1) % 4]
  new_state.cards = new_state.all_cards[(curr_playerIdx + 1) % 4]

  return new_state;
}

const canRevealTrump = (state) => {
  let curr_suit = state.played[0][1];
  let curr_playerIdx = state.playerIds.indexOf(state.playerId);
  if (!state.all_cards[curr_playerIdx].toString().includes(curr_suit)) return true;
  return false;
}

const revealTrump = (state) => {
  let new_state = Object.assign(
    Object.create(Object.getPrototypeOf(state)),
    state
  );
  new_state.trumpRevealed = {
    "hand": new_state.handsHistory.length,
    "playerId": new_state.playerId
  }
  new_state.trumpSuit = new_state.hiddenTrumpSuit;
  return new_state;
}

export { tallyRound, playGame, canRevealTrump, revealTrump };
