import { useEffect } from 'react'
import { MenuProvider } from './contexts/SettingContext'
import { StateProvider } from './contexts/StateContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { cacheImages } from './utils/utils'
import { UserProvider } from './contexts/UserContext'
import Home from './Home'
import { DbProvider } from './contexts/DbContext'

function App() {
  useEffect(() => {
    cacheImages()
  }, [])

  return (
    <DbProvider>
      <UserProvider>
        <ThemeProvider>
          <MenuProvider>
            <StateProvider>
              <Home />
            </StateProvider>
          </MenuProvider>
        </ThemeProvider>
      </UserProvider>
    </DbProvider>
  )
}

export default App
