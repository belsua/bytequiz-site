// src/components/UI/Navbar.jsx
import React, { useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext' // Import AuthContext

const Navbar = () => {
  const navigate = useNavigate()
  const { user, logout } = useContext(AuthContext) // Access user and logout from AuthContext

  const handleLogout = async () => {
    await logout() // Call the logout function from AuthContext
    navigate('/') // Redirect to home after sign-out
  }

  return (
    <nav className="bg-gray-800 p-4 text-white sticky top-0 left-0 right-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-xl font-bold">
          ByteQuiz
        </a>
        <div className="flex items-center gap-4">
          {user && (
            <>
              <Link to="/dashboard" className="bg-blue-500 px-4 py-2 rounded">
                Dashboard
              </Link>
              <p className="mr-4">Hello, {user.email}</p>
              <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
                Sign Out
              </button>
            </>
          )}
          {!user && (
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
