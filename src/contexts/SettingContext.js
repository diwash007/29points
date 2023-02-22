import React, { useState, useContext } from 'react'

const MenuContext = React.createContext()

export const useMenu = () => useContext(MenuContext)

export const MenuProvider = ({ children }) => {
  const [showMenu, setShowMenu] = useState(true)
  const [bot, setBot] = useState('pro')
  const [delay, setDelay] = useState(1)

  const value = {
    showMenu,
    setShowMenu,
    bot,
    setBot,
    delay,
    setDelay
  }
  return <MenuContext.Provider value={value}> {children} </MenuContext.Provider>
}
