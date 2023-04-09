import { useEffect } from 'react'
import { MenuProvider } from './contexts/SettingContext'
import { StateProvider } from './contexts/StateContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { cacheImages } from './utils/utils'
import { UserProvider } from './contexts/UserContext'
import Home from './Home'

function App() {
  useEffect(() => {
    cacheImages()
  }, [])

  return (
    <UserProvider>
      <ThemeProvider>
        <MenuProvider>
          <StateProvider>
            <Home />
          </StateProvider>
        </MenuProvider>
      </ThemeProvider>
    </UserProvider>
  )
}

export default App
