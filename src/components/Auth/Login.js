// src/components/Auth/Login.js
import React, { useState } from 'react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../../firebase/firebase'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [error, setError] = useState(null)
  const navigate = useNavigate() // To programmatically navigate after login

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      // Redirect to dashboard after successful login
      navigate('/dashboard')
    } catch (error) {
      setError('Error during sign-in: ' + error.message)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl mb-4">Login</h1>
      <button onClick={googleSignIn} className="bg-green-500 px-4 py-2 rounded">
        Sign In with Google
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  )
}

export default Login
