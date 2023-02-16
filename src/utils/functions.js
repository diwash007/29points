import { clearTableDelay, userId } from './constants'
import { getSuitCards, getHandPower, rankCards, getCardRank, dprint } from './utils'

const tallyRound = (prevState) => {
  const state = Object.assign(Object.create(Object.getPrototypeOf(prevState)), prevState)
  const history = []
  let starter = state.handsHistory.length !== 0 ? state.handsHistory.at(-1)[2] : state.playerId
  const starterIndex = state.playerIds.indexOf(starter)
  starter = state.playerIds[starterIndex]
  history.push(starter)
  history.push(JSON.parse(JSON.stringify(state.played)))
  const playedRanked = rankCards(state.played)
  let winningCard = null

  let i = 0
  const len = playedRanked.length

  if (!state.trumpRevealed) {
    const currSuit = state.played[0][1]
    for (i = 0; i < len; i++) {
      if (playedRanked[i][1] === currSuit) {
        winningCard = playedRanked[i]
        break
      }
    }
  } else {
    const trumpPlayed = getSuitCards(playedRanked, state.trumpSuit)

    if (trumpPlayed.length === 0) {
      const currSuit = state.played[0][1]
      for (i = 0; i < len; i++) {
        if (playedRanked[i][1] === currSuit) {
          winningCard = playedRanked[i]
          break
        }
      }
    } else {
      winningCard = trumpPlayed[0]
    }
  }
  const points = getHandPower(state.played)
  const winningCardIndex = state.played.indexOf(winningCard)
  const winner = state.playerIds[(starterIndex + winningCardIndex) % 4]
  history.push(winner)
  state.handsHistory.push(history)

  if (state.teams[0].players.includes(winner)) state.teams[0].won += points
  else state.teams[1].won += points

  state.playerId = winner
  const card = document.getElementById(winningCard)
  card.classList.add('winner')
  dprint(`round over: winner is ${winner} -> ${winningCard}`)

  if (state.handsHistory.length === 8) state.gameOver = true
  return state
}

const clearTable = (prevState) => {
  const state = Object.assign(Object.create(Object.getPrototypeOf(prevState)), prevState)

  state.cards = state.allCards[state.playerIds.indexOf(state.playerId)]
  state.played.length = 0
  document.getElementsByClassName('p1-draw')[0].style.display = 'none'
  for (let i = 1; i < 5; i++) {
    const hand = document.getElementById(`p${i}`)
    // hand.firstChild.src = `/29points/assets/cards/back.png`;
    // hand.firstChild.classList.remove(`p${i}-draw`, "winner");
    hand.firstChild.remove()
  }

  if (state.handsHistory.length === 8) state.gameOver = true
  return state
}

const playGame = (state, action, theme) => {
  const newState = Object.assign(Object.create(Object.getPrototypeOf(state)), state)

  const currPlayerIndex = newState.playerIds.indexOf(newState.playerId)

  if (action.revealTrump) {
    return revealTrump(newState)
  } else {
    newState.played.push(action.card)
    if (newState.playerId !== userId) {
      const hand = document.getElementById(`p${currPlayerIndex + 1}`)
      const card = hand.firstChild.cloneNode(true)
      card.src = `/29points/assets/cards/${theme}/${action.card}.png`
      card.setAttribute('id', action.card)
      card.classList.add(`p${currPlayerIndex + 1}-draw`)
      hand.firstChild.before(card)

      newState.allCards[currPlayerIndex] = newState.allCards[currPlayerIndex].filter(
        (card) => card !== action.card
      )
    } else {
      const hand = document.getElementById(`p${currPlayerIndex + 1}`)
      const card = document.getElementById(action.card)
      const cardClone = card.cloneNode(true)
      cardClone.classList.add('p1-draw')
      hand.firstChild.before(cardClone)
      newState.allCards[currPlayerIndex] = newState.allCards[currPlayerIndex].filter(
        (card) => card !== action.card
      )
    }
  }
  dprint(`${newState.playerId} -> ${action.card}`)
  newState.playerId = newState.playerIds[(currPlayerIndex + 1) % 4]
  newState.cards = newState.allCards[(currPlayerIndex + 1) % 4]

  return newState
}

const canRevealTrump = (state) => {
  const currSuit = state.played[0][1]
  const currPlayerIndex = state.playerIds.indexOf(state.playerId)
  if (!state.allCards[currPlayerIndex].toString().includes(currSuit)) return true
  return false
}

const revealTrump = (state) => {
  const newState = Object.assign(Object.create(Object.getPrototypeOf(state)), state)
  newState.trumpRevealed = {
    hand: newState.handsHistory.length + 1,
    playerId: newState.playerId
  }
  newState.trumpSuit = newState.hiddenTrumpSuit
  dprint(`Trump revealed by ${state.playerId}`)
  return newState
}

