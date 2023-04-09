import React, { useEffect, useState } from 'react'
import './GameLogs.css'
import { useDatabase } from '../../contexts/DbContext'
import { useUser } from '../../contexts/UserContext'

function GameLogs() {
  const [logs, setLogs] = useState()
  const [showLogs, setShowLogs] = useState(false)
  const database = useDatabase()
  const user = useUser()
  useEffect(() => {
    async function fetchData() {
      const { data } = await database.from('games').select().eq('player', user)
      setLogs(data)
    }
    fetchData()
  })
  const handleClick = () => {
    setShowLogs(!showLogs)
  }
  return (
    <>
      {showLogs && (
        <div id="gamelogs">
          <table>
            <thead>
              <tr>
                <th>Game ID</th>
                <th style={{ width: '50%' }}>Date Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {logs &&
                logs.map((log, index) => {
                  return (
                    <tr key={log.id}>
                      <td>{log.id}</td>
                      <td>{new Date(log.created_at).toUTCString()}</td>
                      <td>{log.win ? 'win' : 'lose'}</td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      )}
      <img
        src="29points/assets/imgs/history.png"
        className="history-logo"
        alt="game history"
        onClick={handleClick}
      />
    </>
  )
}

export default GameLogs
