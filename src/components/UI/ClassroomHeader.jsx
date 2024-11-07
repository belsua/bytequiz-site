// ClassroomHeader.jsx
import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../../firebase/firebase';

const ClassroomHeader = ({ classrooms, classroomID }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [totalStudents, setTotalStudents] = useState(0);
    const [totalActivities, setTotalActivities] = useState(0);

    // Copying Room Code Logic
    const handleCopy = () => {
        navigator.clipboard.writeText(classroomID)
            .then(() => {
                alert(`Classroom ID ${classroomID} copied to clipboard!`);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    };

    // Fetching Student/Activity Counts
    useEffect(() => {
        const playersRef = ref(database, `classrooms/${classroomID}/players`);
        
        // Fetch total students and activities
        onValue(playersRef, (snapshot) => {
            const playersData = snapshot.val();
            if (playersData) {
                const studentsCount = Object.keys(playersData).length; // Count players
                let activitiesCount = 0;

                // Count activities for each player
                Object.values(playersData).forEach(player => {
                    if (player.activities) {
                        activitiesCount += Object.keys(player.activities).length; // Count activities
                    }
                });

                setTotalStudents(studentsCount);
                setTotalActivities(activitiesCount);
            } else {
                setTotalStudents(0);
                setTotalActivities(0);
            }
        });
    }, [classroomID]);

    return (
        <div className="p-6 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 border-gray-200 rounded-lg shadow-md">
            <div className="flex sm:flex sm:space-x-4">
                <div className="inline-block align-bottom rounded-lg pt-4 pb-4 sm:p-5 text-left transform transition-all w-full sm:w-1/2">
                    <h2 className="mb-2 text-4xl font-bold tracking-tight text-white">
                        {classrooms || 'Loading...'}
                    </h2>
                    <p className="mb-3 font-normal text-white">
                        Browse progress of your students in real-time!
                    </p>
                    <div 
                        className="relative w-full max-w-[16rem]" 
                        onMouseEnter={() => setShowTooltip(true)} 
                        onMouseLeave={() => setShowTooltip(false)}
                    >
                        <input 
                            id={`classroom-id-${classroomID}`} 
                            type="text" 
                            className="bg-blue-700 border border-blue-800 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                            value={classroomID} 
                            disabled 
                            readOnly 
                        />
                        <button 
                            onClick={handleCopy} 
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:bg-blue-800 rounded-lg p-2 inline-flex items-center justify-center"
                        >
                            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"/>
                            </svg>
                        </button>
                        {showTooltip && (
                            <div className="absolute left-10 mt-1 px-4 bg-blue-800 text-white text-sm rounded p-1">
                                Copy Classroom ID
                            </div>
                        )}
                    </div>
                    
                </div>
                <div className="hidden sm:inline-block align-bottom bg-blue-800 rounded-lg p-5 text-left overflow-hidden shadow transform transition-all mb-2 w-full sm:w-1/3">
                    <div className="sm:flex sm:items-start">
                        <div className="text-left sm:mt-0 sm:ml-2">
                            <h3 className="pb-4 sm:pb-0 text-sm leading-2 font-medium text-blue-200">Total Students</h3>
                            <p className="text-4xl font-bold text-blue-100">{totalStudents}</p> 
                        </div>
                    </div>
                </div>
                <div className="hidden sm:inline-block align-bottom bg-blue-800 rounded-lg p-5 text-left overflow-hidden shadow transform transition-all mb-2 w-full sm:w-1/3">
                    <div className="sm:flex sm:items-start">
                        <div className="text-left sm:mt-0 sm:ml-2">
                            <h3 className="pb-4 sm:pb-0 text-sm leading-2 font-medium text-blue-200">Total Activities</h3>
                            <p className="text-4xl font-bold text-blue-100">{totalActivities}</p> 
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex sm:hidden space-x-2 sm:space-x-4">
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
            </div>
        </div>
    );
};

export default ClassroomHeader;