import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ user, googleSignIn, handleSignOut }) => {
  const navigate = useNavigate()

  const handleLogin = () => {
    googleSignIn(navigate)
  }

  const handleLogout = () => {
    handleSignOut(navigate)
  }

  return (
    <nav className="bg-gray-800 p-4 text-white fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-xl font-bold">
          My App
        </a>
        <div>
          {user ? (
            <div className="flex items-center">
              <p className="mr-4">Welcome, {user.displayName}</p>
              <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
                Sign Out
              </button>
            </div>
          ) : (
            <button onClick={handleLogin} className="bg-green-500 px-4 py-2 rounded">
              Sign In with Google
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
