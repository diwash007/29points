import React, { useState, useContext, useEffect } from 'react'

const ThemeContext = React.createContext()
const SetThemeContext = React.createContext()

export const useTheme = () => useContext(ThemeContext)
export const useSetTheme = () => useContext(SetThemeContext)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('')

  useEffect(() => {
    const cardTheme = localStorage.getItem('theme')
    if (!cardTheme) localStorage.setItem('theme', 'bhoos')
    setTheme(cardTheme || 'bhoos')
  }, [theme])

  return (
    <ThemeContext.Provider value={theme}>
      <SetThemeContext.Provider value={setTheme}>{children}</SetThemeContext.Provider>
    </ThemeContext.Provider>
  )
}
