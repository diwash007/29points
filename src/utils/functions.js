import { clearTableDelay, userId } from "./constants";
import { getSuitCards, getHandPower, rankCards, getCardRank } from "./utils";

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
  history.push(JSON.parse(JSON.stringify(state.played)));
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
  const card = document.getElementById(winning_card);
  card.classList.add("winner");
  console.log(`round over: winner is ${winner} -> ${winning_card}`);

  if (state.handsHistory.length === 8) state.game_over = true;
  return state;
};

const clearTable = (prev_state) => {
  let state = Object.assign(
    Object.create(Object.getPrototypeOf(prev_state)),
    prev_state
  );

  state.cards = state.all_cards[state.playerIds.indexOf(state.playerId)];
  state.played.length = 0;
  document.getElementsByClassName("p1-draw")[0].style.display = "none";
  for (let i = 1; i < 5; i++) {
    const hand = document.getElementById(`p${i}`);
    // hand.firstChild.src = `/29points/assets/cards/back.png`;
    // hand.firstChild.classList.remove(`p${i}-draw`, "winner");
    hand.firstChild.remove();
  }

  if (state.handsHistory.length === 8) state.game_over = true;
  return state;
};

const playGame = (state, action, theme) => {
  let new_state = Object.assign(
    Object.create(Object.getPrototypeOf(state)),
    state
  );

  let curr_playerIdx = new_state.playerIds.indexOf(new_state.playerId);

  if (action.reveal_trump) {
    return revealTrump(new_state);
  } else {
    new_state.played.push(action.card);
    if (new_state.playerId !== userId) {
      const hand = document.getElementById(`p${curr_playerIdx + 1}`);
      let card = hand.firstChild.cloneNode(true);
      card.src = `/29points/assets/cards/${theme}/${action.card}.png`;
      card.setAttribute("id", action.card);
      card.classList.add(`p${curr_playerIdx + 1}-draw`);
      hand.firstChild.before(card);

      new_state.all_cards[curr_playerIdx] = new_state.all_cards[
        curr_playerIdx
      ].filter((card) => card !== action.card);
    } else {
      const hand = document.getElementById(`p${curr_playerIdx + 1}`);
      const card = document.getElementById(action.card);
      let cardClone = card.cloneNode(true);
      cardClone.classList.add("p1-draw");
      hand.firstChild.before(cardClone);
      new_state.all_cards[curr_playerIdx] = new_state.all_cards[
        curr_playerIdx
      ].filter((card) => card !== action.card);
    }
  }
  console.log(`${new_state.playerId} -> ${action.card}`);
  new_state.playerId = new_state.playerIds[(curr_playerIdx + 1) % 4];
  new_state.cards = new_state.all_cards[(curr_playerIdx + 1) % 4];

  return new_state;
};

const canRevealTrump = (state) => {
  let curr_suit = state.played[0][1];
  let curr_playerIdx = state.playerIds.indexOf(state.playerId);
  if (!state.all_cards[curr_playerIdx].toString().includes(curr_suit))
    return true;
  return false;
};

const revealTrump = (state) => {
  let new_state = Object.assign(
    Object.create(Object.getPrototypeOf(state)),
    state
  );
  new_state.trumpRevealed = {
    hand: new_state.handsHistory.length + 1,
    playerId: new_state.playerId,
  };
  new_state.trumpSuit = new_state.hiddenTrumpSuit;
  return new_state;
};

const weWon = (teams) => {
  let our_bid = teams[0]["bid"];
  let our_won = teams[0]["won"];
  let their_bid = teams[1]["bid"];
  let their_won = teams[1]["won"];

  if (our_bid > their_bid) {
    if (our_won >= our_bid) return true;
    else return false;
  } else {
    if (their_won < their_bid) return true;
    else return false;
  }
};

const roundOver = (new_state, setGameState) => {
  setGameState(new_state);
  if (new_state.played.length === 4) {
    new_state.round_over = true;
    new_state = tallyRound(new_state);
    setTimeout(function () {
      new_state = clearTable(new_state);
      new_state.round_over = false;
      setGameState(new_state);
    }, clearTableDelay);
  }
};

