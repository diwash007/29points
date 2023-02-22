import { useEffect } from 'react'
import Board from './components/Board/Board'
import { MenuProvider } from './contexts/SettingContext'
import { StateProvider } from './contexts/StateContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { cacheImages } from './utils/utils'

function App() {
  useEffect(() => {
    cacheImages()
  }, [])

  return (
    <ThemeProvider>
      <MenuProvider>
        <StateProvider>
          <Board />
        </StateProvider>
      </MenuProvider>
    </ThemeProvider>
  )
}

export default App
