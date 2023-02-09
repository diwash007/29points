let userId = "You-0";
let baseUrl = "http://localhost:5000/";
// let baseUrl = "https://29.gilobyte.com/";

let card_rank = { "7": 0, "8": 1, "Q": 2, "K": 3, "T": 4, "1": 5, "9": 6, "J": 7 }
let powers = { "J": 3, "9": 2, "1": 1, "T": 1, "K": 0, "Q": 0, "8": 0, "7": 0 }

export { card_rank, powers, userId, baseUrl }; 