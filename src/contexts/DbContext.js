import React, { useContext, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const DbContext = React.createContext()

export const useDatabase = () => useContext(DbContext)

export function DbProvider({ children }) {
  const DB_URL = process.env.REACT_APP_DB_URL
  const DB_KEY = process.env.REACT_APP_DB_KEY
  let supabase
  useEffect(() => {
    supabase = createClient(DB_URL, DB_KEY)
  }, [])

  return <DbContext.Provider value={supabase}>{children}</DbContext.Provider>
}
