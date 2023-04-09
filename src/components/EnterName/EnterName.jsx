import React from 'react'
import './EnterName.css'
import { useSetUser } from '../../contexts/UserContext'
import { useDatabase } from '../../contexts/DbContext'

function EnterName() {
  const setUser = useSetUser()
  const database = useDatabase()

  const handleClick = async () => {
    const username = document.getElementById('username').value
    const { data, error } = await database.from('players').select('name').eq('name', username)
    if (error || data.length > 0) return
    const { insertError } = await database.from('players').insert({ name: username })
    if (insertError) console.log(insertError)
    setUser(username)
  }
  return (
    <div id="root">
      <div className="input-field">
        <input type="text" id="username" required spellCheck="false" />
        <label>Enter name</label>
        <br />
        <button className="username-btn" onClick={handleClick}>
          Submit
        </button>
      </div>
    </div>
  )
}

export default EnterName
