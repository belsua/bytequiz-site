// ClassroomHeader.jsx
import React, { useState } from 'react';
import backgroundImage from '../../assets/Sample.webp';

const ClassroomHeader = ({ classrooms, classroomID }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(classroomID)
            .then(() => {
                alert(`Classroom ID ${classroomID} copied to clipboard!`);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    };

    return (
        <div className="p-6 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 border-gray-200 rounded-lg shadow-md">
            <div className="relative">
                <div className="relative z-10">
                    <h2 className="mb-2 text-3xl font-bold tracking-tight text-white">
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
            </div>
        </div>
    );
};

export default ClassroomHeader;