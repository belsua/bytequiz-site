import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, query, orderByChild, equalTo, onValue, push, set, remove, update } from 'firebase/database';
import { database, auth } from '../../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Helmet } from 'react-helmet';
import CreateRoom from '../../components/UI/CreateRoom'; 
import DeleteModal from '../../components/UI/DeleteModal'; 
import DashboardHeader from '../../components/UI/DashboardHeader';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';

function Dashboard() 
{
  const navigate = useNavigate();
  const [user, setUser ] = useState(null);
  const [classroomName, setClassroomName] = useState('');
  const [classrooms, setClassrooms] = useState([]);
  const [editClassroomID, setEditClassroomID] = useState(null);
  const [editClassroomName, setEditClassroomName] = useState('');
  const [isCreateRoomOpen, setIsCreateRoomOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [classroomToDelete, setClassroomToDelete] = useState(null);

  const handleDeleteClassroom = (classroomID) => {
    setClassroomToDelete(classroomID);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteClassroom = () => {
    if (classroomToDelete) {
      deleteClassroom(classroomToDelete);
      setClassroomToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser ) => {
      if (currentUser ) {
        setUser (currentUser );
        fetchClassrooms(currentUser .uid);
      } else {
        setUser (null);
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

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    });
  };

  return (
    <>
      <Helmet><title>Teacher Dashboard - ByteQuiz</title></Helmet>

      <DashboardHeader user={user}></DashboardHeader>

      <div className="container mx-auto p-4">
        {isCreateRoomOpen && (
          <CreateRoom isOpen={isCreateRoomOpen} onClose={() => setIsCreateRoomOpen (false)} user={user} />
        )}

        <div className='flex justify-between px-2 py-2'>
          <h2 className="text-2xl font-semibold text-gray-700">Your Classrooms</h2>
          <button
            onClick={() => setIsCreateRoomOpen(true)}
            className="lg:flex text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 inline-flex items-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-500 dark:focus:ring-blue-800">
            Create New Classroom
          </button>
        </div>

        <DeleteModal 
            isOpen={isDeleteModalOpen} 
            onClose={() => setIsDeleteModalOpen(false)} 
            onConfirm={confirmDeleteClassroom} 
        />

        <ul className="space-y-4">
          {classrooms.map(([classroomID, classroom]) => (
            <li
              key={classroomID}
              className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center hover:bg-blue-50"
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
                <div onClick={() => handleClassroomClick(classroomID)} className="flex grow items-center space-x-4 cursor-pointer">
                  <p onClick={() => handleClassroomClick(classroomID)} className="text-lg font-medium text-gray-800">{classroom.name}</p>
                </div>
              )}
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="inline-flex justify-center rounded-md border border-gray-300 bg-white p-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                  </MenuButton>
                </div>
                <MenuItems className="absolute right-0 z-10 mt-2 w-auto min-w-[150px] max-w-[300px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                  <div className="py-1">
                    <MenuItem>
                      <button
                        onClick={() => editClassroom(classroomID, classroom.name)}
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Edit Room Name
                      </button>
                    </MenuItem>
                    <MenuItem>
                      <button
                        onClick={() => handleDeleteClassroom(classroomID)}
                        className="block w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Delete Classroom
                      </button>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Dashboard;