const getLegalCards = (state) => {
  let cards = [];
  let curr_playerIdx = 0;
  let playerCards = state.all_cards[curr_playerIdx];

  if (state.played.length === 0) {
    for (let card of playerCards) cards.push(card);
  } else {
    let curr_suit = state.played[0][1];
    let curr_suit_cards = getSuitCards(playerCards, curr_suit);
    if (curr_suit_cards.length !== 0) {
      for (let card of curr_suit_cards) cards.push(card);
    } else {
      if (state.trumpRevealed !== null) {
        let trump_suit_cards = getSuitCards(playerCards, state.trumpSuit);
        if (trump_suit_cards.length !== 0) {
          let was_trump_revealed_in_this_round =
            state.trumpRevealed["hand"] === state.handsHistory.length + 1;
          let did_i_reveal_the_trump =
            state.trumpRevealed["playerId"] === state.playerId;
          if (was_trump_revealed_in_this_round && did_i_reveal_the_trump) {
            if (state.played.toString().includes(state.trumpSuit)) {
              let played_trumps = getSuitCards(state.played, state.trumpSuit);
              let played_trumps_ranked = rankCards(played_trumps);

              if (state.played.length === 2) {
                if (state.played.indexOf(played_trumps_ranked[0]) === 0) {
                  for (let card of playerCards) cards.push(card);
                } else {
                  for (let card of playerCards) {
                    if (
                      card[1] === state.trumpSuit &&
                      getCardRank(card) > getCardRank(played_trumps_ranked[0])
                    )
                      cards.push(card);
                  }
                }
              } else if (state.played.length === 3) {
                if (state.played.indexOf(played_trumps_ranked[0]) === 1) {
                  for (let card of playerCards) cards.push(card);
                } else {
                  for (let card of playerCards) {
                    if (
                      card[1] === state.trumpSuit &&
                      getCardRank(card) > getCardRank(played_trumps_ranked[0])
                    )
                      cards.push(card);
                  }
                }
              }
            } else {
              for (let card of trump_suit_cards) cards.push(card);
            }
          } else {
            for (let card of playerCards) cards.push(card);
          }
        } else {
          for (let card of playerCards) cards.push(card);
        }
      } else {
        for (let card of playerCards) cards.push(card);
      }
    }
  }
  return cards;
};

const bid = (bid, state, setGameState) => {
  console.log(state);
  let new_state = Object.assign(
    Object.create(Object.getPrototypeOf(state)),
    state
  );
  let history = [];
  let newBidState = { 'defenderId': userId, 'challengerId': 'Opponent-0', 'defenderBid': 0, 'challengerBid': 0 }
  history.push(new_state.playerId);
  history.push(bid);
  new_state.bidHistory.push(history);
  console.log(`${new_state.playerId} bid: ${bid}`)

  if (bid !== 0) {
    if (bid > new_state.bidState.defenderBid) {
      newBidState.challengerId = new_state.bidState.defenderId;
      newBidState.challengerBid = new_state.bidState.defenderBid;
      newBidState.defenderBid = bid;
      newBidState.defenderId = new_state.playerId;

    } else {
      newBidState.defenderId = new_state.playerId;
      newBidState.defenderBid = bid;
    }

  }

  newBidState.challengerId = new_state.playerIds[
    (new_state.playerIds.indexOf(new_state.playerId) + 1) % 4
  ];

  new_state.playerId = newBidState.challengerId;

  if (new_state.bidHistory !== 0 && new_state.playerId === userId) {
    new_state.bid_winner = newBidState.defenderId;
    console.log(`Bid winner: ${new_state.bid_winner}`)
  }

  new_state.bidState = newBidState;

  setGameState(new_state);
};

export {
  tallyRound,
  playGame,
  canRevealTrump,
  revealTrump,
  getLegalCards,
  clearTable,
  weWon,
  roundOver,
  bid
};
