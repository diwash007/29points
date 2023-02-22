import React, { useState, useContext } from 'react'
import State from '../models/State'

const StateContext = React.createContext()
const SetStateContext = React.createContext()

export const useGameState = () => useContext(StateContext)
export const useSetGameState = () => useContext(SetStateContext)

export function StateProvider({ children }) {
  const [state, setGameState] = useState(new State())

  return (
    <StateContext.Provider value={state}>
      <SetStateContext.Provider value={setGameState}>{children}</SetStateContext.Provider>
    </StateContext.Provider>
  )
}
