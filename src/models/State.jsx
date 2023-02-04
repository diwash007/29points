export default class State {
  constructor(player_id, player_ids, teams, cards, bid_history, bid_state, played, hands_history, trump_suit, trump_revealed, all_cards, fully_visible = false) {
    this.player_id = player_id;
    this.player_ids = player_ids;
    this.teams = teams;
    this.cards = cards;
    this.bid_history = bid_history;
    this.bid_state = bid_state;
    this.played = played;
    this.hands_history = hands_history;
    this.trump_suit = trump_suit;
    this.trump_revealed = trump_revealed;
    this.all_cards = all_cards;

    this.fully_visible = fully_visible;
  }

  reset() {
    this.player_id = "You-0";
    this.player_ids = ["You-0", "Opponent-0", "You-1", "Opponent-1"];
    this.cards = [];
    this.bid_history = [];
    this.bid_state = {"defenderId": "You-0", "challengerId": "Opponent-0", "defenderBid": 0, "challengerBid": 0}
    this.hands_history = [];
    this.played = [];
    this.teams = [{"players": ["You-0", "You-1"], "bid": 0, "won": 0}, {"players": ["Opponent-0", "Opponent-1"], "bid": 0, "won": 0}];
    this.trump_suit = null
    this.trump_revealed = false
    this.all_cards = [[], [], [], []];
  }
}
