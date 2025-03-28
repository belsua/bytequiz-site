// CreateRoom.jsx
import React, { useState } from 'react';
import { ref, push, set } from 'firebase/database';
import { database } from '../../firebase/firebase'; // Adjust the import path as necessary
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';

const CreateRoom = ({ isOpen, onClose, user }) => {
  const [classroomName, setClassroomName] = useState('');

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
        onClose(); // Close the modal after creating a classroom
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
        <DialogBackdrop 
          transition 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <DialogPanel 
                  transition 
                  className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                    <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                        Create a New Classroom
                    </DialogTitle>
                    </div>
                    <div className="mt-3">
                    <input
                        type="text"
                        value={classroomName}
                        onChange={(e) => setClassroomName(e.target.value)}
                        placeholder="Enter classroom name"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                    type="button"
                    onClick={createClassroom}
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                    >
                    Add
                    </button>
                    <button
                    type="button"
                    onClick={onClose}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                    Cancel
                    </button>
                </div>
                </DialogPanel>
            </div>
        </div>
    </Dialog>
  );
};

export default CreateRoom;