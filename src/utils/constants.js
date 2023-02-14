const userId = 'You-0'
const DEBUG = false
const baseUrl = 'http://localhost:5000/'
// let baseUrl = "https://29.gilobyte.com/";

const clearTableDelay = 2000

const cardRank = { 7: 0, 8: 1, Q: 2, K: 3, T: 4, 1: 5, 9: 6, J: 7 }
const powers = { J: 3, 9: 2, 1: 1, T: 1, K: 0, Q: 0, 8: 0, 7: 0 }

export { cardRank, powers, userId, baseUrl, clearTableDelay, DEBUG }
