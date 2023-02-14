import { cardRank, DEBUG, powers } from './constants'
import images from './images'

const shuffle = function (array) {
  let currentIndex = array.length
  let randomIndex
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }
  return array
}

const getSuitCards = (cards, cardSuit) => {
  return cards.filter((card) => card[1] === cardSuit)
}

const getHandPower = (cards) => {
  let power = 0
  for (let i = 0; i < cards.length; i++) power += powers[cards[i][0]]
  return power
}

const rankCards = function (cards) {
  const cardsRank = {}
  for (let i = 0; i < cards.length; i++) {
    cardsRank[cards[i]] = cardRank[cards[i][0]]
  }
  return Object.keys(cardsRank).sort(function (a, b) {
    return cardsRank[b] - cardsRank[a]
  })
}

const getCardRank = (card) => {
  return cardRank[card[0]]
}

function sleep(ms) {
  const start = Date.now()
  let now = start
  while (now - start < ms) {
    now = Date.now()
  }
}

const cacheImages = async (setIsLoading) => {
  const promises = await images.map((src) => {
    return new Promise(function (resolve, reject) {
      const img = new Image()
      img.src = src
      img.onload = resolve()
      img.onerror = reject(new Error())
    })
  })
  await Promise.all(promises)
  setIsLoading(false)
}

const dprint = (msg) => {
  if (DEBUG) console.log(msg)
}

export { shuffle, getSuitCards, getHandPower, rankCards, getCardRank, sleep, cacheImages, dprint }
