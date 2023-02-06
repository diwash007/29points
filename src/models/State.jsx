import {shuffle} from '../utils/utils';


export default class State {
  deck = [
    "JH", "9H", "1H", "TH", "KH", "QH", "8H", "7H",
    "JC", "9C", "1C", "TC", "KC", "QC", "8C", "7C",
    "JD", "9D", "1D", "TD", "KD", "QD", "8D", "7D",
    "JS", "9S", "1S", "TS", "KS", "QS", "8S", "7S",
  ]

  constructor(playerId, playerIds, teams, cards, bidHistory, bidState, played, handsHistory, trumpSuit, trumpRevealed, all_cards, fully_visible = false) {
    this.playerId = playerId;
    this.playerIds = playerIds;
    this.teams = teams;
    this.cards = cards;
    this.bidHistory = bidHistory;
    this.bidState = bidState;
    this.played = played;
    this.handsHistory = handsHistory;
    this.trumpSuit = trumpSuit;
    this.trumpRevealed = trumpRevealed;
    this.all_cards = all_cards;

    this.fully_visible = fully_visible;
    this.game_over = false
    this.reset();
  }

  reset() {
    this.playerId = "You-0";
    this.playerIds = ["You-0", "Opponent-0", "You-1", "Opponent-1"];
    this.cards = [];
    this.bidHistory = [];
    this.bidState = {"defenderId": "You-0", "challengerId": "Opponent-0", "defenderBid": 0, "challengerBid": 0}
    this.handsHistory = [];
    this.played = [];
    this.teams = [{"players": ["You-0", "You-1"], "bid": 16, "won": 0}, {"players": ["Opponent-0", "Opponent-1"], "bid": 0, "won": 0}];
    this.trumpSuit = "H";
    this.bid_winner = null;
    this.trumpRevealed = false;
    this.all_cards = [[], [], [], []];

    this.deal_cards();
    this.deal_cards();
  }

  deal_cards() {
    let shuffled_deck = shuffle(this.deck);
    for (let i=0; i<4; i++) {
      for (let j=0; j<4; j++) {
        this.all_cards[i].push(shuffled_deck.pop());
      }
    }
  }
}
