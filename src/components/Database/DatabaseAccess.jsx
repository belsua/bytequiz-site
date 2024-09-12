// src/components/Database/DatabaseAccess.js
import React, { useEffect, useState } from 'react'
import { useDatabase } from '../../hooks/useDatabase' // Import the custom hook

const DatabaseAccess = () => {
  const [data, setData] = useState(null)
  const { fetchData, writeData } = useDatabase()

  // Fetch data on component mount
  useEffect(() => {
    const fetchDataFromDB = async () => {
      const result = await fetchData('/users/someUserID/data') // Replace with your database path
      setData(result)
    }

    fetchDataFromDB()
  }, [])

  // Example function to write data
  const handleWriteData = () => {
    const newData = { name: 'John Doe', age: 30 }
    writeData('/users/someUserID/data', newData) // Replace with your database path
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold">Database Access</h1>
      <button onClick={handleWriteData} className="bg-green-500 px-4 py-2 rounded">
        Write Data
      </button>
      <div className="mt-4">{data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>No data available</p>}</div>
    </div>
  )
}

export default DatabaseAccess
