import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, query, orderByChild, equalTo, onValue, push, set, remove, update } from 'firebase/database';
import { database, auth } from '../../firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth';
import { Helmet } from 'react-helmet';

function Dashboard() 
{
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [classroomName, setClassroomName] = useState('');
  const [classrooms, setClassrooms] = useState([]);
  const [editClassroomID, setEditClassroomID] = useState(null);
  const [editClassroomName, setEditClassroomName] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchClassrooms(currentUser.uid);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchClassrooms = (teacherID) => {
    const classroomsQuery = query(ref(database, 'classrooms'), orderByChild('teacherID'), equalTo(teacherID));

    onValue(classroomsQuery, (snapshot) => {
      const data = snapshot.val();
      const classroomsData = data ? Object.entries(data) : [];
      setClassrooms(classroomsData);
    });
  };

  const handleClassroomClick = (classroomID) => {
    navigate(`/teacher/classroom/${classroomID}`);
  };

  const createClassroom = () => {
    if (classroomName.trim() === '') {
      alert('Classroom name cannot be empty');
      return;
    }

    const classroomsRef = ref(database, 'classrooms');
    const newClassroomRef = push(classroomsRef);
    set(newClassroomRef, {
      teacherID: user.uid,
      name: classroomName,
    })
      .then(() => {
        setClassroomName('');
      })
      .catch((error) => {
        alert(error);
      });
  };

  const deleteClassroom = (classroomID) => {
    const classroomRef = ref(database, `classrooms/${classroomID}`);
    remove(classroomRef)
      .catch((error) => {
        alert(error);
      });
  };

  const editClassroom = (classroomID, currentName) => {
    setEditClassroomID(classroomID);
    setEditClassroomName(currentName);
  };

  const saveEditedClassroomName = (classroomID) => {
    if (editClassroomName.trim() === '') {
      alert('Classroom name cannot be empty');
      return;
    }

  const classroomRef = ref(database, `classrooms/${classroomID}`);
  update(classroomRef, { name: editClassroomName })
    .then(() => {
      setEditClassroomID(null);
      setEditClassroomName('');
    })
    .catch((error) => {
      alert(error);
    });
  };


  return (
    <>
      <Helmet><title>Teacher Dashboard - ByteQuiz</title></Helmet>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Welcome, {user ? user.email : 'Loading...'}
        </h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Create a New Classroom</h2>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={classroomName}
              onChange={(e) => setClassroomName(e.target.value)}
              placeholder="Enter classroom name"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={createClassroom}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Add Classroom
            </button>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-gray-700 mb-2">Your Classrooms</h2>
        <ul className="space-y-4">
          {classrooms.map(([classroomID, classroom]) => (
            <li
              key={classroomID}
              className="p-4 bg-gray-100 rounded-lg shadow flex justify-between items-center hover:bg-gray-200"
            >
              {editClassroomID === classroomID ? (
                <div className="flex items-center space-x-4">
                  <input
                    type="text"
                    value={editClassroomName}
                    onChange={(e) => setEditClassroomName(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <button
                    onClick={() => saveEditedClassroomName(classroomID)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="cursor-pointer" onClick={() => handleClassroomClick(classroomID)}>
                  <p className="text-lg font-medium text-gray-800">{classroom.name}</p>
                  <p className="text-sm text-gray-600">ID: {classroomID}</p>
                </div>
              )}
              <div className="flex space-x-4">
                <button
                  onClick={() => editClassroom(classroomID, classroom.name)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteClassroom(classroomID)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Dashboard;