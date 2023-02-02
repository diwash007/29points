export default class State {
  constructor(player_id, player_ids, teams, cards, bid_history, played, hands_history, trump_suit = null, trump_revealed = false, all_cards, fully_visible = false) {
    this.player_id = player_id;
    this.player_ids = player_ids;
    this.teams = teams;
    this.cards = cards;
    this.bid_history = bid_history;
    this.played = played;
    this.hands_history = hands_history;
    this.trump_suit = trump_suit;
    this.trump_revealed = trump_revealed;
    this.all_cards = all_cards;

    this.fully_visible = fully_visible;
  }
}
