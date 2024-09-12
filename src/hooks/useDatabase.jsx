// /hooks/useDatabase.js
import { ref, get, set } from 'firebase/database'
import { database } from './firebase/firebase'

export const useDatabase = () => {
  const fetchData = async () => {
    const dataRef = ref(database, 'someDataPath')
    const snapshot = await get(dataRef)
    return snapshot.exists() ? snapshot.val() : null
  }

  const writeData = async data => {
    const dataRef = ref(database, 'someDataPath')
    await set(dataRef, data)
  }

  return { fetchData, writeData }
}
