// src/components/UI/Navbar.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ user, handleSignOut }) => {
  const navigate = useNavigate() // useNavigate inside the Navbar component

  const handleLogout = async () => {
    await handleSignOut() // Call the sign-out function from App
    navigate('/') // Redirect to home after sign-out
  }

  return (
    <nav className="bg-gray-800 p-4 text-white sticky top-0 left-0 right-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-xl font-bold">
          ByteQuiz
        </a>
        <div>
          {user ? (
            <div className="flex items-center">
              <p className="mr-4">Hello, {user.email}</p>
              <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
                Sign Out
              </button>
            </div>
          ) : (
            <a href="/login" className="bg-green-500 px-4 py-2 rounded">
              Sign In
            </a>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
