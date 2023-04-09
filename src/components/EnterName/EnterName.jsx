import React from 'react'
import { createClient } from '@supabase/supabase-js'
import './EnterName.css'
import { useSetUser } from '../../contexts/UserContext'

function EnterName() {
  const setUser = useSetUser()
  const DB_URL = process.env.REACT_APP_DB_URL
  const DB_KEY = process.env.REACT_APP_DB_KEY
  const supabase = createClient(DB_URL, DB_KEY)

  const handleClick = async () => {
    const username = document.getElementById('username').value
    const { data, error } = await supabase.from('players').select('name').eq('name', username)
    if (error || data.length > 0) return
    const { insertError } = await supabase.from('players').insert({ name: username })
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
