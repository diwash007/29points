export default class State {
    constructor(body) {
        this.player_id = body["playerId"]
        this.player_ids = body["playerIds"]
        this.time_remaining = body["timeRemaining"]
        this.teams = body["teams"]
        this.cards = body["cards"]
        this.bid_history = body["bidHistory"]
        this.played = body["played"]
        this.hands_history = body["handsHistory"]
        this.trump_suit = body["trumpSuit"]
        this.trump_revealed = body["trumpRevealed"]
        this.all_cards = [[], [], [], []]
    }
}