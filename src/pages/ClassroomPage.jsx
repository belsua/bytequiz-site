import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { database } from '../firebase/firebase';
import { ref, onValue } from 'firebase/database';

function ClassroomPage() {
  const { classroomID } = useParams();
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const classroomRef = ref(database, `classrooms/${classroomID}/players`);
    onValue(classroomRef, (snapshot) => {
      const data = snapshot.val();
      const playersData = data ? Object.entries(data) : [];
      setPlayers(playersData);
    });
  }, [classroomID]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Classroom: {classroomID}</h1>

      <h2 className="text-xl font-semibold text-gray-700 mb-2">Players in this Classroom:</h2>
      <ul className="space-y-4">
        {players.map(([playerID, playerData]) => (
          <li key={playerID} className="p-4 bg-gray-100 rounded-lg shadow">
            <p className="text-lg font-medium text-gray-800">Player: {playerData.profile.name}</p>
            <p className="text-sm text-gray-600">Age: {playerData.profile.age}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClassroomPage;
