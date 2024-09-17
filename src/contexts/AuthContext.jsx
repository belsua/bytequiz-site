// src/context/AuthContext.jsx
import React, { createContext, useEffect, useState } from 'react'
import { auth } from '../firebase/firebase'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, setPersistence, browserLocalPersistence } from 'firebase/auth'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true) // Add loading state

  useEffect(() => {
    // Set persistence to local to keep the user signed in even after closing the browser
    setPersistence(auth, browserLocalPersistence).catch(error => {
      console.error('Error setting persistence:', error)
    })

    // Check authentication state and set loading to false when done
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      setLoading(false) // Set loading to false once Firebase has checked auth state
    })

    return () => unsubscribe()
  }, [])

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = () => {
    return signOut(auth)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children} {/* Only render children when not loading */}
    </AuthContext.Provider>
  )
}
