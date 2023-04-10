import { baseUrl } from '../utils/constants'
import { bid, getLegalCards, playGame, roundOver } from '../utils/functions'
import { dprint } from '../utils/utils'
import Action from './Action'

export default class Bot {
  static bid(state, setGameState, delay) {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state)
    }
    setTimeout(() => {
      fetch(baseUrl + 'bid', options)
        .then((response) => response.json())
        .then((data) => {
          bid(data.bid, state, setGameState)
        })
    }, delay * 1000)
  }

  static chooseTrump(state, setGameState) {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state)
    }
    fetch(baseUrl + 'chooseTrump', options)
      .then((response) => response.json())
      .then((data) => {
        const newState = Object.assign(Object.create(Object.getPrototypeOf(state)), state)
        newState.hiddenTrumpSuit = data.suit
        newState.dealCards()
        dprint(`Trump selected: ${data.suit} - ${state.bidWinner}`)
        setGameState(newState)
      })
  }

  static play(bot, state, setGameState, delay, theme) {
    switch (bot) {
      case 'pro': {
        state.delay = delay
        const options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(state)
        }
        fetch(baseUrl + 'play', options)
          .then((response) => response.json())
          .then((data) => {
            const newState = playGame(state, new Action(data.card, data.revealTrump), theme)
            roundOver(newState, setGameState)
          })
        break
      }
      case 'noob': {
        setTimeout(() => {
          const legalCards = getLegalCards(state)
          const CardToPlay = legalCards[Math.floor(Math.random() * legalCards.length)]
          const newState = playGame(state, new Action(CardToPlay, null), theme)
          roundOver(newState, setGameState)
        }, delay * 1000)

        break
      }
      case 'hacker': {
        state.hacker = true
        state.delay = delay
        const options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(state)
        }
        fetch(baseUrl + 'play', options)
          .then((response) => response.json())
          .then((data) => {
            const newState = playGame(state, new Action(data.card, data.revealTrump), theme)
            roundOver(newState, setGameState)
          })
        break
      }
    }
  }
}
