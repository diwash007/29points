import Board from './components/Board/Board'
import { StateProvider } from './contexts/StateContext'

function App() {
  return (
    <StateProvider>
      <Board />
    </StateProvider>
  )
}

export default App
