// src/components/Auth/Login.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = ({ emailPasswordSignIn }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate() // useNavigate hook to navigate programmatically

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await emailPasswordSignIn(email, password) // Pass email and password to sign-in function
      navigate('/dashboard') // Navigate to the dashboard after successful login
    } catch (error) {
      setError(error.message) // Display error message on login failure
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button type="submit" className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600">
            Sign In
          </button>
        </form>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  )
}

export default Login
