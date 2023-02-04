import { getSuitCards, getHandPower, rankCards } from "./utils";

const tallyRound = (state) => {
  let history = [];
  let starter = state.hands_history
    ? state.hands_history.at(-1)[2]
    : state.player_id;
  let starter_idx = state.player_ids.indexOf(starter);
  starter = state.player_ids[starter_idx];
  history.push(starter);
  history.push(state.played);

  let played_ranked = rankCards(state.played);
  let winning_card = null;

  var i = 0,
    len = played_ranked.length;

  if (!state.trump_revealed) {
    let curr_suit = state.played[0][1];
    for (i = 0; i < len; i++) {
      if (played_ranked[i][1] === curr_suit) {
        winning_card = played_ranked[i];
        break;
      }
    }
  } else {
    let trump_played = getSuitCards(played_ranked, state.trump_suit);

    if (!trump_played) {
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
  let winner = state.player_ids[(starter_idx + winning_card_idx) % 4];
  history.push(winner);
  state.hands_history.push(history);

  if (state.teams[0]["players"].includes(winner))
    state.teams[0]["won"] += points;
  else state.teams[1]["won"] += points;

  state.player_id = winner;

  state.played = [];

  return state;
};

export default tallyRound;
