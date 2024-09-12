// src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ref, get } from 'firebase/database' // Import Firebase database functions
import { database } from '../firebase/firebase' // Import the database instance

const Dashboard = () => {
  const navigate = useNavigate()
  const [usersData, setUsersData] = useState(null)

  // Fetch all users' data from Firebase
  useEffect(() => {
    const fetchData = async () => {
      const usersRef = ref(database, 'users') // Reference to the 'users' node in the database

      try {
        const snapshot = await get(usersRef)
        if (snapshot.exists()) {
          setUsersData(snapshot.val()) // Store all users' data in state
        } else {
          console.log('No data available')
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [navigate])

  if (!usersData) {
    return <div>Loading...</div> // Show loading while data is being fetched
  }

  // Recursive function to render nested objects
  const renderNestedObject = obj => {
    return Object.entries(obj).map(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        // If the value is an object, recursively render it
        return (
          <div key={key} style={{ marginLeft: '20px' }}>
            <strong>{key}:</strong>
            <div>{renderNestedObject(value)}</div>
          </div>
        )
      } else {
        // If the value is a primitive type, render it directly
        return (
          <div key={key} style={{ marginLeft: '20px' }}>
            <strong>{key}:</strong> {value !== null ? value.toString() : 'null'}
          </div>
        )
      }
    })
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Users Dashboard</h1>

      {/* Iterate over all users and display their data */}
      {Object.entries(usersData).map(([userId, user]) => (
        <div key={userId} className="mb-6">
          <h2 className="text-2xl">Profile</h2>
          {user.profile ? renderNestedObject(user.profile) : <p>No profile data available</p>} {/* Render profile section */}
          <h2 className="text-2xl mt-4">Stats</h2>
          {user.stats ? renderNestedObject(user.stats) : <p>No stats data available</p>} {/* Render stats section */}
          <h2 className="text-2xl mt-4">Activities</h2>
          {user.activities ? (
            Object.entries(user.activities).map(([activityId, activity]) => (
              <div key={activityId} style={{ marginLeft: '20px' }}>
                <p>
                  <strong>Date-Time:</strong> {activity['date-time']}
                </p>
                <p>
                  <strong>Minigame:</strong> {activity.minigame}
                </p>
                <p>
                  <strong>Mode:</strong> {activity.mode}
                </p>
                <p>
                  <strong>Topic:</strong> {activity.topic}
                </p>
                <p>
                  <strong>Score:</strong> {activity.score}
                </p>
                <p>
                  <strong>Players:</strong> {activity.players ? activity.players.join(', ') : 'No players available'}
                </p>
              </div>
            ))
          ) : (
            <p>No activities data available</p>
          )}
          <hr className="my-4" />
        </div>
      ))}
    </div>
  )
}

export default Dashboard
