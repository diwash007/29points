import React, { useState, useContext, useEffect } from 'react'

const UserContext = React.createContext()
const SetUserContext = React.createContext()

export const useUser = () => useContext(UserContext)
export const useSetUser = () => useContext(SetUserContext)

export function UserProvider({ children }) {
  const [user, setUser] = useState('')

  useEffect(() => {
    setUser(localStorage.getItem('user'))
  }, [])

  const updateUser = (username) => {
    setUser(username)
    localStorage.setItem('user', username)
  }

  return (
    <UserContext.Provider value={user}>
      <SetUserContext.Provider value={updateUser}>{children}</SetUserContext.Provider>
    </UserContext.Provider>
  )
}
