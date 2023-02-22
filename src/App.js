import Board from './components/Board/Board'
import { StateProvider } from './contexts/StateContext'
import { ThemeProvider } from './contexts/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <StateProvider>
        <Board />
      </StateProvider>
    </ThemeProvider>
  )
}

export default App
