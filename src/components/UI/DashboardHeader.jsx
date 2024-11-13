import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../../firebase/firebase';


const Card = ({ user }) => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalActivities, setTotalActivities] = useState(0);
  const [totalClassrooms, setTotalClassrooms] = useState(0);

  useEffect(() => {
    // Fetch total classrooms for the logged-in instructor
    const classroomsRef = ref(database, 'classrooms');
    onValue(classroomsRef, (snapshot) => {
      const classroomsData = snapshot.val();
      if (classroomsData) {
        const filteredClassrooms = Object.entries(classroomsData).filter(
          ([, classroom]) => classroom.teacherID === user.uid // Filter by teacherID
        );

        setTotalClassrooms(filteredClassrooms.length);

        let studentsCount = 0;
        let activitiesCount = 0;

        filteredClassrooms.forEach(([, classroom]) => {
          const players = classroom.players;
          if (players) {
            studentsCount += Object.keys(players).length; // Count students
            Object.values(players).forEach(player => {
              if (player.activities) {
                activitiesCount += Object.keys(player.activities).length; // Count activities
              }
            });
          }
        });

        setTotalStudents(studentsCount);
        setTotalActivities(activitiesCount);
      }
    });
  }, [user]);


  return (
    <div className="p-6 m-4 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 border-gray-200 rounded-lg shadow-md">
      <div className="flex sm:flex sm:space-x-4">
          <div className="inline-block align-bottom rounded-lg pt-4 pb-4 lg:p-5 text-left transform transition-all w-full lg:w-1/2">
            <div className="relative">
                <div className="relative">
                  <h2 className="mb-2 text-2xl font-bold tracking-tight text-white">
                    Welcome back, Teacher {user ? user.email : ''} 
                  </h2>
                  <p className="mb-3 font-normal text-white">
                    We are excited to have you back in the classroom!
                  </p>
                  <a
                    href="/"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  >
                    Back to Home
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                </div>
              </div>
          </div>
          <div className="hidden lg:inline-block align-bottom bg-blue-800 rounded-lg p-5 text-left overflow-hidden shadow transform transition-all mb-2 w-full sm:w-1/4">
              <div className="sm:flex sm:items-start">
                  <div className="text-left sm:mt-0 sm:ml-2">
                      <h3 className="pb-4 sm:pb-0 text-sm leading-2 font-medium text-blue-200">Total Students</h3>
                      <p className="text-4xl font-bold text-blue-100">{totalStudents}</p> 
                  </div>
              </div>
          </div>
          <div className="hidden lg:inline-block align-bottom bg-blue-800 rounded-lg p-5 text-left overflow-hidden shadow transform transition-all mb-2 w-full sm:w-1/4">
              <div className="sm:flex sm:items-start">
                  <div className="text-left sm:mt-0 sm:ml-2">
                      <h3 className="pb-4 sm:pb-0 text-sm leading-2 font-medium text-blue-200">Total Activities</h3>
                      <p className="text-4xl font-bold text-blue-100">{totalActivities}</p> 
                  </div>
              </div>
          </div>
          <div className="hidden lg:inline-block align-bottom bg-blue-800 rounded-lg p-5 text-left overflow-hidden shadow transform transition-all mb-2 w-full sm:w-1/4">
              <div className="sm:flex sm:items-start">
                  <div className="text-left sm:mt-0 sm:ml-2">
                      <h3 className="pb-4 sm:pb-0 text-sm leading-2 font-medium text-blue-200">Total Classrooms</h3>
                      <p className="text-4xl font-bold text-blue-100">{totalClassrooms}</p> 
                  </div>
              </div>
          </div>
      </div>
      <div className="flex lg:hidden space-x-2 sm:space-x-4">
          <div className="inline-block align-bottom bg-blue-800 rounded-lg p-5 text-left overflow-hidden shadow transform transition-all mb-2 w-full sm:w-1/2">
              <div className="sm:flex sm:items-start">
                  <div className="text-left sm:mt-0 sm:ml-2">
                      <h3 className="pb-4 sm:pb-0 text-sm leading-2 font-medium text-blue-200">Total Students</h3>
                      <p className="text-4xl font-bold text-blue-100">{totalStudents}</p> 
                  </div>
              </div>
          </div>
          <div className="inline-block align-bottom bg-blue-800 rounded-lg p-5 text-left overflow-hidden shadow transform transition-all mb-2 w-full sm:w-1/2">
              <div className="sm:flex sm:items-start">
                  <div className="text-left sm:mt-0 sm:ml-2">
                      <h3 className="pb-4 sm:pb-0 text-sm leading-2 font-medium text-blue-200">Total Activities</h3>
                      <p className="text-4xl font-bold text-blue-100">{totalActivities}</p> 
                  </div>
              </div>
          </div>
          <div className="inline-block align-bottom bg-blue-800 rounded-lg p-5 text-left overflow-hidden shadow transform transition-all mb-2 w-full sm:w-1/2">
              <div className="sm:flex sm:items-start">
                  <div className="text-left sm:mt-0 sm:ml-2">
                      <h3 className="pb-4 sm:pb-0 text-sm leading-2 font-medium text-blue-200">Total Classrooms</h3>
                      <p className="text-4xl font-bold text-blue-100">{totalClassrooms}</p> 
                  </div>
              </div>
          </div>
      </div>
  </div>
  );
};

export default Card;