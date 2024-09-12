// src/App.jsx
import React, { useState } from 'react'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { auth } from './firebase/firebase'
import Navbar from './components/UI/Navbar'
import MainContent from './components/UI/MainContent'
import Footer from './components/UI/Footer'
import Dashboard from './pages/Dashboard'

function App() {
  const [user, setUser] = useState(null)

  const googleSignIn = async navigate => {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      setUser(result.user)
      navigate('/dashboard') // Redirect to dashboard after successful login
    } catch (error) {
      console.error('Error during sign-in:', error)
    }
  }

  const handleSignOut = async navigate => {
    await signOut(auth)
    setUser(null)
    navigate('/') // Redirect to homepage after signout
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar user={user} googleSignIn={googleSignIn} handleSignOut={handleSignOut} />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} /> {/* Pass user to Dashboard */}
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
