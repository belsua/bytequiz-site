// src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ref, get } from 'firebase/database' // Import Firebase database functions
import { database } from '../firebase/firebase' // Import the database instance

const Dashboard = ({ user }) => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)

  // Redirect if the user is not logged in
  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [user, navigate])

  // Fetch data from Firebase
  useEffect(() => {
    if (user) {
      const userId = user.uid // Get the logged-in user's UID
      const userRef = ref(database, `users/${userId}`) // Reference to the user's data in the database

      const fetchData = async () => {
        try {
          const snapshot = await get(userRef)
          if (snapshot.exists()) {
            setUserData(snapshot.val()) // Store the user's data in state
          } else {
            console.log('No data available')
          }
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }

      fetchData()
    }
  }, [user])

  if (!userData) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Welcome to Your Dashboard</h1>

      {/* Render the user's profile data */}
      <div className="mb-4">
        <h2 className="text-2xl">Profile</h2>
        <p>
          <strong>Name:</strong> {userData.profile.name}
        </p>
        <p>
          <strong>Player ID:</strong> {userData.profile.playerId}
        </p>
      </div>

      {/* Render the user's stats data */}
      <div className="mb-4">
        <h2 className="text-2xl">Stats</h2>
        <ul>
          <li>
            <strong>Computer Elements:</strong> {userData.stats.computerElements}
          </li>
          <li>
            <strong>Computer History:</strong> {userData.stats.computerHistory}
          </li>
          <li>
            <strong>Intro Programming:</strong> {userData.stats.introProgramming}
          </li>
          <li>
            <strong>Is Intro Programming Unlocked:</strong> {userData.stats.isIntroProgrammingUnlocked ? 'Yes' : 'No'}
          </li>
          <li>
            <strong>Is Number System Unlocked:</strong> {userData.stats.isNumberSystemUnlocked ? 'Yes' : 'No'}
          </li>
          <li>
            <strong>Need Welcome:</strong> {userData.stats.needWelcome ? 'Yes' : 'No'}
          </li>
          <li>
            <strong>Number System:</strong> {userData.stats.numberSystem}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Dashboard
