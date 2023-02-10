let userId = "You-0";
let baseUrl = "http://localhost:5000/";
// let baseUrl = "https://29.gilobyte.com/";

let clearTableDelay = 2000;

let card_rank = { "7": 0, "8": 1, "Q": 2, "K": 3, "T": 4, "1": 5, "9": 6, "J": 7 }
let powers = { "J": 3, "9": 2, "1": 1, "T": 1, "K": 0, "Q": 0, "8": 0, "7": 0 }

const images = [
    "/29points/assets/cards/1H.svg",
    "/29points/assets/cards/7H.svg",
    "/29points/assets/cards/8H.svg",
    "/29points/assets/cards/9H.svg",
    "/29points/assets/cards/TH.svg",
    "/29points/assets/cards/JH.svg",
    "/29points/assets/cards/KH.svg",
    "/29points/assets/cards/QH.svg",
    "/29points/assets/cards/1S.svg",
    "/29points/assets/cards/7S.svg",
    "/29points/assets/cards/8S.svg",
    "/29points/assets/cards/9S.svg",
    "/29points/assets/cards/TS.svg",
    "/29points/assets/cards/JS.svg",
    "/29points/assets/cards/KS.svg",
    "/29points/assets/cards/QS.svg",
    "/29points/assets/cards/1C.svg",
    "/29points/assets/cards/7C.svg",
    "/29points/assets/cards/8C.svg",
    "/29points/assets/cards/9C.svg",
    "/29points/assets/cards/TC.svg",
    "/29points/assets/cards/JC.svg",
    "/29points/assets/cards/KC.svg",
    "/29points/assets/cards/QC.svg",
    "/29points/assets/cards/1D.svg",
    "/29points/assets/cards/7D.svg",
    "/29points/assets/cards/8D.svg",
    "/29points/assets/cards/9D.svg",
    "/29points/assets/cards/TD.svg",
    "/29points/assets/cards/JD.svg",
    "/29points/assets/cards/KD.svg",
    "/29points/assets/cards/QD.svg",
]

export { card_rank, powers, userId, baseUrl, clearTableDelay, images }; 