const weWon = (teams) => {
  const ourBid = teams[0].bid
  const ourWon = teams[0].won
  const theirBid = teams[1].bid
  const theirWon = teams[1].won

  if (ourBid > theirBid) {
    if (ourWon >= ourBid) return true
    else return false
  } else {
    if (theirWon < theirBid) return true
    else return false
  }
}

const roundOver = (newState, setGameState) => {
  setGameState(newState)
  if (newState.played.length === 4) {
    newState.roundOver = true
    newState = tallyRound(newState)
    setTimeout(function () {
      newState = clearTable(newState)
      newState.roundOver = false
      setGameState(newState)
    }, clearTableDelay)
  }
}

const getLegalCards = (state) => {
  const cards = []
  const currPlayerIndex = 0
  const playerCards = state.allCards[currPlayerIndex]

  if (state.played.length === 0) {
    for (const card of playerCards) cards.push(card)
  } else {
    const currSuit = state.played[0][1]
    const currSuitCards = getSuitCards(playerCards, currSuit)
    if (currSuitCards.length !== 0) {
      for (const card of currSuitCards) cards.push(card)
    } else {
      if (state.trumpRevealed !== null) {
        const trumpSuitCards = getSuitCards(playerCards, state.trumpSuit)
        if (trumpSuitCards.length !== 0) {
          const wasTrumpRevealedInThisRound =
            state.trumpRevealed.hand === state.handsHistory.length + 1
          const didIRevealTheTrump = state.trumpRevealed.playerId === state.playerId
          if (wasTrumpRevealedInThisRound && didIRevealTheTrump) {
            if (state.played.toString().includes(state.trumpSuit)) {
              const playedTrumps = getSuitCards(state.played, state.trumpSuit)
              const playedTrumpsRanked = rankCards(playedTrumps)

              if (state.played.length === 2) {
                if (state.played.indexOf(playedTrumpsRanked[0]) === 0) {
                  for (const card of playerCards) cards.push(card)
                } else {
                  for (const card of playerCards) {
                    if (
                      card[1] === state.trumpSuit &&
                      getCardRank(card) > getCardRank(playedTrumpsRanked[0])
                    ) {
                      cards.push(card)
                    }
                  }
                }
              } else if (state.played.length === 3) {
                if (state.played.indexOf(playedTrumpsRanked[0]) === 1) {
                  for (const card of playerCards) cards.push(card)
                } else {
                  for (const card of playerCards) {
                    if (
                      card[1] === state.trumpSuit &&
                      getCardRank(card) > getCardRank(playedTrumpsRanked[0])
                    ) {
                      cards.push(card)
                    }
                  }
                }
              }
            } else {
              for (const card of trumpSuitCards) cards.push(card)
            }
          } else {
            for (const card of playerCards) cards.push(card)
          }
        } else {
          for (const card of playerCards) cards.push(card)
        }
      } else {
        for (const card of playerCards) cards.push(card)
      }
    }
  }
  return cards
}

const bid = (bid, prevState, setGameState) => {
  const state = Object.assign(Object.create(Object.getPrototypeOf(prevState)), prevState)

  const history = []
  history.push(state.playerId)
  history.push(bid)
  state.bidHistory.push(history)
  dprint(`${state.playerId} bid: ${bid}`)

  const currPlayerIndex = state.playerIds.indexOf(state.playerId)
  const hand = document.getElementById(`p${currPlayerIndex + 1}-bid`)
  hand.innerHTML = bid <= state.bidState.bid ? 'pass' : `bid: ${bid}`

  if (bid <= state.bidState.bid) {
    state.bidPass.push(state.playerId)
  } else if (bid > 0) {
    state.bidState.bidder = state.playerId
    state.bidState.bid = bid
  }
  state.playerId = state.playerIds[(currPlayerIndex + 1) % 4]
  if (state.bidPass.length === 3) {
    state.bidWinner = state.bidState.bidder
    if (state.bidState.bid === 15) {
      state.bidState.bid = 16
      state.bidWinner = 'Opponent-1'
      const p4Hand = document.getElementById(`p4-bid`)
      p4Hand.innerHTML = `bid: 16`
    }
    if (state.teams[0].players.includes(state.bidWinner)) {
      state.teams[0].bid = state.bidState.bid
    } else {
      state.teams[1].bid = state.bidState.bid
      state.teams[0].bid = 0
    }
    dprint(`Bid winner: ${state.bidWinner} - ${state.bidState.bid}`)
    state.playerId = userId
  }
  setGameState(state)
}

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
}
