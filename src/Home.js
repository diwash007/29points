import React from 'react'
import { useUser } from './contexts/UserContext'
import EnterName from './components/EnterName/EnterName'
import Board from './components/Board/Board'

function Home() {
  const user = useUser()
  return <div>{!user ? <EnterName /> : <Board />}</div>
}

export default Home
