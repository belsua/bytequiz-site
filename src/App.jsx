// src/App.jsx
import React, { useState } from 'react'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth' // Firebase functions
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' // Import Router, Route, and Routes
import { auth } from './firebase/firebase' // Firebase config
import Navbar from './components/UI/Navbar'
import MainContent from './components/UI/MainContent'
import Footer from './components/UI/Footer'
import Dashboard from './pages/Dashboard'
import Login from './components/Auth/Login' // Login component

function App() {
  const [user, setUser] = useState(null)

  // Function for email/password sign-in
  const emailPasswordSignIn = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      setUser(result.user)
    } catch (error) {
      console.error('Error during sign-in:', error)
      throw error
    }
  }

  // Function to handle sign-out
  const handleSignOut = async () => {
    try {
      await signOut(auth)
      setUser(null) // Reset user state after sign-out
    } catch (error) {
      console.error('Error during sign-out:', error)
    }
  }

  // return (
  //   <Router>
  //     <div className="flex flex-col min-h-screen">
  //       <Navbar user={user} handleSignOut={handleSignOut} />
  //       <Routes>
  //         <Route path="/" element={<MainContent />} />
  //         <Route path="/login" element={<Login emailPasswordSignIn={emailPasswordSignIn} />} /> {/* Pass the login function */}
  //         <Route path="/dashboard" element={<Dashboard user={user} />} /> {/* Pass user to Dashboard */}
  //       </Routes>
  //       <Footer />
  //     </div>
  //   </Router>
  // )

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar user={user} handleSignOut={handleSignOut} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/login" element={<Login emailPasswordSignIn={emailPasswordSignIn} />} /> {/* Pass the login function */}
            <Route path="/dashboard" element={<Dashboard user={user} />} /> {/* Pass user to Dashboard */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
