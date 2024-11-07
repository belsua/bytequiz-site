import React from 'react';

const DashboardStats = ({ totalClassrooms, totalActivities, totalStudents  }) => {
    return (
        <div className="max-w-full mx-4 sm:mx-auto sm:px-6 lg:px-8">
            <div className="flex space-x-2 sm:flex sm:space-x-4">
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-2 w-full sm:w-1/3 sm:my-8">
                    <div className="bg-white p-5">
                        <div className="sm:flex sm:items-start">
                            <div className="text-left sm:mt-0 sm:ml-2">
                                <h3 className="pb-4 sm:pb-0  text-sm leading-2 font-medium text-gray-400">Total Students</h3>
                                <p className="text-3xl font-bold text-black">{totalStudents}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-2 w-full sm:w-1/3 sm:my-8">
                    <div className="bg-white p-5">
                        <div className="sm:flex sm:items-start">
                            <div className="text-left sm:mt-0 sm:ml-2">
                                <h3 className="pb-4 sm:pb-0  text-sm leading-2 font-medium text-gray-400">Total Activities</h3>
                                <p className="text-3xl font-bold text-black">{totalActivities}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-2 w-full sm:w-1/3 sm:my-8">
                    <div className="bg-white p-5">
                        <div className="sm:flex sm:items-start">
                            <div className="text-left sm:mt-0 sm:ml-2">
                                <h3 className="pb-4 sm:pb-0 text-sm leading-2 font-medium text-gray-400">Active Classrooms</h3>
                                <p className="text-3xl font-bold text-black">{totalClassrooms}</p> {/* Display total classrooms */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardStats;